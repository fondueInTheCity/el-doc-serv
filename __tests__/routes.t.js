const request = require('supertest');
const express = require('express');
const router = require('../routes/user.router.js');

const app = new express();
app.use('/', router);

describe('Good Home Routes', function () {

  it('responds to /', async () => {
    const answer = {
      id: 2,
      email: 'test@gmail.com',
      firstName: 'testFirstName',
      lastName: 'testLastName',
      password: 'password',
      createdAt: '2022-04-23T04:34:22.000Z',
      updatedAt: '2022-04-23T04:34:22.000Z'}

    const res = await request(app).get('/2');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(answer);
  });

});
