import express, { response } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());
export { app };

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

app.post("/user", async (request, response) => {
  const { email, password } = request.body;

  if (!email || !password) {
    return response.status(400).json({ message: "All fields are required" });
  }

  try {
    const newUser = await prisma.user.create({
      data: {
        email: email,
        password: password,
      },
    });
    response.status(201).json({ message: "User added" });
  } catch (error) {
    response.status(500).json({ error: "Error creating new user" })
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
