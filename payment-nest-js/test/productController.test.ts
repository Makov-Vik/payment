import { baseUrl } from "./constans";
import axios from "axios";
import { generateProduct } from './generateData';

describe("create-getAll products", () => {
  let newProduct = generateProduct();

  it("create product", async () => {

    const result = await axios.post(`${baseUrl}/product`, newProduct);
    expect(result.data).toMatchObject({
      id: expect.any(Number),
      name: expect.any(String),
      price: expect.any(Number),
      description: expect.any(String),
      image: expect.any(String),
    })
  });

  it("get all products", async () => {
     const result = await axios.get(`${baseUrl}/product`);

    expect(result.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          price: expect.any(Number),
          description: expect.any(String),
          image: expect.any(String),
        })
      ])
    )
  })
})