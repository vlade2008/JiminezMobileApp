import update from 'react-addons-update'
import { createAction } from '../utils'
import Realm from '../datastore'
import _ from 'lodash'

export default {
  namespace: 'menudish',
  state: {
    records: [],
    activeRecord: {},
  },
  reducers: {
    loadMenu(state, { payload }) {
      return update(state, {
        records: {
          $set: payload,
        },
      })
    },
    updateActiveRecord(state, { payload }) {
      if (payload === 'clear') {
        return update(state, {
          activeRecord: {
            $set: {},
          },
        })
      } 
        return update(state, {
          activeRecord: {
            $merge: payload,
          },
        })
      
    },
  },
  effects: {
    getMenu: [
      function*({ payload }, { call, put }) {
        let loadData
        try {
          const dataRealm = Array.from(Realm.objects('menu'))
          loadData = _.map(dataRealm, (data, i) => {
            const values = {}
            values.id = data.id
            values.name = data.name
            values.price = data.price
            values.description = data.description
            return values
          })
        } catch (e) {
          console.log(e, 'na error getMenu')
        }

        yield put(createAction('loadMenu')(loadData))
      },
      { type: 'takeLatest' },
    ],
    funcUpdateActiveRecord: [
      function*({ payload }, { call, put }) {
        yield put(createAction('updateActiveRecord')(payload))
      },
      { type: 'takeLatest' },
    ],
  },
}
