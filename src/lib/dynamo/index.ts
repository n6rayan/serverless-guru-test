import {
  DynamoDBClient,
  PutItemCommand,
  PutItemCommandOutput,
  PutItemInput,
  DeleteItemCommand,
  DeleteItemCommandOutput,
  DeleteItemInput,
} from '@aws-sdk/client-dynamodb';

import config from '../../config';
import { CreateUser } from '../../services/user';

const client = new DynamoDBClient({ ...config.dynamodb });

export const createItem = async (
  user: CreateUser & { id: string }
): Promise<PutItemCommandOutput> => {
  const params: PutItemInput = {
    TableName: 'users',
    Item: {
      id: {
        S: user.id,
      },
      email: {
        S: user.email,
      },
      dob: {
        S: user.dob,
      },
      name: {
        S: user.name,
      },
    },
  };

  console.log('[DynamoDB] Creating item in db', params);

  const command = new PutItemCommand(params);
  return await client.send(command);
};

export const deleteItem = async (
  id: string
): Promise<DeleteItemCommandOutput> => {
  const params: DeleteItemInput = {
    TableName: 'users',
    Key: {
      id: {
        S: id,
      },
    },
  };

  console.log('[DynamoDB] Deleting item in db', params);

  const command = new DeleteItemCommand(params);
  return await client.send(command);
};
