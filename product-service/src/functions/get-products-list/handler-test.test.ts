import { headers } from "../../libs/api-gateway";
import { mockedMusicRecords } from "../../../db/mocked-data";
import { getProductsList } from "./handler";
import { APIGatewayProxyEvent } from "aws-lambda";

describe("getProductsList", () => {
  it("should return correct API response", async () => {
    const result = await getProductsList({} as APIGatewayProxyEvent);

    const expectedResult = {
      statusCode: 200,
      headers,
      body: JSON.stringify(mockedMusicRecords),
    };

    expect(result).toEqual(expectedResult);
  });
});
