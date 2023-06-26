import supertest from 'supertest';

const request = supertest('http://0.0.0.0:3001/dev');

describe('Delete User', () => {
  let userId: string;

  beforeEach(async () => {
    const createUser = await request.post('/api/user');
    userId = createUser.body.id;
  });

  it('should return a 204 and remove the user', async () => {
    const response = await request.delete(`/api/user/${userId}`);

    expect(response.statusCode).toEqual(204);
  });
});
