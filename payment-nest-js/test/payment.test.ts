import axios from "axios";
import { baseUrl } from "./constans";
jest.mock("axios");

describe("payment", () => {

  it("create payment", async () => {
    (axios.post as jest.Mock).mockResolvedValue({ data: "some data" });
    const result = await axios.post(`${baseUrl}/payment`);

    expect(result).toEqual({ data: "some data" });

  })
})