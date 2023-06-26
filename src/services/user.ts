import { APIGatewayEvent } from 'aws-lambda';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

import { createUserSchema, updateUserSchema } from '../lib/validation';
import { createItem, deleteItem, getItem, updateItem } from '../lib/dynamo';

export type UserPayload = z.infer<
  typeof createUserSchema | typeof updateUserSchema
>['body'];
export type User = UserPayload & { id: string };

export const createUser = async (event: APIGatewayEvent) => {
  console.log('Event received: ', event);

  const body: UserPayload = event.body as UserPayload;
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

export const updateUser = async (event: APIGatewayEvent) => {
  console.log('Event received: ', event);

  const body: UserPayload = event.body as UserPayload;
  const { pathParameters } = event;

  const user = {
    id: pathParameters.userId,
    ...body,
  };

  try {
    await updateItem(user);
  } catch (err) {
    console.log('Problem updating user in Dynamo: ', err);

    return {
      statusCode: err.$metadata.httpStatusCode ?? 500,
      body: JSON.stringify({
        error: 'There was a problem updating the user',
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

export const retrieveUser = async (event: APIGatewayEvent) => {
  console.log('Event received: ', event);

  const { pathParameters } = event;

  let user: User;
  try {
    const { id, name, email, dob } = (await getItem(pathParameters.userId))
      .Item;

    user = {
      id: id.S,
      name: name.S,
      email: email.S,
      dob: dob.S,
    };
  } catch (err) {
    console.log('Problem retrieving user in Dynamo: ', err);

    return {
      statusCode: err.$metadata.statusCode ?? 500,
      body: JSON.stringify({
        error: 'There was a problem retrieving the user',
      }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(user),
  };
};
