import { APIGatewayEvent } from "aws-lambda";

import { createUserSchema } from "../lib/validation";
import { z } from "zod";

export type CreateUser = z.infer<typeof createUserSchema>['body'];

export const create = (event: APIGatewayEvent) => {
  console.log('Event received: ', event);

  const body: CreateUser = event.body as CreateUser;

  // TODO: Insert data into Dynamo

  return {
    statusCode: 201
  }
}