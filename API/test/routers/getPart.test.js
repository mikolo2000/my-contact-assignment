import request from "supertest";
import getPart from "../../routers/getPart";
import { users } from "../../tools/users";




describe("GET /users", () => {
  beforeEach(() => {
    users.length = 0; 
  });

  it("should return a particular user", async () => {
    users.push(
      { id: 1, firstName: "John", lastName: "Doe", gender: "male", email: "john@example.com", phone: "+123456789", age: 30 },
      { id: 2, firstName: "Jane", lastName: "Doe", gender: "female", email: "jane@example.com", phone: "+987654321", age: 28 }
    );

    const res = await request(getPart).get("/users/1"); 

    expect(res.status).toBe(200);
    expect(res.body).toEqual(users[0]);
  });

  it("should return an error message if user there is not match with any id", async () => {
    const res = await request(getPart).get("/users/999"); 
    

    expect(res.status).toBe(404);
    expect(res.text).toBe("User not found"); 
  });

  it("should return an error message when id is invalid", async () => {
    const res = await request(getPart).get("/users/abd"); 
    

    expect(res.status).toBe(404);
    expect(res.text).toBe("User not found"); 
  });
});
