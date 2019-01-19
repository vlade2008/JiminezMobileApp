import React from 'react'
import { AppRegistry } from 'react-native'
import { LocaleProvider } from 'antd-mobile'
import enUS from 'antd-mobile/lib/locale-provider/en_US'

import dva from './utils/dva'
import Router, { routerMiddleware } from './router'

import appModel from './models/app'
import routerModel from './models/router'
import menudish from './models/menudish'
import patient from './models/patient'

console.ignoredYellowBox = [
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Warning: componentWillUpdate is deprecated',
]

const app = dva({
  initialState: {},
  models: [appModel, routerModel, menudish, patient],
  onAction: [routerMiddleware],
  onError(e) {
    console.log('onError', e)
  },
})

const App = app.start(
  <LocaleProvider locale={enUS}>
    <Router />
  </LocaleProvider>
)

AppRegistry.registerComponent('JiminezMobileApp', () => App)
