const { fetchUser } = require("../index");

describe('fetchUser', () => {
  const users = [];
  it('should return an array of length 20', async () => {
    users = await fetchUser();
    console.log(users);
    expect(users).toHaveLength(20);
  })
});