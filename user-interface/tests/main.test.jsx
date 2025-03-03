import { it, expect, describe } from 'vitest';
import { server } from "../src/mocks/node";


server.listen();

describe('group', () => {
  it('should', async() => {
    const response = await fetch("http://localhost:4000/users");
    const data = await response.json();
    console.log(data);
    expect(1).toBeTruthy
  })
})