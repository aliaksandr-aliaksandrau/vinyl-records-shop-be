import { DynamoDB } from "aws-sdk";

import { mockedMusicRecords } from "./mocked-data";
const dynamoDB = new DynamoDB.DocumentClient();

const PRODUCTS_TABLE = "products";
const STOCKS_TABLE = "stocks";

const putMusicRecord = async (
  id: string,
  title: string,
  artist: string,
  description: string,
  price: number,
  year: number,
  album_cover_link: string
) => {
  const params = {
    TableName: PRODUCTS_TABLE,
    Item: {
      id,
      title,
      artist,
      description,
      price,
      year,
      album_cover_link,
    },
  };
  return dynamoDB.put(params).promise();
};

const putStock = async (record: string, count: number) => {
  const params = {
    TableName: STOCKS_TABLE,
    Item: {
      product_id: record,
      count,
    },
  };
  return dynamoDB.put(params).promise();
};

export const populateData = async () => {
  try {
    for (let record of mockedMusicRecords) {
      await putMusicRecord(
        record.id,
        record.title,
        record.artist,
        record.description,
        record.price,
        record.year,
        record.album_cover_link
      );
      await putStock(record.id, record.count);
    }

    console.log("Data table was filled successfully");

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Data table was filled successfully" }),
    };
  } catch (error) {
    console.error("Error on  filling data table with music records:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to fill data table" }),
    };
  }
};
