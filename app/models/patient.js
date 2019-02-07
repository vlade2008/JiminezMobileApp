import update from 'react-addons-update'
import { createAction } from '../utils'
import Realm from '../datastore'
import _ from 'lodash'

export default {
  namespace: 'patient',
  state: {
    records: [],
    activeRecord: {},
  },
  reducers: {
    loadPatient(state, { payload }) {
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
    getPatient: [
      function*({ payload }, { call, put }) {
        let loadData
        try {
          const dataRealm = Array.from(Realm.objects('patient'))
          loadData = _.map(dataRealm, (data, i) => {
            const values = {}

            values.id = data.id
            values.name = data.name
            values.date_admitted = data.date_admitted
            values.date_discharge = data.date_discharge
            values.pf = data.pf
            values.pf_philhealth = data.pf_philhealth
            values.hospital = data.hospital
            values.status = data.status
            values.nameAndHospital = data.name + ' ' + data.hospital
            values.status_philhealth = data.status_philhealth
            return values
          })
        } catch (e) {
          console.log(e, 'na error getMenu')
        }

        yield put(createAction('loadPatient')(loadData))
      },
      { type: 'takeLatest' },
    ],
    updateRecord: [
      function*({ payload }, { call, put }) {
        yield put(createAction('loadPatient')(payload))
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
