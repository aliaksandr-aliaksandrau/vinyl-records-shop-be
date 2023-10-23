import { headers } from "./../../libs/api-gateway";
import { middyfy } from "./../../libs/lambda";

import productsDataService from "./../../services";
import { APIGatewayProxyResult } from "aws-lambda";

export const getProductsList = async (): Promise<APIGatewayProxyResult> => {
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
