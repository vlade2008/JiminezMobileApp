import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  FlatList,
  NetInfo,
  RefreshControl,
  Text,
} from 'react-native'
import { connect } from 'react-redux'
import Realm from '../datastore'
import _ from 'lodash'
import {
  List,
  SearchBar,
  Flex,
  WhiteSpace,
  Icon,
  WingBlank,
  InputItem,
  Button,
  DatePicker,
  Modal,
  Toast,
  TextareaItem,
} from 'antd-mobile'

const { Item } = List
const Brief = Item.Brief

import { createForm } from 'rc-form'
import { NavigationActions, createAction } from '../utils'

@connect(({ menudish }) => ({ menudish }))
class NewForm extends Component {
  constructor(props) {
    super(props)
  }

  onBack = () => {
    this.props.navigation.goBack()
    this.props.dispatch(createAction('menudish/getMenu')())
  }

  onSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const initialId = this.props.menudish.records.length + 2

        if (this.props.menudish.activeRecord.id) {
          try {
            Realm.write(() => {
              Realm.create(
                'menu',
                {
                  id: this.props.menudish.activeRecord.id,
                  name: values.name,
                  price: values.price,
                  description: values.description,
                },
                true
              )
            })
          } catch (e) {
            console.log(e, 'error update')
          }
        } else {
          try {
            Realm.write(() => {
              Realm.create('menu', {
                id: initialId,
                name: values.name,
                price: values.price,
                description: values.description,
              })
            })
          } catch (e) {
            console.log(e, 'naa error ni b')
          }
        }

        Modal.alert('Success', <Text>Saved</Text>, [
          { text: 'OK', onPress: this.onBack, style: 'default' },
        ])
      } else {
        Modal.alert('Warning', 'Please fill up required form', [
          { text: 'OK', onPress: () => console.log('ok'), style: 'default' },
        ])
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <WhiteSpace size="lg" />
        <WingBlank>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Name Product</Text>
        </WingBlank>
        {getFieldDecorator('name', {
          initialValue: this.props.menudish.activeRecord.name,
          rules: [
            {
              required: true,
              message: 'Name!',
            },
          ],
        })(
          <InputItem
            type="string"
            autoCorrect={false}
            placeholder="Name Product"
          />
        )}

        <WhiteSpace size="lg" />
        <WingBlank>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Price</Text>
        </WingBlank>
        {getFieldDecorator('price', {
          initialValue: this.props.menudish.activeRecord.price,
          rules: [
            {
              required: true,
              message: 'Price!',
            },
          ],
        })(
          <InputItem
            type="string"
            autoCorrect={false}
            placeholder="Price"
          />
        )}

        <WhiteSpace size="lg" />
        <WingBlank>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Description</Text>
        </WingBlank>
        {getFieldDecorator('description', {
          initialValue: this.props.menudish.activeRecord.description,
          rules: [
            {
              required: true,
              message: 'Description!',
            },
          ],
        })(
          <TextareaItem
            autoHeight
            autoHeight
            row={10}
            placeholder="Description"
          />
        )}
        <WhiteSpace size="lg" />

        <Button
          type="primary"
          style={{
            bottom: 0,
            height: 47,
            justifyContent: 'center',
          }}
          onClick={this.onSubmit}
        >
          Save
        </Button>
      </View>
    )
  }
}

export default createForm()(NewForm)
