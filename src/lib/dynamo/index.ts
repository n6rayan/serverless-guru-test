import { DynamoDBClient, PutItemCommand, PutItemCommandOutput, PutItemInput } from "@aws-sdk/client-dynamodb";

import config from "../../config";
import { CreateUser } from "../../services/user";

const client = new DynamoDBClient({ ...config.dynamodb });

export const createItem = async (user: CreateUser): Promise<PutItemCommandOutput> => {
  const params: PutItemInput = {
    TableName: 'users',
    Item: {
      email: {
        S: user.email
      },
      dob: {
        S: user.dob
      },
      name: {
        S: user.name
      }
    }
  };

  console.log("[DynamoDB] Creating item in db", params);

  const command = new PutItemCommand(params);
  return await client.send(command);
};