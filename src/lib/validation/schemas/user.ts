import z from 'zod';

export const createUserSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    }),
    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
      })
      .email({ message: 'Email must be in a valid format' }),
    dob: z.string({
      required_error: 'DOB is required',
      invalid_type_error: 'DOB must be a date string',
    }),
  }),
});

export const updateUserSchema = z.object({
  pathParameters: z.object({
    userId: z.string({
      required_error: 'User ID is required',
      invalid_type_error: 'User ID must be a string',
    }),
  }),
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
        invalid_type_error: 'Name must be a string',
      })
      .optional(),
    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
      })
      .email({ message: 'Email must be in a valid format' })
      .optional(),
    dob: z
      .string({
        required_error: 'DOB is required',
        invalid_type_error: 'DOB must be a date string',
      })
      .optional(),
  }),
});

export const deleteUserSchema = z.object({
  pathParameters: z.object({
    userId: z.string({
      required_error: 'User ID is required',
      invalid_type_error: 'User ID must be a string',
    }),
  }),
});

export const getUserSchema = z.object({
  pathParameters: z.object({
    userId: z.string({
      required_error: 'User ID is required',
      invalid_type_error: 'User ID must be a string',
    }),
  }),
});
