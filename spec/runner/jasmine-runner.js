import 'babel-register';
import Jasmine from 'jasmine';
import SpecReporter from 'jasmine-spec-reporter';

const jrunner = new Jasmine();
// remove default reporter logs
jrunner.configureDefaultReporter({print: function() {}});
// add jasmine-spec-reporter
jasmine.getEnv().addReporter(new SpecReporter());
// load jasmine.json configuration
jrunner.loadConfigFile();
jrunner.execute();
