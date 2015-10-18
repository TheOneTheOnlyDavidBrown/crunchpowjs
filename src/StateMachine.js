// use sets state on object
// expect states to be formatted as such (assuming flow is "start up" -> "cash in" -> "sell out" -> "bro down")
// {
//    name: 'sell out'
//    transitionableFrom: ['cash in']
// }
// allow removing state

export default class StateMachine {
  constructor(stateMachine) {
    this.states = stateMachine.states;
    this._state = this.findState(stateMachine.initial) || stateMachine.states[0];
  }

  push(state) {
    this._states.push(state);
  }

  set states(states) {
    this._states = states;
  }

  get states() {
    return this._states;
  }

  set state(toState) {
    const toStateObj = this.findState(toState);
    this._state = this._transition(this._state, toStateObj);
    this._runCallback();
    return this._state;
  }

  get state() {
    return this._state;
  }

  findState(stateName) {
    let rtn = false;
    this._states.forEach((state) => {
      if (state.name === stateName) {
        rtn = state;
      }
    });
    // FIXME: throw error instead if none found
    return rtn;
  }

  // this will work if your states are in the correct order
  next() {
    const stateIndex = this._getStateIndex();
    this.state = this._states[stateIndex + 1].name;
  }

  _getStateIndex() {
    let rtn;
    this._states.forEach((state, index) => {
      if (state.name === this._state.name) {
        rtn = index;
      }
    });
    return rtn;
  }

  _runCallback() {
    if (this._state.callback) {
      this._state.callback();
    }
  }

  _transition(from, to) {
    let rtn = from;
    if (to.transitionableFrom && to.transitionableFrom[0] === '*') {
      rtn = to;
    } else {
      to.transitionableFrom.forEach((prop) => {
        if (prop === from.name) {
          rtn = to;
        }
      });
    }
    return rtn;
  }
}
