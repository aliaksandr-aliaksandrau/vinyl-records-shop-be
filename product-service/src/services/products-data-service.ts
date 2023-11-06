import {
  DynamoDBClient,
  GetItemCommand,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";

import MusicRecord from "../model/music-record";

const { unmarshall } = require("@aws-sdk/util-dynamodb");
const client = new DynamoDBClient({ region: "eu-west-1" });

const productsParams = {
  TableName: "products",
};

const stocksParams = {
  TableName: "stocks",
};

type MusicRecordStock = { product_id: string; count: number };

export default class ProductsDataService {
  constructor() {}

  getMusicRecordsList: () => Promise<MusicRecord[]> = async () => {
    try {
      const command = new ScanCommand(productsParams);
      const response = await client.send(command);
      const products = response.Items.map((item) => unmarshall(item));
      return products;
    } catch (e) {}
  };

  getMusicRecordById: (id: string) => Promise<MusicRecord> = async (id) => {
    try {
      const params = {
        TableName: productsParams.TableName,
        Key: {
          id: { S: id },
        },
      };
      const command = new GetItemCommand(params);
      const response = await client.send(command);
      const item = response.Item;
      if (item) {
        return unmarshall(item);
      }

      return item;
    } catch (e) {
      console.error("Error on get record by id: ", e);
      return null;
    }
  };

  getStockById: (id: string) => Promise<MusicRecordStock> = async (
    id
  ) => {
    try {
      const params = {
        TableName: stocksParams.TableName,
        Key: {
          product_id: { S: id },
        },
      };
      const command = new GetItemCommand(params);
      const response = await client.send(command);
      const item = response.Item;
      if (item) {
        return unmarshall(item);
      }

      return item;
    } catch (e) {
      console.error("Error on get stock by id: ", e);
      return null;
    }
  };

  getStocks: () => Promise<MusicRecordStock[]> = async () => {
    try {
      const command = new ScanCommand(stocksParams);
      const response = await client.send(command);
      const products = response.Items.map((item) => unmarshall(item));
      return products;
    } catch (e) {}
  };
}
