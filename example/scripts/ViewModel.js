import BaseModel from './BaseModel'

export class ViewModel extends BaseModel {
  constructor() {
    super('view', {
      single: {type: 'string', value: 'from schema'},
      user: {type: 'object', value:
        {
          id: {type: 'number', value:88888},
          name: {type: 'string', value:'Sherlock Holmes'},
          address: {type: 'string', value:'221b Baker Street'}
        },
      },
      programming_languages: {type:'array', value: ['javascript', 'ruby']}
    })
  }
}
