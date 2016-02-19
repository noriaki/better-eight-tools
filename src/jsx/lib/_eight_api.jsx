import request from 'superagent';

class EightApi {
  /* class variables */
  static get CONTRACTS_API_ENDPOINT() {
    return 'https://8card.net/contract/contracts/latest.json';
  }
  get CONTRACTS_API_ENDPOINT() {
    return this.constructor.CONTRACTS_API_ENDPOINT;
  }

  static get CSV_ORDERS_API_ENDPOINT() {
    return 'https://8card.net/export/csv_orders';
  }
  get CSV_ORDERS_API_ENDPOINT() {
    return this.constructor.CSV_ORDERS_API_ENDPOINT;
  }

  /* initialize */
  constructor(base) { this.base = base; }

  /* accessors */
  get user() { return this.base.user; }

  /* prototype methods */
  perform(url) {
    return new Promise((resolve, reject) => {
      request.get(url).type('json').end((error, response) => {
        error ? reject(error) : resolve(response);
      });
    });
  }

  is_contract(api_response_body) {
    const contract = api_response_body.apple_contract ||
                     api_response_body.google_contract ||
                     api_response_body.premium_ticket_contract;
    // status: 1==active, 4==expired;
    return contract.status === 1;
  }

}

export default EightApi;
