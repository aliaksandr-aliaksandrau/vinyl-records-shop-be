import {
  headers,
  type ValidatedEventAPIGatewayProxyEvent,
} from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import schema from "./schema";
import { mockedMusicRecords } from "../../model/mocked-data";

const getProductById: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  const productId = event.pathParameters && event.pathParameters.productId;
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(mockedMusicRecords.find((el) => el.id === productId)),
  };
};

export const main = middyfy(getProductById);
