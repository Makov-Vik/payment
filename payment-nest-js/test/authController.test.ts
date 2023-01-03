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
    expect(result.status).toBe(201);
  });

  it('registration failed', async () => {
    const result = await axios.post(`${baseUrl}/auth/registration`, newUser);
    expect(result.data).toMatchObject({
      message: "user with same email already exist"
    });
    expect(result.data.status).toBe(400);
  });

  it('login', async () => {
    const result = await axios.post(`${baseUrl}/auth/login`, newUser)

    expect(result.data).toMatchObject({
      token: expect.any(String),
    });
    expect(result.status).toBe(201);
  })

  it('login failed', async () => {
    const result = await axios.post(`${baseUrl}/auth/login`, {
      ...newUser,
      password: "random",
      });

      console.log(result)
    expect(result.data.response).toMatchObject({
      "statusCode": 401,
      "message": "WRONG_EMAIL_OR_PASSWORD",
      "error": "Unauthorized"
    });
  })

})