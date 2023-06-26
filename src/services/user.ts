import { APIGatewayEvent } from 'aws-lambda';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

import { createUserSchema } from '../lib/validation';
import { createItem, deleteItem } from '../lib/dynamo';

export type CreateUser = z.infer<typeof createUserSchema>['body'];

export const createUser = async (event: APIGatewayEvent) => {
  console.log('Event received: ', event);

  const body: CreateUser = event.body as CreateUser;
  const userId = uuidv4();

  const user = {
    id: userId,
    ...body,
  };

  try {
    await createItem(user);
  } catch (err) {
    console.log('Problem creating user in Dynamo: ', err);

    return {
      statusCode: err.$metadata.httpStatusCode ?? 500,
      body: JSON.stringify({
        error: 'There was a problem creating the user',
      }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(user),
  };
};

export const removeUser = async (event: APIGatewayEvent) => {
  console.log('Event received: ', event);

  const { pathParameters } = event;
  try {
    await deleteItem(pathParameters.userId);
  } catch (err) {
    console.log('Problem deleting user in Dynamo: ', err);

    return {
      statusCode: err.$metadata.statusCode ?? 500,
      body: JSON.stringify({
        error: 'There was a problem deleting the user',
      }),
    };
  }

  return {
    statusCode: 204,
  };
};
