class EightStrage {

  /* class variables */
  static get CONFIRMATION_KEY() {
    return 'is_confirmed_v021';
  }
  get CONFIRMATION_KEY() {
    return this.constructor.CONFIRMATION_KEY;
  }

  /* initialize */
  constructor(base) { this.base = base; }

  /* prototype methods */
  attr(key, val) {
    return((val === undefined) ? this._get(key) : this._set(key, val));
  }
  _get(key) {
    return new Promise((resolve) => {
      chrome.storage.sync.get((ret) => { resolve(ret[key]); });
    });
  }
  _set(key, val) {
    const obj = {}; obj[key] = val;
    return new Promise((resolve, reject) => {
      chrome.storage.sync.set(obj, (error) => {
        error ? reject(error) : resolve();
      });
    });
  }

  /* accessors */
  get user() { return this.base.user; }

}

export default EightStrage;
