import { headers } from "./../../libs/api-gateway";
import { middyfy } from "./../../libs/lambda";

import productsDataService from "./../../services";
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";

export const getProductById = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
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
