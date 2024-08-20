import request from "supertest";
import express from "express";
import { app } from "../../src/server/index";
import { PrismaClient, User, UserData, ToDo } from "@prisma/client";

jest.mock("../../../prisma/schema.prisma");
const prisma = new PrismaClient();

app.use(express.json());

describe("POST /newToDo/:id", () => {
  let mockPrismaUserDataFindFirst: jest.Mock;
  let mockPrismaToDoCreate: jest.Mock;
  let mockPrismaToDoFindMany: jest.Mock;

  beforeEach(() => {
    mockPrismaUserDataFindFirst = jest.fn();
    mockPrismaToDoCreate = jest.fn();
    mockPrismaToDoFindMany = jest.fn();

    (PrismaClient as jest.Mock).mockImplementation(() => ({
      userData: {
        findFirst: mockPrismaUserDataFindFirst,
      },
      toDo: {
        create: mockPrismaToDoCreate,
        findMany: mockPrismaToDoFindMany,
      },
    }));
  });

  it("should create a new ToDo and return the updated list when user exists", async () => {
    const userId = 1;
    const newToDo: ToDo = {
      id: 1,
      title: "New ToDo",
      userId,
      completed: false,
      createdAt: new Date(),
    };
    const toDoList: ToDo[] = [newToDo];

    mockPrismaUserDataFindFirst.mockResolvedValue({ id: userId } as UserData);
    mockPrismaToDoCreate.mockResolvedValue(newToDo);
    mockPrismaToDoFindMany.mockResolvedValue(toDoList);

    const response = await request(app)
      .post(`/newToDo/${userId}`)
      .send({ title: "New ToDo" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(toDoList);
  });

  it("should return 404 when user does not exist", async () => {
    const userId = 999;

    mockPrismaUserDataFindFirst.mockResolvedValue(null);

    const response = await request(app)
      .post(`/newToDo/${userId}`)
      .send({ title: "New ToDo" });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "User does not found" });
  });

  it("should return 400 when ID is invalid", async () => {
    const response = await request(app)
      .post("/newToDo/invalid")
      .send({ title: "New ToDo" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "Invalid ID" });
  });

  it("should return 500 when there is an error creating the ToDo", async () => {
    const userId = 1;

    mockPrismaUserDataFindFirst.mockResolvedValue({ id: userId } as UserData);
    mockPrismaToDoCreate.mockRejectedValue(new Error("Database error"));

    const response = await request(app)
      .post(`/newToDo/${userId}`)
      .send({ title: "New ToDo" });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: "Error creating new ToDo" });
  });

  it("should return 500 when there is an error getting the ToDo list", async () => {
    const userId = 1;
    const newToDo: ToDo = {
      id: 1,
      title: "New ToDo",
      userId,
      completed: false,
      createdAt: new Date(),
    };

    mockPrismaUserDataFindFirst.mockResolvedValue({ id: userId } as UserData);
    mockPrismaToDoCreate.mockResolvedValue(newToDo);
    mockPrismaToDoFindMany.mockRejectedValue(new Error("Database error"));

    const response = await request(app)
      .post(`/newToDo/${userId}`)
      .send({ title: "New ToDo" });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: "Error getting ToDos" });
  });
});
