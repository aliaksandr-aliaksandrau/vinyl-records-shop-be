import { headers } from "./../../libs/api-gateway";
import { middyfy } from "./../../libs/lambda";

import productsDataService from "./../../services";
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";

export const getProductsList = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  console.log("getProductsList: event: ", event);

  try {
    const [products, stocks] = await Promise.all([
      productsDataService.getMusicRecordsList(),
      productsDataService.getStocks(),
    ]);

    const records = products.map((e) => {
      const record = e;
      record.count = stocks.find((s) => s.product_id === record.id).count;
      return record;
    });

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
