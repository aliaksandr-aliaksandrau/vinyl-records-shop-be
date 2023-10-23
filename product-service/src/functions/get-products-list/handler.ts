import {
  headers,
  type ValidatedEventAPIGatewayProxyEvent,
} from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import schema from "./schema";
import { mockedMusicRecords } from "./../../model/mocked-data";

const getProductsList: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async () => {
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(mockedMusicRecords),
  };
};

export const main = middyfy(getProductsList);
