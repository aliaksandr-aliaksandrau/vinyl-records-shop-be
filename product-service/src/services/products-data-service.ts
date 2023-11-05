import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";

import MusicRecord from "../model/music-record";
import { mockedMusicRecords } from "./../../db/mocked-data";

const { unmarshall } = require("@aws-sdk/util-dynamodb");
const client = new DynamoDBClient({ region: "eu-west-1" });

const productsParams = {
  TableName: "products",
};

const stocksParams = {
  TableName: "stocks",
};

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
    return mockedMusicRecords.find((el) => el.id === id);
  };

  getMusicRecordsStocks: () => Promise<
    { product_id: string; count: number }[]
  > = async () => {
    try {
      const command = new ScanCommand(stocksParams);
      const response = await client.send(command);
      const products = response.Items.map((item) => unmarshall(item));
      return products;
    } catch (e) {}
  };
}
