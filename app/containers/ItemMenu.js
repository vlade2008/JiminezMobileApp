import React, { Component } from 'react'
import { StyleSheet, View, Image, FlatList, Text } from 'react-native'
import { connect } from 'react-redux'

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

@connect(({ menudish }) => ({ menudish }))
class ItemMenu extends Component {
  static navigationOptions = {
    title: 'Item Details',
  }

  render() {
    return (
      <View style={styles.container}>
        <List>
          <Item multipleLine>
            <Flex>
              <Flex.Item>
                <View>
                  <Text>Product Name</Text>
                  <Text style={{ fontSize: computeSize(150) }}>
                    {this.props.menudish.activeRecord.name}
                  </Text>
                  <WhiteSpace size="lg" />
                  <Text>Price</Text>
                  <Text
                    style={{ fontSize: computeSize(100), color: '#f5222d' }}
                  >
                    ₱{this.props.menudish.activeRecord.price}
                  </Text>
                  <WhiteSpace size="lg" />
                  <Text>Description</Text>
                  <Text style={{ fontSize: computeSize(50), color: '#f5222d' }}>
                    {this.props.menudish.activeRecord.description}
                  </Text>
                </View>
              </Flex.Item>
            </Flex>
          </Item>
        </List>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default ItemMenu
