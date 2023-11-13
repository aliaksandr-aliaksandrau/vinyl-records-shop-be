import { headers } from "../../libs/api-gateway";
import { middyfy } from "../../libs/lambda";
import { v4 as uuidv4 } from "uuid";

import productsDataService from "../../services";
import { APIGatewayProxyResult } from "aws-lambda";

export const createProduct = async (event): Promise<APIGatewayProxyResult> => {
  try {
    console.log("createProduct: event: ", event);
    const id = uuidv4();

    const { title, artist, description, price, year, count, album_cover_link } =
      event.body;

    await productsDataService.createMusicRecord({
      id,
      title,
      artist,
      description,
      price,
      year,
      album_cover_link: album_cover_link,
    });

    await productsDataService.createStock({
      product_id: id,
      count,
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: "Music record was created" }),
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: "Error on Music record create: ", e }),
    };
  }
};

export const main = middyfy(createProduct);
