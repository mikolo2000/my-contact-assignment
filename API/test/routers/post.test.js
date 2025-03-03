import request from "supertest";
import post from "../../routers/post.js"; 
import {users} from "../../tools/users.js";

describe("POST /users", () => {
  beforeEach(() => {
    users.length = 0;
  });

  it("should create a new user when valid data is provided", async () => {
    const formData = new URLSearchParams({
      firstName: "Alice",
      lastName: "Nathan",
      gender: "female",
      email: "alice@example.com",
      phone: "+1234567889",
      age: "25", 
    }).toString(); 

    
    const res = await request(post)
      .post("/users")
      .set("Content-Type", "application/x-www-form-urlencoded") 
      .send(formData);
      
      expect(res.status).toBe(201);
      expect(users).toHaveLength(1);
  });

  it("should return a 404 error if validation fails", async () => {
    const invalidUser = {
      firstName: "", 
      lastName: "Doe",
      gender: "female",
      email: "alice@example.com",
      phone: "+123456789",
      age: 25
    };

    const res = await request(post).post("/users").send(invalidUser);

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message"); 
    expect(users).toHaveLength(0);
  });
});