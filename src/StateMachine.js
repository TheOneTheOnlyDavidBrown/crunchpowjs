// use sets state on object
// expect states to be formatted as such (assuming flow is "start up" -> "cash in" -> "sell out" -> "bro down")
// {
//    name: 'sell out'
//    transitionableFrom: ['cash in']
// }

export default class StateMachine {
  constructor() {
    this._states = [];
    this._state = '';
  }

  set states(states) {
    this._states = states;
    this._state = states[0];
  }

  get states() {
    return this._states;
  }

  getState(stateName) {
    let rtn = false;
    this._states.forEach((state) => {
      if (state.name === stateName) {
        rtn = state;
      }
    });
    // FIXME: throw error instead if none found
    return rtn;
  }

  set state(toState) {
    const toStateObj = this.getState(toState);
    this._state = this._transition(this._state, toStateObj);
    return this._state;
  }

  get state() {
    return this._state;
  }

  // this will work if your states are in the correct order
  next() {
    let stateIndex;

    this._states.forEach((state, index) => {
      if (state.name === this._state.name) {
        stateIndex = index;
      }
    });

    this._state = this._states[stateIndex + 1]
  }

  _transition(from, to) {
    let rtn = from;
    to.transitionableFrom.forEach((prop) => {
      if (prop === from.name) {
        rtn = to;
      }
    });
    return rtn;
  }
}
