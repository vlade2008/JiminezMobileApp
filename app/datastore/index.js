

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

class MenuSchema extends Realm.Object {}
MenuSchema.schema = MenuSchemaObject

export default new Realm({ schema: [MenuSchema] })
