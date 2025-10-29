const path = require('path');
const { Pact } = require('@pact-foundation/pact');
const { Matchers } = require('@pact-foundation/pact');
const axios = require('axios');
const { expect } = require('chai');



const { eachLike, like, integer, boolean, string } = Matchers;

describe('Entitlement API Pact', () => {
  const provider = new Pact({
    consumer: 'EntitlementConsumer',
    provider: 'EntitlementProvider',
    port: 8081,
    log: path.resolve(process.cwd(), 'logs', 'pact.log'),
    dir: path.resolve(process.cwd(), 'pacts'),
    logLevel: 'INFO',
    spec: 2.0
  });

  before(() => provider.setup());
  after(() => provider.finalize());

  describe('GET /entitlements', () => {
    before(() => {
      return provider.addInteraction({
        state: 'entitlements exist',
        uponReceiving: 'a request for entitlements',
        withRequest: {
          method: 'GET',
          path: '/entitlements',
          query: {
            limit: '2',
            offset: '0',
          },
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: {
            limit: like(2),
            offset: like(0),
            count: like(2),
            total: like(5),
            data: eachLike({
              entitlementID: integer(1),
              entitlement_group_ID: string('group123'),
              entitlement_version: string('v1'),
              sku: string('SKU123'),
              ship_string: string('2026-05-19'),
              start_string: string('2025-05-20'),
              end_string: string('2026-05-19'),
              status: string('FULFILLED'),
              quantity: integer(10),
              csp_ID: string('CSP123'),
              term: string('12 months'),
              product_type: string('software'),
          
            }),
          },
        },
      });
    });

    it('should return a list of entitlements', async () => {
      const response = await axios.get('http://localhost:8081/entitlements', {
        params: { limit: 2, offset: 0 },
      });

      expect(response.status).to.equal(200);
      expect(response.data).to.have.property('data').that.is.an('array');
      expect(response.data.limit).to.equal(2);
      expect(response.data.offset).to.equal(0);

      await provider.verify();
    });
  });

  describe('GET /entitlements/{id}', () => {
    before(() => {
      return provider.addInteraction({
        state: 'entitlements 5 exists',
        uponReceiving: 'a request for entitlement with id 5',
        withRequest: {
          method: 'GET',
          path: '/entitlements/5',
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: {
            status: string('success'),
            message: string('success'),
            data: eachLike({
              entitlementID: integer(5),
              entitlement_group_ID: string('group123'),
              entitlement_version: string('v1'),
              sku: string('SKU123'),
              ship_string: string('2025-05-19'),
              start_string: string('2025-05-20'),
              end_string: string('2026-05-19'),
              status: string('FULFILLED'),
              quantity: integer(10),
              csp_ID: string('CSP123'),
              term: string('12 months'),
              product_type: string('software'),
            }),
          },
        },
      });
    });

    it('should return a single entitlement by ID', async () => {
      const response = await axios.get('http://localhost:8081/entitlements/5');

      expect(response.status).to.equal(200);
      expect(response.data).to.have.property('data').that.is.an('array');
      expect(response.data.data[0].entitlementID).to.equal(5);

      await provider.verify();
    });
  });

  describe('when the entitlement does not exist', () => {
    before(() => {
      return provider.addInteraction({
        state: 'no entitlement with ID 999 exists',
        uponReceiving: 'a request for a non-existent entitlement with id 999',
        withRequest: {
          method: 'GET',
          path: '/entitlements/999',
        },
        willRespondWith: {
          status: 404,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: {
            status: string('error'),
            message: string('Entitlement not found'),
          },
        },
      });
    });

    it('should return a 404 not found response', async () => {
      try {
        await axios.get('http://localhost:8081/entitlements/999');
      } catch (error) {
        expect(error.response.status).to.equal(404);
        expect(error.response.data).to.have.property('message', 'Entitlement not found');
        expect(error.response.data.status).to.equal('error');
      }

      await provider.verify();
    });
  });
  
});
