// expect states to be formatted as such (assuming flow is "start up" -> "cash in" -> "sell out" -> "bro down")
// Import modules
let chai = require('chai'),
  path = require('path'),
  // expect = chai.expect,
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
      transitionableFrom: ['start up'],
      callback: () => {
        stateMachine.dummy = 'dummy';
      }
    }, {
      name: 'sell out',
      transitionableFrom: ['cash in']
    }, {
      name: 'bro down',
      transitionableFrom: ['sell out', 'start up']
    }];
    stateMachine.create({
      initial: 'start up',
      states: states
    });
  });

  it('should be able to set all states with initial property', () => {
    stateMachine.states.should.eql(states);
    stateMachine.state.name.should.eql('start up');
  });

  it('should be able to set all states without initial property', () => {
    stateMachine = new StateMachine();
    stateMachine.create({
      states: states
    });
    stateMachine.states.should.eql(states);
    stateMachine.state.name.should.eql('start up');
  });

  it('should be able to transition to a specific (valid transition) state', () => {
    stateMachine.state = 'cash in';
    stateMachine.state.name.should.eql('cash in');
  });

  it('should be able to transition to a specific (valid transition) state skipping middle', () => {
    stateMachine.state = 'bro down';
    stateMachine.state.name.should.eql('bro down');
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
    stateMachine.state.name.should.eql('cash in');

    stateMachine.next();
    stateMachine.state.name.should.eql('sell out');
  });

  it('should fire callback on transitioned to state', () => {
    stateMachine.state = 'cash in';
    stateMachine.dummy.should.eql('dummy');
  });

  it('should push a state', () => {
    let newState = {
      name: 'pushed state',
      transitionableFrom: ['start up']
    };
    stateMachine.push(newState);
    stateMachine.state = 'pushed state';

    stateMachine.state.name.should.equal('pushed state');
  });
});
