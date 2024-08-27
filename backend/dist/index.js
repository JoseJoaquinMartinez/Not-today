"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_authentication_1 = require("./jwt-authentication");
const prisma = new client_1.PrismaClient();
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
const corsOptions = {
    origin: [
        "https://not-today.vercel.app",
        "http://localhost:3000",
        "http://localhost:5173",
        "https://not-today-backend.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 204,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
const saltRounds = 10;
//CREATE new todo
app.post("/newToDo/:id", jwt_authentication_1.authenticateToken, async (request, response) => {
    const { title } = request.body;
    const paramsId = parseInt(request.params.id);
    if (paramsId) {
        const userExsits = await prisma.userData.findFirst({
            where: {
                userId: paramsId,
            },
        });
        if (userExsits) {
            const newToDo = await prisma.toDo.create({
                data: {
                    title: title,
                    userId: paramsId,
                },
            });
            if (!newToDo) {
                return response
                    .status(500)
                    .json({ message: "Error creating new ToDo" });
            }
            response.status(201).json(newToDo);
        }
        else {
            response.status(404).json({ message: "User not found" });
        }
    }
    else {
        response.status(400).json({ message: "Invalid ID" });
    }
});
//GET toDos
app.get("/todos/:id", jwt_authentication_1.authenticateToken, async (request, response) => {
    const paramsId = parseInt(request.params.id);
    if (paramsId) {
        try {
            const user = await prisma.user.findFirst({
                where: {
                    id: paramsId,
                },
            });
            if (user) {
                const userData = await prisma.userData.findMany({
                    where: {
                        userId: paramsId,
                    },
                    include: {
                        todo: {
                            include: {
                                notToDo: true,
                            },
                        },
                    },
                });
                return response.status(200).json(userData);
            }
            else {
                return response.status(404).json({ message: "User not found" });
            }
        }
        catch (error) {
            return response.status(500).json({ message: "Error loading todos" });
        }
    }
    else {
        return response.status(400).json({ message: "Invalid ID" });
    }
});
//UPDATE toDo
app.put("/updateToDo/:id", jwt_authentication_1.authenticateToken, async (request, response) => {
    const paramsId = parseInt(request.params.id);
    const { id, completed } = request.body;
    if (paramsId) {
        const userExsits = await prisma.userData.findFirst({
            where: {
                userId: paramsId,
            },
        });
        if (userExsits) {
            const toDo = await prisma.toDo.findFirst({
                where: {
                    id: id,
                },
            });
            if (toDo) {
                await prisma.toDo.update({
                    where: {
                        id: id,
                    },
                    data: {
                        completed: completed,
                    },
                });
                return response.status(200).json({ message: "ToDo updated" });
            }
            else {
                return response.status(404).json({ message: "ToDo not found" });
            }
        }
        else {
            return response.status(404).json({ message: "User not found" });
        }
    }
    else {
        return response.status(400).json({ message: "Invalid ID" });
    }
});
//DELETE toDo
app.delete("/ToDo/:id", jwt_authentication_1.authenticateToken, async (request, response) => {
    const toDoId = parseInt(request.params.id);
    try {
        await prisma.$transaction(async (prisma) => {
            const toDo = await prisma.toDo.findFirst({
                where: {
                    id: toDoId,
                },
            });
            if (!toDo) {
                return response.status(404).json({ error: "ToDo not Found" });
            }
            await prisma.toDo.delete({
                where: {
                    id: toDoId,
                },
            });
        });
        response.status(200).json({ message: "Todo and not toDo erased" });
    }
    catch (error) {
        response.status(500).json({ error: "Error deleting todo" });
    }
});
//SINGUP
app.post("/user", async (request, response) => {
    const { email, password } = request.body;
    if (!email || !password) {
        return response.status(400).json({ message: "All fields are required" });
    }
    const checkEmailExists = await prisma.user.findFirst({
        where: {
            email: email,
        },
    });
    const emailExists = checkEmailExists ? true : false;
    if (emailExists) {
        return response.status(400).json({ message: "Email already exists" });
    }
    try {
        const hashedPassword = await bcrypt_1.default.hash(password, saltRounds);
        const newUser = await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
            },
        });
        if (newUser) {
            await prisma.userData.create({
                data: {
                    userId: newUser.id,
                },
            });
        }
        const token = jsonwebtoken_1.default.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
            expiresIn: "24h",
        });
        response.status(201).json({ message: "User added", token });
    }
    catch (error) {
        response.status(500).json({ error: "Error creating new user" });
    }
});
//LOGIN
app.post("/login", async (request, response) => {
    const { email, password } = request.body;
    if (!email || !password) {
        return response.status(400).json({ message: "All fields are required" });
    }
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: email,
            },
        });
        if (!user) {
            return response.status(404).json({ message: "User not found" });
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (isPasswordValid) {
            const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, {
                expiresIn: "24h",
            });
            return response.status(200).json({ message: "Login successful", token });
        }
        else {
            return response.status(401).json({ message: "Invalid password" });
        }
    }
    catch (error) {
        response.status(500).json({ error: `Error logging in user: ${error}` });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
