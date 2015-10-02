// import UserModel from '../exampleApp/scripts/UserModel'

// Import modules
let chai = require('chai'),
  path = require('path'),
  expect = chai.expect,
  Router = require(path.join(__dirname, '..', 'src/Router')),
  jsdom = require('mocha-jsdom');

// Set up Chai matchers
chai.should();

describe('Router', () => {
  jsdom()
  let router

  beforeEach(() => {
    router = new Router();
  });

  it('should get single level elements with get(param)', () => {
    router.go('user/123')
  });

});
