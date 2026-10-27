const request = require('supertest');
const express = require('express');
const bodyParserPkg = require('body-parser/package.json');

describe('body-parser dependency update (GHSA-27r3-jxmh-p828)', () => {
  test('resolves the patched body-parser 2.4.0 version', () => {
    expect(bodyParserPkg.version).toBe('2.4.0');
  });

  test('express JSON body parsing still works with the patched body-parser', async () => {
    const app = express();
    app.use(express.json());
    app.post('/echo', (req, res) => res.json(req.body));

    const response = await request(app)
      .post('/echo')
      .set('Content-Type', 'application/json')
      .send({ hello: 'world' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ hello: 'world' });
  });
});
