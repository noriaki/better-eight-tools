export default class EightUser {

  /* initialize */
  constructor(base) { this.base = base; }

  /* accessors */
  get api() { return this.base.api; }
  get strage() { return this.base.strage; }

  /* prototype methods */
  is_premium() {
    return new Promise((resolve, reject) => {
      this.api.perform(this.api.CONTRACTS_API_ENDPOINT).then((response) => {
        if(response.ok) {
          if(this.api.is_contract(response.body)/* && false/* debug */) {
            resolve(response.body);
          } else {
            reject('not contract');
          }
        } else { reject(response.status); }
      }).catch((error) => { reject(error.status); });
    });
  } // end of EightUser#is_premium

  is_confirmed() {
    return new Promise((resolve, reject) => {
      this.strage.attr(this.strage.CONFIRMATION_KEY).then((value) => {
        value ? resolve() : reject();
      });
    });
  } // end of EightUser#is_confirmed

  confirm() {
    //return new Promise((resolve, reject) => {
      return this.strage.attr(this.strage.CONFIRMATION_KEY, true);
    //});
  }

} // end of class EightUser
