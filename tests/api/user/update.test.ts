import supertest from 'supertest';

import { User } from '../../../src/services/user';

const request = supertest('http://0.0.0.0:3001/dev');

const payload = ({
  name = 'Some One',
  dob = '01/01/1999',
  email = 'some.one@email.com',
} = {}) => ({ name, dob, email });

describe('Update User', () => {
  let user: User;

  beforeEach(async () => {
    const createUser = await request.post('/api/user').send(payload());
    user = createUser.body;
  });

  it('should throw a 400 if the payload is incorrect', async () => {
    const response = await request
      .patch(`api/user/${user.id}`)
      .send(payload({ email: 'wrong format' }));

    expect(response.body).toEqual(
      expect.objectContaining({
        issues: expect.arrayContaining([
          expect.objectContaining({
            message: 'Email must be in a valid format',
          }),
        ]),
      })
    );
    expect(response.statusCode).toEqual(400);
  });

  it('should return a 200 and the updated user info', async () => {
    const update = payload({ name: 'New Name', email: 'new.name@email.com' });

    const response = await request.patch(`/api/user/${user.id}`).send(update);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(expect.objectContaining(update));
  });
});
