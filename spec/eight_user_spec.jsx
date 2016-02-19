import Helper    from './helpers/spec_helper';
import Eight     from '../src/jsx/lib/_eight';

describe("Eight::User#methods", () => {
  let user;

  beforeEach(() => {
    user = Eight.User;
  });

  describe("#is_premium", () => {

    it("call Eight::Api#perform with endpoint url", (done) => {
      spyOn(user.api, 'perform');
      user.is_premium();
      expect(user.api.perform)
                 .toHaveBeenCalledWith(user.api.CONTRACTS_API_ENDPOINT);
      done();
    });

    describe("Check account: is premium user", () => {

      it("call #is_premium resolve with google contract", (done) => {
        const done_fn = jasmine.createSpy("success");
        const fixture = JSON.parse(
          Helper.Fixtures.load('contracts_api_response_google.json'));
        spyOn(user.api, "perform").and.callFake((url) => {
          return Promise.resolve({
            ok: true, status: 200, url: url, body: fixture
          });
        });
        user.is_premium().then((response) => {
          done_fn(response);
          expect(done_fn).toHaveBeenCalledWith(fixture);
          done();
        });
      });

      it("call #is_premium resolve with apple contract", (done) => {
        const done_fn = jasmine.createSpy("success");
        const fixture = JSON.parse(
          Helper.Fixtures.load('contracts_api_response_apple.json'));
        spyOn(user.api, "perform").and.callFake((url) => {
          return Promise.resolve({
            ok: true, status: 200, url: url, body: fixture
          });
        });
        user.is_premium().then((response) => {
          done_fn(response);
          expect(done_fn).toHaveBeenCalledWith(fixture);
          done();
        });
      });

    }); // end of describe "Check account: is premium user"

    describe("Check account: is not premium user", () => {

      it("call #is_premium reject with 400 Bad Request", (done) => {
        const done_fn = jasmine.createSpy("error");
        spyOn(user.api, "perform").and.callFake((url) => {
          return Promise.reject({
            ok: false, status: 400, url: url, error: "error"
          });
        });
        user.is_premium().catch((status) => {
          done_fn(status);
          expect(done_fn).toHaveBeenCalledWith(400);
          done();
        });
      });

      it("call #is_premium reject with contract expired", (done) => {
        const done_fn = jasmine.createSpy("success");
        const fixture = JSON.parse(
          Helper.Fixtures.load('contracts_api_response_apple_expired.json'));
        spyOn(user.api, "perform").and.callFake((url) => {
          return Promise.resolve({
            ok: true, status: 200, url: url, body: fixture
          });
        });
        user.is_premium().catch((response) => {
          done_fn(response);
          expect(done_fn).toHaveBeenCalledWith('not contract');
          done();
        });
      });

    }); // end of describe "Check account: is not premium user"

  }); // end of describe "#is_premium"

  describe("#is_confirmed", () => {

    it("call Eight::Strage#get with strage key", (done) => {
      spyOn(user.strage, '_get').and.callFake((key) => {
        return Promise.resolve(key);
      });
      user.is_confirmed().then(() => {
        expect(user.strage._get)
                   .toHaveBeenCalledWith(user.strage.CONFIRMATION_KEY);
        done();
      });
    });

  });

}); // end of describe "Eight::User#methods"
