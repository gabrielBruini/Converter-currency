import { Express } from 'express';
import request from 'supertest';
import App from '@/App';

jest.setTimeout(30000);

describe('ConverterCurrencyControoler', () => {
  let app: Express;
  beforeEach(async () => {
    app = await new App().start();
  });
  it('should return status 400 when the requisition has no "to" in the body.', async () => {
    const response = await request(app).post('/converter').send({ to: '' });

    expect(response.status).toBe(422);
    expect(response.body).toStrictEqual({
      error: '"to" is not allowed to be empty',
    });
  });
  it('should return status 400 when the requisition has no "from" in the body.', async () => {
    const response = await request(app)
      .post('/converter')
      .send({ to: 'EUR', from: '' });

    expect(response.status).toBe(422);
    expect(response.body).toStrictEqual({
      error: '"from" is not allowed to be empty',
    });
  });
  it('should return status 400 when the requisition amount is a string', async () => {
    const response = await request(app)
      .post('/converter')
      .send({ to: 'EUR', from: 'GBP', amount: '' });

    expect(response.status).toBe(422);
    expect(response.body).toStrictEqual({
      error: '"amount" must be a number',
    });
  });
  it('should return a body with to,from,amount and request', async () => {
    const response = await request(app)
      .post('/converter')
      .send({ to: 'EUR', from: 'GBP', amount: 10 });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('to');
    expect(response.body).toHaveProperty('from');
    expect(response.body).toHaveProperty('amount');
    expect(response.body).toHaveProperty('result');
  });
});
