/* eslint-disable import/no-extraneous-dependencies */
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Country,Activity, conn } = require('../../src/db.js');

let chai = require('chai');
let chaiHttp = require('chai-http');
const { expect } = require('chai').expect;
chai.use(chaiHttp);
const url= 'http://localhost:3001';

const agent = session(app);

const country = {
  name: 'Argentina',
};

describe('Country routes', () => {
  before(() =>
    conn.authenticate()
    .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
    describe("GET /countries", () => {
      it("should get 200", (done) => {agent.get("/api/countries/").expect(200), done()})
      it('responds with 200', () =>  agent.get('/countries/?offset=10').expect(200));
      it('responds with 200', () =>  agent.get('/countries/?offset=10&continent=europe').expect(200));
      it('responds with 200 when have continent and sort', () =>  agent.get('/countries/?offset=10&continent=europe&sort=AtoZ').expect(200));
      it('responds with 200 in low case', () => agent.get('/countries/arg').expect(200));
      it('responds with 200 in upper case', () => agent.get('/countries/ARG').expect(200));
      it('responds with 200 convined', () => agent.get('/countries/Arg').expect(200));
    })
});
