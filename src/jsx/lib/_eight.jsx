import User    from './_eight_user';
import Api     from './_eight_api';
import Strage  from './_eight_strage';

const _map = new WeakMap();

class Eight {

  /* class variables */

  /* initialize */
  constructor() {}

  /* prototype methods */

  /* accessors */
  static get User() {
    if(!_map.has(User)) _map.set(User, new User(this));
    return _map.get(User);
  }
  static get user() { return this.User; }

  static get Api() {
    if(!_map.has(Api)) _map.set(Api, new Api(this));
    return _map.get(Api);
  }
  static get api() { return this.Api; }

  static get Strage() {
    if(!_map.has(Strage)) _map.set(Strage, new Strage(this));
    return _map.get(Strage);
  }
  static get strage() { return this.Strage; }

} // end of class Eight

export default Eight;
