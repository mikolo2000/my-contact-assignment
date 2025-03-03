import request from "supertest";
import patch from "../../routers/patch.js"; 
import { users } from "../../tools/users.js";

describe("PATCH /users/:id", () => {
  beforeEach(() => {
   
    users.length = 0;
    users.push(
      { id: 1, firstName: "John", lastName: "Doe", gender: "male", email: "john@example.com", phone: "+123456789", age: 30 },
      { id: 2, firstName: "Jane", lastName: "Doe", gender: "female", email: "jane@example.com", phone: "+987654321", age: 28 }
    );
  });

  it("should update a user's details when valid data is provided", async () => {
    const updatedData = {
      firstName: "Johnny",
      email: "johnny@example.com"
    };

    const res = await request(patch).patch("/users/1").send(updatedData);

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      id: 1,
      firstName: "Johnny",
      lastName: "Doe",
      gender: "male",
      email: "johnny@example.com",
      phone: "+123456789",
      age: 30
    });
  });

  it("should not update a non-existent user", async () => {
    const res = await request(patch).patch("/users/99").send({ firstName: "New Name" });

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message"); // Adjust based on actual error message
  });

  it("should return a 404 error when validation fails", async () => {
    const invalidUpdate = {
      email: "not-an-email" 
    };

    const res = await request(patch).patch("/users/1").send(invalidUpdate);

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message"); 
  });
});
