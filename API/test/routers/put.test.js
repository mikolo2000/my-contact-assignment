import request from "supertest";
import put from "../../routers/put.js"; 
import { users } from "../../tools/users.js";

describe("PUT /users/:id", () => {
  beforeEach(() => {
    users.length = 0;
    users.push(
      { id: 1, firstName: "John", lastName: "Doe", gender: "male", email: "john@example.com", phone: "+123456789", age: 30 },
      { id: 2, firstName: "Jane", lastName: "Doe", gender: "female", email: "jane@example.com", phone: "+987654321", age: 28 }
    );
  });

  it("should update a user's details when valid data is provided", async () => {
    const updatedUser = {
      firstName: "Alice",
      lastName: "Nathan",
      gender: "female",
      email: "alice@example.com",
      phone: "+1234567889",
      age: "25", 
    }
    const detailsToSend = new URLSearchParams(updatedUser).toString();

    const res = await request(put).put("/users/1")
    .set("Content-Type", "application/x-www-form-urlencoded")
    .send(detailsToSend);

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ id: 1, ...updatedUser });
    expect(users[0]).toMatchObject({ id: 1, ...updatedUser });
  });

  it("should return 404 if user does not exist", async () => {
    const updatedUser = {
      firstName: "NonExistent",
      lastName: "User",
      gender: "male",
      email: "noexist@example.com",
      phone: "+000000000",
      age: 40,
    };

    const res = await request(put).put("/users/99").send(updatedUser);

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message", "Error finding user");
  });

  it("should return 404 if validation fails", async () => {
    const invalidUser = {
      firstName: "",
      lastName: "Doe",
      gender: "male",
      email: "invalidemail",
      phone: "12345",
      age: -5,
    };

    const res = await request(put).put("/users/1").send(invalidUser);

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message"); // Check for validation error message
  });
});
