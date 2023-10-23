import {
  headers,
  type ValidatedEventAPIGatewayProxyEvent,
} from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import schema from "./schema";
import productsDataService from "src/services";

const getProductById: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  try {
    const productId = event.pathParameters && event.pathParameters.productId;

    if (!productId) {
      return {
        statusCode: 400,
        body: "Please enter correct id",
      };
    }

    const musicRecord = await productsDataService.getMusicRecordById(productId);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(
        musicRecord || {
          message: "Music record not found",
        }
      ),
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers,
      body: e,
    };
  }
};

export const main = middyfy(getProductById);
