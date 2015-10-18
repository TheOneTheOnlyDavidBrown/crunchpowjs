// expect states to be formatted as such (assuming flow is "start up" -> "cash in" -> "sell out" -> "bro down")
// Import modules
let chai = require('chai'),
  path = require('path'),
  expect = chai.expect,
  StateMachine = require(path.join(__dirname, '..', 'src/StateMachine'));

// Set up Chai matchers
chai.should();

describe('State Machine', () => {
  let stateMachine;
  let states;

  beforeEach(() => {
    stateMachine = new StateMachine();
    states = [{
      name: 'start up',
      transitionableFrom: []
    }, {
      name: 'cash in',
      transitionableFrom: ['start up']
    }, {
      name: 'sell out',
      transitionableFrom: ['cash in']
    }, {
      name: 'bro down',
      transitionableFrom: ['sell out', 'start up']
    }];
    stateMachine.states = states;
  });

  it('should be able to set all states', () => {
    stateMachine.states.should.eql(states);
    stateMachine.state.should.eql(states[0]);
  });

  it('should be able to transition to a specific (valid transition) state', () => {
    stateMachine.state = 'cash in';
    stateMachine.state.should.eql({
      name: 'cash in',
      transitionableFrom: ['start up']
    });
  });

  it('should be able to transition to a specific (valid transition) state skipping middle', () => {
    stateMachine.state = 'bro down';
    stateMachine.state.should.eql({
      name: 'bro down',
      transitionableFrom: ['sell out', 'start up']
    });
  });

  it('should not be able to transition to a specific (invalid transition) state', () => {
    stateMachine.state = 'sell out';
    stateMachine.state.should.eql({
      name: 'start up',
      transitionableFrom: []
    });
  });

  it('should be able to transition to the "next" state', () => {
    stateMachine.next();
    stateMachine.state.should.eql({
      name: 'cash in',
      transitionableFrom: ['start up']
    });

    stateMachine.next();
    stateMachine.state.should.eql({
      name: 'sell out',
      transitionableFrom: ['cash in']
    });
  });
});
