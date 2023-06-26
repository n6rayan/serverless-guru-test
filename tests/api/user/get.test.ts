import supertest from 'supertest';

import { User } from '../../../src/services/user';

const request = supertest('http://0.0.0.0:3001/dev');

const payload = ({
  name = 'Some One',
  dob = '01/01/1999',
  email = 'some.one@email.com',
} = {}) => ({ name, dob, email });

describe('Get User', () => {
  let user: User;

  beforeEach(async () => {
    const createUser = await request.post('/api/user').send(payload());
    user = createUser.body;
  });

  it('should return a 200 and the user', async () => {
    const response = await request.get(`/api/user/${user.id}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(user);
  });
});
