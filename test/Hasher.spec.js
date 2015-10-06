// import UserModel from '../exampleApp/scripts/UserModel'

// Import modules
let chai = require('chai'),
  path = require('path'),
  expect = chai.expect,
  Hasher = require(path.join(__dirname, '..', 'src/Hasher'));

// Set up Chai matchers
chai.should();

describe('Utils', () => {
  let hasher;

  beforeEach(() => {
    hasher = new Hasher()
  });

  it('should hash an object', () => {
    let toHash = {
      prop: {
        array: ['aa', 'bb']
      }
    }
    expect(typeof hasher.value(toHash)).to.be.eql('number')
  });

  it('should hash an array', () => {
    let toHash = ['aa', 'bb']
    expect(typeof hasher.value(toHash)).to.be.eql('number')
  });

  it('should compare two identical arrays', () => {
    let arr1 = ['aa', 'bb']
    let arr2 = ['aa', 'bb']
    expect(hasher.compare(arr1, arr2)).to.be.eql(true)
  });

  it('should compare two NOT identical arrays', () => {
    let arr1 = ['aa', 'cc']
    let arr2 = ['cc', 'bb']
    expect(hasher.compare(arr1, arr2)).to.be.eql(false)
  });

  it('should compare two identical objects', () => {
    let obj1 = {
      object: 'value'
    }
    let obj2 = {
      object: 'value'
    }
    expect(hasher.compare(obj1, obj2)).to.be.eql(true)
  });

  it('should compare two NOT identical objects (deep)', () => {
    let obj1 = {
      object: 'value',
      deep: {
        object: 'value@@@@'
      }
    }
    let obj2 = {
      object: 'value',
      deep: {
        object: 'value'
      }
    }
    expect(hasher.compare(obj1, obj2)).to.be.eql(false)
  });

  it('should compare two NOT identical objects (shallow)', () => {
    let obj1 = {
      object1: 'value'
    }
    let obj2 = {
      object2: 'value'
    }
    expect(hasher.compare(obj1, obj2)).to.be.eql(false)
  });

  it('should compare empty to not empty', () => {
    let obj1 = {
      object1: 'value',
      deep: {
        item: ['aa']
      }
    }
    let obj2 = {}
    expect(hasher.compare(obj1, obj2)).to.be.eql(false)
  });

});
