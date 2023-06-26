import {
  DynamoDBClient,
  PutItemCommand,
  PutItemCommandOutput,
  PutItemInput,
  DeleteItemCommand,
  DeleteItemCommandOutput,
  DeleteItemInput,
  GetItemCommand,
  GetItemCommandOutput,
  GetItemInput,
  UpdateItemCommand,
  UpdateItemCommandInput,
  UpdateItemCommandOutput,
} from '@aws-sdk/client-dynamodb';

import config from '../../config';
import { UserPayload } from '../../services/user';

const client = new DynamoDBClient({ ...config.dynamodb });

export const createItem = async (
  user: UserPayload & { id: string }
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

export const updateItem = async (
  user: UserPayload & { id: string }
): Promise<UpdateItemCommandOutput> => {
  console.log({ user });

  const params: UpdateItemCommandInput = {
    TableName: 'users',
    Key: {
      id: {
        S: user.id,
      },
    },
    AttributeUpdates: {},
  };

  if (user.dob) {
    params.AttributeUpdates.dob = {
      Value: {
        S: user.dob,
      },
      Action: 'PUT',
    };
  }

  if (user.email) {
    params.AttributeUpdates.email = {
      Value: {
        S: user.email,
      },
      Action: 'PUT',
    };
  }

  if (user.name) {
    params.AttributeUpdates.name = {
      Value: {
        S: user.name,
      },
      Action: 'PUT',
    };
  }

  console.log('[DynamoDB] Updating item in db', params);

  const command = new UpdateItemCommand(params);
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

export const getItem = async (id: string): Promise<GetItemCommandOutput> => {
  const params: GetItemInput = {
    TableName: 'users',
    Key: {
      id: {
        S: id,
      },
    },
  };

  console.log('[DynamoDB] Retrieving item in db', params);

  const command = new GetItemCommand(params);
  return await client.send(command);
};
