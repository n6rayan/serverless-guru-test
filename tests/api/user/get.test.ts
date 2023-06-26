import supertest from 'supertest';

import { User } from '../../../src/services/user';

const request = supertest('http://0.0.0.0:3001/dev');

describe('Get User', () => {
  let user: User;

  beforeEach(async () => {
    const createUser = await request.post('/api/user');
    user = createUser.body;
  });

  it('should return a 200 and the user', async () => {
    const response = await request.get(`/api/user/${user.id}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(user);
  });
});
