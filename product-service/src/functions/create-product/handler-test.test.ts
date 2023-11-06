import { headers } from "../../libs/api-gateway";
import { mockedMusicRecords } from "../../../db/mocked-data";
import { createProduct } from "./handler";
import { APIGatewayEvent } from "aws-lambda";

describe("createProduct", () => {
  let aPIGatewayProxyResult;

  const productsDataService = {
    createMusicRecord: () =>
      jest.fn(() => console.log("createMusicRecord called")),
    createStock: () => jest.fn(() => console.log("createStock called")),
  };

  beforeEach(() => {
    aPIGatewayProxyResult = { statusCode: 200, headers };
  });

  it("should create music record", async () => {
    const record = {
      artist: "test artist",
      year: 2023,
      price: 100,
      description: "test description",
      id: "69238154-ebc5-41b9-8c31-d38961893e16",
      title: "test title",
      count: 20,
      album_cover_link: "",
    };

    aPIGatewayProxyResult.body = JSON.stringify(mockedMusicRecords[0]);

    await createProduct({
      body: { record },
    } as unknown as APIGatewayEvent);

    expect(productsDataService.createMusicRecord).toHaveBeenCalled();
    expect(productsDataService.createStock).toHaveBeenCalled();
  });
});
