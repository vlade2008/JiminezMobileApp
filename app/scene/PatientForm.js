import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  FlatList,
  NetInfo,
  RefreshControl,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  AsyncStorage,
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const { Item } = List
const Brief = Item.Brief
import { computeSize } from '../utils/DeviceRatio'
import { createForm } from 'rc-form'
import { NavigationActions, createAction } from '../utils'

@connect(({ patient }) => ({ patient }))
class PatientForm extends Component {
  constructor(props) {
    super(props)

    state = {
      currentID:'',
    }
  }

  static navigationOptions = {
    title: 'Patient Form',
    tabBarLabel: 'Patient Form',
    tabBarIcon: () => <Icon type="\ue65e" size={55} />,
  }

  async componentDidMount(){

    let value = await AsyncStorage.getItem('currentid');
    if (value !== null) {
      this.setState({
        currentID: value
      })
    }

  }


  onBack = () => {
    this.props.navigation.goBack()
    this.props.dispatch(createAction('patient/getPatient')())
  }

  onSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const initialId = parseInt(this.state.currentID) + 1;


        if (this.props.patient.activeRecord.id) {
          try {
            Realm.write(() => {
              Realm.create(
                'patient',
                {
                  id: this.props.patient.activeRecord.id,
                  ...values,
                },
                true
              )
            })
          } catch (e) {
            Toast.success(e, 1)
            console.log(e, 'error update')
          }
        } else {
          try {
            Realm.write(() => {
              Realm.create('patient', {
                id: initialId,
                name: values.name || '',
                date_admitted: values.date_admitted || '',
                date_discharge: values.date_discharge || '',
                pf: values.pf || '',
                pf_philhealth: values.pf_philhealth || '',
                hospital: values.hospital || '',
                status: false,
                status_philhealth: false,
              })
            })
          } catch (e) {
            console.log(e, 'naa error ni b')
          }
        }

        try {
            AsyncStorage.setItem('currentid', initialId.toString());
        } catch (error) {
          console.log(error.message);
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
    let me = this;

    return (
      <KeyboardAvoidingView  style={{flex: 1}}>
        <ScrollView keyboardShouldPersistTaps={'handled'} style={{flex:1}}>
          <WhiteSpace size="lg" />
          <WingBlank>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Name Patient</Text>
          </WingBlank>
          {getFieldDecorator('name', {
            initialValue: this.props.patient.activeRecord.name,
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
              ref={c => {
                  me.name = c
                }}
              onSubmitEditing={() => this.pf.inputRef.inputRef.focus()}
              blurOnSubmit={false}
              returnKeyType={'next'}
            />
          )}

          <WhiteSpace size="lg" />
          <WingBlank>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>PF</Text>
          </WingBlank>
          {getFieldDecorator('pf', {
            initialValue: this.props.patient.activeRecord.pf,
            rules: [
              {
                required: false,
                message: 'PF!',
              },
            ],
          })(
            <InputItem
              type="string"
              autoCorrect={false}
              ref={c => {
                  me.pf = c
                }}
              onSubmitEditing={() => this.pf_philhealth.inputRef.inputRef.focus()}
              blurOnSubmit={false}
              returnKeyType={'next'}
            />
          )}

          <WhiteSpace size="lg" />
          <WingBlank>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>PF PhilHealth</Text>
          </WingBlank>
          {getFieldDecorator('pf_philhealth', {
            initialValue: this.props.patient.activeRecord.pf_philhealth,
            rules: [
              {
                required: false,
                message: 'PF PhilHealth!',
              },
            ],
          })(
            <InputItem
              type="string"
              autoCorrect={false}
              ref={c => {
                  me.pf_philhealth = c
                }}
              onSubmitEditing={() => this.hospital.inputRef.inputRef.focus()}
              blurOnSubmit={false}
              returnKeyType={'next'}
            />
          )}

          <WhiteSpace size="lg" />
          <WingBlank>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Hospital</Text>
          </WingBlank>
          {getFieldDecorator('hospital', {
            initialValue: this.props.patient.activeRecord.hospital,
            rules: [
              {
                required: true,
                message: 'Hospital!',
              },
            ],
          })(
            <InputItem
              type="string"
              autoCorrect={false}ref={c => {
                  this.hospital = c
                }}
              onSubmitEditing={() => this.date_discharge.inputRef.inputRef.focus()}
              blurOnSubmit={false}
              returnKeyType={'next'}
            />
          )}

          <WhiteSpace size="lg" />
          <WingBlank>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Date Discharge</Text>
          </WingBlank>
          {getFieldDecorator('date_discharge', {
            initialValue: this.props.patient.activeRecord.date_discharge,
            rules: [
              {
                required: false,
                message: 'Date Discharge!',
              },
            ],
          })(
            <InputItem
              type="string"
              autoCorrect={false}
              ref={c => {
                  this.date_discharge = c
                }}
              onSubmitEditing={() => this.date_admitted.inputRef.inputRef.focus()}
              blurOnSubmit={false}
              returnKeyType={'next'}
              placeholder='YYYY-MM-DD'
            />
          )}

          <WhiteSpace size="lg" />
          <WingBlank>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Date Admitted</Text>
          </WingBlank>
          {getFieldDecorator('date_admitted', {
            initialValue: this.props.patient.activeRecord.date_admitted,
            rules: [
              {
                required: false,
                message: 'Date Admitted!',
              },
            ],
          })(
            <InputItem
              type="string"
              autoCorrect={false}
              ref={c => {
                  this.date_admitted = c
                }}
              onSubmitEditing={this.onSubmit}
              blurOnSubmit={false}
              placeholder='YYYY-MM-DD'
            />
          )}


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
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

export default createForm()(PatientForm)
