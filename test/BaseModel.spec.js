'use strict';
// import UserModel from '../exampleApp/scripts/UserModel'

// Import modules
let chai = require('chai'),
    path = require('path'),
    expect = chai.expect,
    BaseModel = require(path.join(__dirname, '..', 'exampleApp/scripts/BaseModel'));

// Set up Chai matchers
chai.should();

describe('Base Model', () => {
  let model
  let schema = {
      single: {type: 'string', value: 'from schema'},
      user: {type: 'object', value:
        {
          id: {type: 'number', value:12345},
          name: {type: 'string', value:'Sherlock Holmes'},
          address: {type: 'string', value:'221b Baker Street'}
        },
      },
      programming_languages: {type:'array', value: ['javascript', 'ruby']}
    }

  beforeEach(() => {
    model = new BaseModel('user', schema)
  });

  it('should get nested elements with get(param)', () => {
    model.get('user.id').should.equal(12345)
    model.get('user.name').should.equal('Sherlock Holmes')
  });

  it('should get single level elements with get(param)', () => {
    model.get('single').should.equal('from schema')
  });

  it('should get all elements with get()', () => {
    let all = model.get()
    expect(all).to.have.keys('single', 'user', 'programming_languages')
    expect(all.user).to.have.keys('id', 'name', 'address')
  });

  it('should catch if element is not in schema', () => {
    expect(model.set('doesntexist', 'value')).to.be.a('undefined')
  });

  it('should catch if element is not on the correct type', () => {
    model.set('single', 123)
    expect(model.get('single')).to.be.equal('from schema')
  });
});
