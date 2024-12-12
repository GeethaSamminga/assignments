const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./data/config.env" });
const path = require("path");
const fs = require("fs");
const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NTdkOTNhMDFkNjEzOWUwOTcyYWEyZiIsImVtYWlsIjoidGVzdDNAZXhhbXBsZS5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTczMzgxMDQ5MCwiZXhwIjoxNzMzODE0MDkwfQ.xPq59pE-qIBdtJXl7SL0ljPpgPIaGbIjklV1BnqiQYU"

jest.setTimeout(100000);

describe("Products API", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/testdb", {});
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
  });

 

test("for required fields", async () => {
  const required = {
    title: "image1",
    description: "image 1 uploaded successfully",
    category: "gifts",
    status: "active",
    cost: "1000",
    quantity: "10" // Add quantity field if required
  };

  // Path to a dummy file (replace with an actual file path if needed)
  const filePath = path.join(__dirname, "testImage.jpg");

  // Make sure to create a dummy file for testing
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "Dummy content for testing.");
  }

  // const testToken = jwt.sign({ id: "mockUserId", role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1h" });

  const response = await supertest(app)
    .post("/api/upload")
    .set("Authorization", `Bearer ${token}`)
    .attach("file", filePath) // Attach the file
    .field("title", required.title)
    .field("description", required.description)
    .field("category", required.category)
    .field("status", required.status)
    .field("cost", required.cost)
    .field("quantity", required.quantity);

  expect(response.status).toBe(201);
  expect(response.body.message).toBe("File uploaded successfully");

  // Clean up the test image file after test
  fs.unlinkSync(filePath);
});

});
