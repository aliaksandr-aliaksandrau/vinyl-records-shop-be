import {
  headers,
  type ValidatedEventAPIGatewayProxyEvent,
} from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import schema from "./schema";
import productsDataService from "./../../services";

const getProductsList: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async () => {
  try {
    const records = await productsDataService.getMusicRecordsList();
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(records),
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers,
      body: e,
    };
  }
};

export const main = middyfy(getProductsList);
