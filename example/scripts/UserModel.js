import BaseModel from './BaseModel';

export class UserModel extends BaseModel {
  constructor() {
    super('user', {
      id: {
        value: 789787,
        type: 'number',
      },
      name: {
        value: 'name',
        type: 'string',
      },
      address: {
        value: '221b bake',
        type: 'string',
      },
      age: {
        value: null,
        type: 'number',
      },
    });
  }

  // example model helper
  upCase(str) {
    return str.toUpperCase();
  }
}
