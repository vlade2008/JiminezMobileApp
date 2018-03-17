import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import { Button, Icon, Flex } from 'antd-mobile'

import { NavigationActions, createAction } from '../utils'
import { computeSize } from '../utils/DeviceRatio'

@connect(({ app }) => ({ ...app }))
class Home extends Component {
  static navigationOptions = {
    title: 'Home',
    tabBarLabel: 'Home',
    tabBarIcon: () => <Icon type="\ue65e" size={55} />,
  }

  componentDidMount() {
    this.props.dispatch(createAction('menudish/getMenu')())
  }

  qrscanner = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'qrscanner' }))
  }

  gotoMenu = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'List' }))
  }

  render() {
    return (
      <View style={styles.container}>
        <Flex>
          <Flex.Item>
            <Button
              type="primary"
              onClick={this.qrscanner}
              style={{
                justifyContent: 'center',
                height: computeSize(250),
              }}
            >
              Scan Qr{' '}
            </Button>
          </Flex.Item>
          <Flex.Item>
            <Button
              type="warning"
              onClick={this.gotoMenu}
              style={{
                justifyContent: 'center',
                height: computeSize(250),
              }}
            >
              List Menu{' '}
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
    justifyContent: 'center',
  },
})

export default Home
