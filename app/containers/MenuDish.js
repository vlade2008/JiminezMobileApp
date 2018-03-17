import React, { Component } from 'react'
import { StyleSheet, View, Image, FlatList, Text } from 'react-native'
import { connect } from 'react-redux'
import Realm from '../datastore'

import { NavigationActions, createAction } from '../utils'
import { computeSize } from '../utils/DeviceRatio'
import {
  Icon,
  List,
  Flex,
  WhiteSpace,
  Badge,
  Button,
  Modal,
  Toast,
} from 'antd-mobile'
import _ from 'lodash'

const Item = List.Item
const Brief = Item.Brief
const prompt = Modal.prompt
const alert = Modal.alert

@connect(({ menudish }) => ({ menudish }))
class MenuDish extends Component {
  static navigationOptions = {
    title: 'List Menu',
    tabBarLabel: 'List Menu',
    tabBarIcon: ({ focused, tintColor }) => <Icon type="\ue662" size={55} />,
  }

  gotoNew = () => {
    this.props.dispatch(createAction('menudish/updateActiveRecord')('clear'))
    this.props.dispatch(NavigationActions.navigate({ routeName: 'newform' }))
  }

  componentDidMount() {
    this.getMenuList()
  }

  getMenuList = () => {
    this.props.dispatch(createAction('menudish/getMenu')())
  }

  onEdit = id => {
    const idx = _.findIndex(this.props.menudish.records, { id })
    this.props.dispatch(
      createAction('menudish/funcUpdateActiveRecord')(
        this.props.menudish.records[idx]
      )
    )
    this.props.dispatch(NavigationActions.navigate({ routeName: 'newform' }))
  }

  onSecurePass = (password, id) => {
    if (_.includes(password, 'newpassword')) {
      if (id) {
        this.onEdit(id)
      } else {
        this.gotoNew()
      }
    } else {
      Toast.fail('Login failed !!!', 1)
    }
  }

  passModal = id => () => {
      prompt(
        'Password',
        'Password Message',
        [
          { text: 'Cancel' },
          {
            text: 'Submit',
            onPress: password => {
              this.onSecurePass(password, id)
            },
          },
        ],
        'secure-text'
      )
    }

  onDelete = id => () => {
      alert('Delete', 'Are you sure???', [
        { text: 'Cancel', onPress: () => console.log('cancel') },
        { text: 'Ok', onPress: this.onSuccessDelete(id) },
      ])
    }

  onSuccessDelete = id => () => {
      const idx = _.findIndex(this.props.menudish.records, { id })

      const activeRecord = this.props.menudish.records[idx]

      try {
        Realm.write(() => {
          const menu = Realm.create(
            'menu',
            {
              id: activeRecord.id,
              name: activeRecord.name,
              price: activeRecord.price,
              description: activeRecord.description,
            },
            true
          )

          Realm.delete(menu)
        })
      } catch (e) {
        console.log(e, 'error haha na boang napd')
      }

      Toast.success('Delete success !!!', 1)
      this.getMenuList()
    }

  renderItem = rowdata => (
      <Item
        multipleLine
        extra={
          <View>
            <Button onClick={this.passModal(rowdata.id)} type="primary">
              Update
            </Button>
            <Button onClick={this.onDelete(rowdata.id)} type="warning">
              Delete
            </Button>
          </View>
        }
      >
        <Flex>
          <Flex.Item>
            <View>
              <Text>ID: {rowdata.id}</Text>
              <Text style={{ fontSize: computeSize(50) }}>{rowdata.name}</Text>
              <Text style={{ fontSize: computeSize(25) }}>
                {`₱${  rowdata.price}`}
              </Text>

              <Brief>{rowdata.description}</Brief>
            </View>
          </Flex.Item>
        </Flex>
      </Item>
    )

  _keyExtractor = (item, index) => index.toString()

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.menudish.records}
          renderItem={({ item }) => this.renderItem(item)}
          keyExtractor={this._keyExtractor}
        />

        <Button onClick={this.passModal()} type="primary">
          {' '}
          New Product{' '}
        </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default MenuDish
