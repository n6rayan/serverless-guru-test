import { APIGatewayEvent } from "aws-lambda";
import { z } from "zod";

import { createUserSchema } from "../lib/validation";
import { createItem } from "../lib/dynamo";

export type CreateUser = z.infer<typeof createUserSchema>['body'];

export const create = async (event: APIGatewayEvent) => {
  console.log('Event received: ', event);

  const body: CreateUser = event.body as CreateUser;

  // TODO: Insert data into Dynamo
  try {
    await createItem(body);
  }
  catch(err) {
    console.log("Problem creating user in Dynamo: ", err);

    return {
      statusCode: err.$metadata.statusCode ?? 500,
      body: JSON.stringify({ error: 'There was a problem creating the user in Dynamo' })
    }
  }

  return {
    statusCode: 201
  }
}