import { APIGatewayEvent, Handler } from 'aws-lambda';
import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';

import {
  createUser,
  removeUser,
  retrieveUser,
  updateUser,
} from '../services/user';
import {
  validator,
  createUserSchema,
  deleteUserSchema,
  getUserSchema,
  updateUserSchema,
} from '../lib/validation';

const postUser = async (event: APIGatewayEvent) => createUser(event);
export const createHandler: Handler = middy()
  .use(jsonBodyParser())
  .use(validator(createUserSchema))
  .handler(postUser);

const deleteUser = async (event: APIGatewayEvent) => removeUser(event);
export const deleteHandler: Handler = middy()
  .use(validator(deleteUserSchema))
  .handler(deleteUser);

const getUser = async (event: APIGatewayEvent) => retrieveUser(event);
export const getHandler: Handler = middy()
  .use(validator(getUserSchema))
  .handler(getUser);

const patchUser = async (event: APIGatewayEvent) => updateUser(event);
export const patchHandler: Handler = middy()
  .use(jsonBodyParser())
  .use(validator(updateUserSchema))
  .handler(patchUser);
