import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";

import MusicRecord from "../model/music-record";

const { unmarshall } = require("@aws-sdk/util-dynamodb");
const client = new DynamoDBClient({ region: "eu-west-1" });

const productsDbParams = {
  TableName: "products",
};

const stocksDbParams = {
  TableName: "stocks",
};

type Stock = { product_id: string; count: number };

// TODO split service
export default class ProductsDataService {
  constructor() {}

  getMusicRecordsList: () => Promise<MusicRecord[]> = async () => {
    try {
      const command = new ScanCommand(productsDbParams);
      const response = await client.send(command);
      const products = response.Items.map((item) => unmarshall(item));
      return products;
    } catch (e) {}
  };

  getMusicRecordById: (id: string) => Promise<MusicRecord> = async (id) => {
    try {
      const params = {
        TableName: productsDbParams.TableName,
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
      console.error("Error on db get record by id: ", e);
      return null;
    }
  };

  getStockById: (id: string) => Promise<Stock> = async (id) => {
    try {
      const params = {
        TableName: stocksDbParams.TableName,
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
      console.error("Error on db get stock by id: ", e);
      return null;
    }
  };

  getStocks: () => Promise<Stock[]> = async () => {
    try {
      const command = new ScanCommand(stocksDbParams);
      const response = await client.send(command);
      const products = response.Items.map((item) => unmarshall(item));
      return products;
    } catch (e) {}
  };

  createMusicRecord: (record: Omit<MusicRecord, "count">) => any = async (
    record
  ) => {
    try {
      const params = {
        TableName: productsDbParams.TableName,
        Item: {
          id: { S: record.id },
          title: { S: record.title },
          artist: { S: record.artist },
          description: { S: record.description },
          price: { N: record.price.toString() },
          year: { N: record.year.toString() },
          album_cover_link: { S: record.album_cover_link },
        },
      };
      const command = new PutItemCommand(params);

      return client.send(command);
    } catch (e) {
      console.error("Error on db put music record: ", e);
    }
  };

  createStock: (record: Stock) => any = async (record) => {
    try {
      const params = {
        TableName: stocksDbParams.TableName,
        Item: {
          product_id: { S: record.product_id },
          count: { N: record.count.toString() },
        },
      };
      const command = new PutItemCommand(params);

      return client.send(command);
    } catch (e) {
      console.error("Error on db put stock: ", e);
    }
  };
}
