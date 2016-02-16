import fs      from 'fs';
import path    from 'path';
import install from 'jasmine-es6';
install();

class Helper {
  constructor() {}
  static get Fixtures() {
    return new Fixtures();
  }
}

class Fixtures {
  constructor() {
    this.base_path = path.resolve('./spec/fixtures/json');
  }
  load(url) {
    return fs.readFileSync(path.resolve(this.base_path, url), 'utf-8');
  }
}

export default Helper;
