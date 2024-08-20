import request from "supertest";
import { app } from "../../src/server/index";
import prisma from "../../prisma/schema.prisma";

jest.mock("../../../prisma/schema.prisma", () => ({
  user: {
    findFirst: jest.fn(),
  },
}));

describe("POST /login", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if email or password is missing", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: "test@example.com" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("All fields are required");

    const response2 = await request(app)
      .post("/login")
      .send({ password: "password" });

    expect(response2.status).toBe(400);
    expect(response2.body.message).toBe("All fields are required");
  });

  it("should return 200 and login successful message if credentials are correct", async () => {
    (prisma.user.findFirst as jest.Mock).mockResolvedValue({
      email: "test@example.com",
      password: "password",
    });

    const response = await request(app)
      .post("/login")
      .send({ email: "test@example.com", password: "password" });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Login successful");
  });

  it("should return 401 if email or password is incorrect", async () => {
    (prisma.user.findFirst as jest.Mock).mockResolvedValue({
      email: "test@example.com",
      password: "password",
    });

    const response = await request(app)
      .post("/login")
      .send({ email: "test@example.com", password: "wrongpassword" });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid email or password");

    const response2 = await request(app)
      .post("/login")
      .send({ email: "wrongemail@example.com", password: "password" });

    expect(response2.status).toBe(401);
    expect(response2.body.message).toBe("Invalid email or password");
  });

  it("should return 500 if there is a server error", async () => {
    (prisma.user.findFirst as jest.Mock).mockRejectedValue(
      new Error("Database error")
    );

    const response = await request(app)
      .post("/login")
      .send({ email: "test@example.com", password: "password" });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe(
      "Error logging in user: Error: Database error"
    );
  });
});
