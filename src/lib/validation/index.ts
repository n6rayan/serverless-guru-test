import { MiddlewareObj } from '@middy/core';
import { ZodSchema } from 'zod';

export const validator = (schema: ZodSchema): Pick<MiddlewareObj, 'before' | 'onError' > => ({
  before: async (request) => {
    try {
      console.log('Request object: ', request);

      request.event = await schema.parseAsync(request.event)
    }
    catch (err) {
      console.error('Error parsing payload', err);

      return {
        statusCode: 400,
        body: JSON.stringify(err)
      }
    }
  },
  onError: (request) => {
    console.log(request.error);

    return {
      statusCode: 400,
      body: JSON.stringify(request.error)
    }
  }
});

export * from './schemas';