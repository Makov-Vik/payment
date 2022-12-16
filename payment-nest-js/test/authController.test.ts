import { baseUrl } from "./constans";
import axios from 'axios';
import { generateUser } from "./generateData";

describe("registration-login user", () => {
  let newUser: {
    email: string,
    name: string,
    password: string,
  };

  beforeAll(() => {
    newUser = generateUser();
  });

  it('registration', async () => {
    const result = await axios.post(`${baseUrl}/auth/registration`, newUser)
    expect(result.data).toMatchObject({
    token: expect.any(String),
  });
  });

  
  it('login', async () => {
    const result = await axios.post(`${baseUrl}/auth/login`, newUser)

    expect(result.data).toMatchObject({
      token: expect.any(String),
    });
  })
})