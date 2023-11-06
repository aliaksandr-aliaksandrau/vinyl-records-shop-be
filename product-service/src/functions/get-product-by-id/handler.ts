import { headers } from "./../../libs/api-gateway";
import { middyfy } from "./../../libs/lambda";

import productsDataService from "./../../services";
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";

export const getProductById = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  try {
    // console.log("getProductById: event: ", event);
    const productId = event.pathParameters && event.pathParameters.productId;

    console.log("getProductById: productId: ", productId);

    if (!productId) {
      return {
        statusCode: 400,
        body: "Please enter correct id",
      };
    }

    let musicRecord;
    let stock;
    let result;

    [musicRecord, stock] = await Promise.all([
      productsDataService.getMusicRecordById(productId),
      productsDataService.getStockById(productId),
    ]);

    console.log("getProductById: musicRecord: ", musicRecord);
    console.log("getProductById: stock: ", stock);

    if (musicRecord) {
      result = { ...musicRecord, count: stock?.count || 0 };
    } else {
      result = {
        message: "Music record not found",
      };
    }

    console.log("getProductById: result: ", result);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(result),
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
