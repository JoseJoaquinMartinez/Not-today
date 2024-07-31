import express, { request, response } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());
export { app };
const saltRounds = 10;

//TODOS add jwt authentication

//create new todo

app.post("/newToDo/:id", async (request, response) => {
  const { title } = request.body;

  const paramsId = parseInt(request.params.id);

  if (paramsId) {
    const userExsits = await prisma.userData.findFirst({
      where: {
        id: paramsId,
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
        response.status(500).json({ message: "Error creating new ToDo" });
      }
    } else {
      response.status(404).json({ message: "User does not found" });
    }
  } else {
    response.status(400).json({ message: "Invalid ID" });
  }
  const newToDoList = await prisma.toDo.findMany({
    where: {
      userId: paramsId,
    },
  });
  if (!newToDoList) {
    response.status(500).json({ message: "Error getting ToDos" });
  } else {
    response.status(200).json(newToDoList);
  }
});

//signup

app.post("/user", async (request, response) => {
  const { email, password } = request.body;

  if (!email || !password) {
    return response.status(400).json({ message: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });
    response.status(201).json({ message: "User added" });
    const newUserData = await prisma.userData.create({
      data: {
        userId: newUser.id,
      },
    });
    response.status(201).json({ message: "User data added" });
  } catch (error) {
    response.status(500).json({ error: "Error creating new user" });
  }
});

//login

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

    user && (await bcrypt.compare(password, user.password)) === password
      ? response.status(200).json({ message: "Login successful" })
      : response.status(401).json({ message: "Invalid email or password" });
  } catch (error) {
    response.status(500).json({ error: `"Error logging in user: ${error}` });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
