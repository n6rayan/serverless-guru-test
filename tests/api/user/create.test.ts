import supertest from 'supertest';

const request = supertest('http://0.0.0.0:3001/dev');

const payload = ({
  name = 'Some One',
  dob = '01/01/1999',
  email = 'some.one@email.com',
} = {}) => ({ name, dob, email });

describe('Create User', () => {
  it('should throw a 400 if the payload is incorrect', async () => {
    const response = await request
      .post('/api/user')
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

  it('should return a 201 and store the information in the db', async () => {
    const response = await request.post('/api/user').send(payload());

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        ...payload(),
      })
    );
  });
});
