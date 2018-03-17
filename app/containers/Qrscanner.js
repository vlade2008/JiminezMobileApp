import React, { Component } from 'react'
import { Alert, Platform, Text, View } from 'react-native'
import { Flex, WhiteSpace, WingBlank } from 'antd-mobile'
import { NavigationActions, createAction } from '../utils'
import Camera from 'react-native-camera'

import { connect } from 'react-redux'
import _ from 'lodash'

import { computeSize } from '../utils/DeviceRatio'

@connect(({ menudish }) => ({ menudish }))
export default class Qrscanner extends Component {
  static navigationOptions = {
    title: 'Scanner',
  }

  constructor(props) {
    super(props)

    this.state = {
      camera: {
        onBarCodeRead: this.onBarCodeRead,
      },
    }
  }

  onBarCodeRead = data => {
    console.log(data, 'unsa ane niy g')
    const findIndexMenu = _.findIndex(
      this.props.menudish.records,
      item => item.id.toString() === data.data
    )

    this.setState({ camera: { onBarCodeRead: null } }, () => {
      if (findIndexMenu === -1) {
        Alert.alert('Note', 'No Menu Found', [
          {
            text: 'OK',
            onPress: () => {},
          },
        ])
      } else {
        const newAction = NavigationActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({ routeName: 'HomeNavigator' }),
            NavigationActions.navigate({ routeName: 'itemmenu' }),
          ],
        })

        this.props.dispatch(
          createAction('menudish/funcUpdateActiveRecord')(
            this.props.menudish.records[findIndexMenu]
          )
        )
        this.props.navigation.dispatch(newAction)
      }
    })
  }

  goBack = () => {
    this.props.navigation.goBack()
  }

  render() {
    console.log(this.props.menudish, 'kita ka ane niya doh')
    const barcodeTypes = Platform.select({
      ios: ['org.iso.QRCode'], // see https://github.com/lwansbrough/react-native-camera/issues/600 and http://stackoverflow.com/questions/22187919/constants-for-avcapturemetadataoutputs-metadataobjecttypes-property
      android: ['qr'],
    })

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1, backgroundColor: 'black' }}>
            <Camera
              ref={cam => {
                this.camera = cam
              }}
              onBarCodeRead={this.state.camera.onBarCodeRead}
              barCodeTypes={barcodeTypes}
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
              aspect={Camera.constants.Aspect.fill}
            >
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  h1
                  style={{ color: 'white', marginBottom: computeSize(20) }}
                >
                  Scan QR Code
                </Text>
                <View
                  style={{
                    width: computeSize(650),
                    height: computeSize(650),
                    borderWidth: 1,
                    borderColor: 'white',
                  }}
                />
              </View>
            </Camera>
          </View>
        </View>
      </View>
    )
  }
}
