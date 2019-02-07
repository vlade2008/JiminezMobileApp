import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'
import { Button, Icon, Flex } from 'antd-mobile'

import { NavigationActions, createAction } from '../utils'
import { computeSize } from '../utils/DeviceRatio'
import PatientList from './PatientList';

@connect(({ app }) => ({ ...app }))
class PatientAdmitted extends Component {
  static navigationOptions = {
    title: 'Patient Admitted ',
    tabBarLabel: 'Patient Admitted Paid',
    tabBarIcon: () => <Icon type="\ue65e" size={55} />,
  }


  render() {
    return (
      <View style={styles.container}>
        <PatientList admitted={true}/>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default PatientAdmitted
