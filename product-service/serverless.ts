import createProduct from "@functions/create-product";
import getProductById from "@functions/get-product-by-id";
import getProductsList from "@functions/get-products-list";
import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
  service: "product-service",
  frameworkVersion: "3",
  plugins: [
    "serverless-esbuild",
    "serverless-auto-swagger",
    "serverless-webpack",
    "serverless-dynamodb-local",
    "serverless-offline",
    "serverless-offline-watcher",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs16.x",
    stage: "dev",
    region: "eu-west-1",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    httpApi: {
      cors: true,
    },
    iam: {
      role: {
        managedPolicies: ["arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess"],
      },
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      PRODUCTS_TABLE: "products",
      STOCKS_TABLE: "stocks",
    },
  },
  functions: {
    getProductsList,
    getProductById,
    createProduct,
    populateData: {
      handler: "db/populate-data.populateData",
      timeout: 10,
    },
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
    webpack: {
      excludeFiles: "**/*.test.js",
    },
    dynamodb: {
      stages: ["dev"],
      start: {
        port: 8000,
        inMemory: true,
        migrate: true,
      },
    },
  },
};

module.exports = serverlessConfiguration;
