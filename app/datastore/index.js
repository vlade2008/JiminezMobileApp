

import Realm from 'realm'

const MenuSchemaObject = {
  name: 'menu',
  primaryKey: 'id',
  properties: {
    id: { type: 'int', default: '' },
    name: { type: 'string', default: '' },
    price: { type: 'string', default: '' },
    description: { type: 'string', default: '' },
  },
}

const PatientSchemaObject = {
  name: 'patient',
  primaryKey: 'id',
  properties: {
    id: { type: 'int' },
    name: { type: 'string'},
    date_admitted: { type: 'string' },
    date_discharge: { type: 'string' },
    pf: { type: 'string'},
    pf_philhealth: { type: 'string'},
    hospital: { type: 'string' },
    status: { type: 'bool'},
  },
}

class MenuSchema extends Realm.Object {}
MenuSchema.schema = MenuSchemaObject

class PatientSchema extends Realm.Object {}
PatientSchema.schema = PatientSchemaObject

export default new Realm({ schema: [MenuSchema, PatientSchema] })
