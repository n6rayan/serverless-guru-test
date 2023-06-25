import { APIGatewayEvent, Handler } from "aws-lambda";
import middy from "@middy/core";
import jsonBodyParser from '@middy/http-json-body-parser'

import { create } from "../services/user";
import { validator, createUserSchema } from "../lib/validation";

const createUser = async (event: APIGatewayEvent) => create(event);
export const createHandler: Handler = middy().use(jsonBodyParser()).use(validator(createUserSchema)).handler(createUser);