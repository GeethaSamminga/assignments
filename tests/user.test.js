const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const dotenv = require("dotenv");
dotenv.config({ path: "./data/config.env" });
const jwt = require("jsonwebtoken");
const User = require("../models/userschema");
const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NTdkOTNhMDFkNjEzOWUwOTcyYWEyZiIsImVtYWlsIjoidGVzdDNAZXhhbXBsZS5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTczMzgxMDQ5MCwiZXhwIjoxNzMzODE0MDkwfQ.xPq59pE-qIBdtJXl7SL0ljPpgPIaGbIjklV1BnqiQYU"

jest.setTimeout(60000);

describe("User Register API", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/testdb", {});
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  // for required fields
  test("for required fields", async () => {
    const required = {
      name: "testUser",
      email: "test3@example.com",
    };
  
    const result = await supertest(app).post("/api/register").send(required);
    expect(result.status).toBe(400);
    expect(result.body.message).toBe("Validation failed");
  
  });
  
  // create new user
  test("successfully registers a user", async () => {
    const newUser = {
      name: "test3",
      email: "test3@example.com",
      password: "12345678",
      role: "user",
    };

    const result = await supertest(app).post("/api/register").send(newUser);

    expect(result.status).toBe(201);
    expect(result.body.message).toBe("User registered successfully");
    expect(result.body.savedUser).toEqual({
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    });
  });

  // existing email
  test("duplicate email", async () => {
    const existingUser = {
      name: "testUser",
      email: "test3@example.com",
      password: "12345678",
      role: "user",
    };

    const result = await supertest(app).post("/api/register").send(existingUser);

    expect(result.status).toBe(400);
    expect(result.body.error).toBe("Email already exists");
  });


  //  testing for user login
    test("email validation", async () => {
        const loginDetails = {
            email: "test6663@example.com", 
            password: "12345678",
        };

        const result = await supertest(app).post("/api/login").send(loginDetails);

        expect(result.status).toBe(400);
        expect(result.body.error).toBe("User need to register first" );
    });

    test("wrong password", async () => {
    const wrongPasswordDetails = {
        email: "test3@example.com",
        password: "12736666",
    };

    const result = await supertest(app).post("/api/login").send(wrongPasswordDetails);

    expect(result.status).toBe(400);
    expect(result.body.error).toBe("Invalid password");
});

    test("to login successfully", async () => {
        const correctPasswordDetails = {
            email: "test3@example.com", 
            password: "12345678",
        };
    
      
        const result = await supertest(app).post("/api/login").send(correctPasswordDetails);
        console.log(result.body); // Log the response body for debugging
        expect(result.status).toBe(200);
        
    });
    
    test("fetch all users successfully", async () => {
      // const token = jwt.sign({ id: "mockUserId", role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1h" });
    
      const mockUsers = [
        { name: "User1", email: "user1@example.com", role: "user", password: "hashedpassword1" },
        { name: "User2", email: "user2@example.com", role: "admin", password: "hashedpassword2" },
      ];
    
      await User.deleteMany();
      await User.insertMany(mockUsers);
    
      const result = await supertest(app)
        .get("/api/getuser")
        .set("Authorization", `Bearer ${token}`);
         console.log(token)
    
      expect(result.status).toBe(200);
      expect(result.body.message).toBe("Get users successfully");
      expect(result.body.users).toHaveLength(2);
      expect(result.body.users[0]).toMatchObject({ name: "User1", email: "user1@example.com", role: "user" });
      expect(result.body.users[1]).toMatchObject({ name: "User2", email: "user2@example.com", role: "admin" });
    });
    
    

});

























