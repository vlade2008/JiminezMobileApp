import React, { Component } from 'react'
import { StyleSheet, View, Text, Clipboard, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { Button, Icon, Flex, TextareaItem, Toast } from 'antd-mobile'
import Realm from '../datastore'
import { NavigationActions, createAction } from '../utils'
import { computeSize } from '../utils/DeviceRatio'

@connect(({ app,patient }) => ({ ...app,patient }))
class RestorePage extends Component {
  constructor(props){
    super(props)

    this.state = {
      textData: ''
    }

  }
  static navigationOptions = {
    title: 'Restore',
    tabBarLabel: 'Restore',
    tabBarIcon: () => <Icon type="\ue65e" size={55} />,
  }




  updateField = (e) =>{
    this.setState({
      textData: e,
    })
  }

  restore = () => {
    let data = JSON.parse(this.state.textData)

    data.map((item)=>{
      try {
        Realm.write(() => {
          Realm.create(
            'patient',
            {
              ...item
            },
            true
          )
        })

        Toast.success('success', 1)

      } catch (e) {
        Toast.success(e, 1)
        console.log(e, 'error update')
      }



    })


  }

  render() {

    return (
      <View style={styles.container}>
        <Text style={{ fontSize: computeSize(50), textAlign: 'center', marginBottom: computeSize(50) }}>
          Restore
        </Text>
        <Flex>
          <Flex.Item style={{padding: computeSize(20)}}>
            <TextareaItem
              value={this.state.textData || ''}
              onChange={(e)=>this.updateField(e)}
              rows={3}
            />
            <Button
              type="primary"
              onClick={this.restore}
              style={{
                justifyContent: 'center',
                height: computeSize(200),
                marginTop: computeSize(30),
              }}
            >
             Restore
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

export default RestorePage
