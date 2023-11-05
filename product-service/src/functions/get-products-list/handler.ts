import { headers } from "./../../libs/api-gateway";
import { middyfy } from "./../../libs/lambda";

import productsDataService from "./../../services";
import { APIGatewayProxyResult } from "aws-lambda";

export const getProductsList = async (
  event
): Promise<APIGatewayProxyResult> => {
  console.log("event", event);
  try {
    const [products, stocks] = await Promise.all([
      productsDataService.getMusicRecordsList(),
      productsDataService.getMusicRecordsStocks(),
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
