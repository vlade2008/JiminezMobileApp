import React, { Component } from 'react'
import { StyleSheet, View, Text, Clipboard } from 'react-native'
import { connect } from 'react-redux'
import { Button, Icon, Flex } from 'antd-mobile'

import { NavigationActions, createAction } from '../utils'
import { computeSize } from '../utils/DeviceRatio'

@connect(({ app,patient }) => ({ ...app,patient }))
class Home extends Component {
  static navigationOptions = {
    title: 'Home',
    tabBarLabel: 'Home',
    tabBarIcon: () => <Icon type="\ue65e" size={55} />,
  }

  componentDidMount(){
    this.props.dispatch(createAction('patient/getPatient')())
  }


  notpaid = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'NotPaidNavigator' }))
  }

  paid = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'PaidNavigator' }))
  }

  admitted = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'PatientAdmittedNavigator' }))
  }

  backup = async () =>{
    let data = JSON.stringify(this.props.patient.records);
    await Clipboard.setString(data);
    alert('Copied to Data!');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: computeSize(50), textAlign: 'center', marginBottom: computeSize(50) }}>
          Select Patient List
        </Text>
        <Flex>
        <Flex.Item style={{padding: computeSize(20)}}>
          <Button
            type="warning"
            onClick={this.admitted}
            style={{
              justifyContent: 'center',
              height: computeSize(250),
            }}
          >
           Patient Admitted
          </Button>
        </Flex.Item>
          <Flex.Item style={{padding: computeSize(20)}}>
            <Button
              type="warning"
              onClick={this.notpaid}
              style={{
                justifyContent: 'center',
                height: computeSize(250),
              }}
            >
             Patient Not Paid
            </Button>
          </Flex.Item>
          <Flex.Item style={{padding: computeSize(20)}}>
            <Button
              type="primary"
              onClick={this.paid}
              style={{
                justifyContent: 'center',
                height: computeSize(250),
              }}
            >
              Patient Paid
            </Button>
          </Flex.Item>
        </Flex>
        <Flex>
          <Flex.Item style={{padding: computeSize(20)}}>
            <Button
              onClick={this.backup}
              style={{
                justifyContent: 'center',
                height: computeSize(250),
              }}
            >
             Backup
            </Button>
          </Flex.Item>
        </Flex>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: computeSize(100)
  },
})

export default Home
