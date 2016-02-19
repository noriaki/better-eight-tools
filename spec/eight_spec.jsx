import './helpers/spec_helper';
import Eight       from '../src/jsx/lib/_eight';
import EightUser   from '../src/jsx/lib/_eight_user';
import EightApi    from '../src/jsx/lib/_eight_api';
import EightStrage from '../src/jsx/lib/_eight_strage';

describe("Eight modules", () => {
  let api, user, strage;

  beforeEach(() => {
    api = Eight.Api;
    user = Eight.User;
    strage = Eight.Strage;
  });

  describe("Eight::Api class definition", () => {

    it("Api class exists as Eight module child", () => {
      expect(api).toEqual(new EightApi(Eight));
    });

    it("api instance access user", () => {
      expect(api.user).toEqual(user);
    });

  });

  describe("Eight::Strage class definition", () => {

    it("Strage class exists as Eight module child", () => {
      expect(strage).toEqual(new EightStrage(Eight));
    });

  });

  describe("Eight::User class definition", () => {

    it("User class exists as Eight module child", () => {
      expect(user).toEqual(new EightUser(Eight));
    });

    it("user instance access api", () => {
      expect(user.api).toEqual(api);
    });

  });

}); // end of describe "Eight modules"


describe("Eight::Api#methods", () => {

});
