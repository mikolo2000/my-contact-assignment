import request from "supertest";
import deletePart from "../../routers/delete.js"; 
import { users } from "../../tools/users.js";

describe("DELETE /users/:id", () => {
  beforeEach(() => {
    
    users.length = 0;
    users.push(
      { id: 1, firstName: "John", lastName: "Doe", gender: "male", email: "john@example.com", phone: "+123456789", age: 30 },
      { id: 2, firstName: "Jane", lastName: "Doe", gender: "female", email: "jane@example.com", phone: "+987654321", age: 28 }
    );
  });

  it("should delete a user when a valid ID is provided", async () => {
    const res = await request(deletePart).delete("/users/1");

    expect(res.status).toBe(200);
    expect(res.body).toBe("deleted Successfully");
    expect(users).toHaveLength(1); 
    expect(users.find((user) => user.id === 1)).toBeUndefined(); 
  });

  it("should return an error if the user does not exist", async () => {
    const res = await request(deletePart).delete("/users/99");

    expect(res.status).toBe(400); 
    expect(res.body).toHaveProperty("message", "Error, user not found");
    expect(users).toHaveLength(2); 
  });
});
