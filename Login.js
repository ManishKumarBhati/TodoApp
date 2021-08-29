/* eslint-disable no-alert */
import React, {Component} from 'react';
import CustomeStyle from './component/CustomeStyle';
import {
  View,
  Button,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {LOGIN_SCHEMA_TABLE, REALM_PATH, SCHEMA_LIST} from './Schema';
import Realm from 'realm';
class Login extends Component {
  constructor() {
    super();
    this.state = {
      userId: '',
      password: '',
    };
  }
  async test() {
    if (this.state.userId === '') {
      ToastAndroid.show('please enter User Id', ToastAndroid.SHORT);
    } else if (this.state.password === '') {
      ToastAndroid.show('please enter Password', ToastAndroid.SHORT);
    } else {
      this.saveData();
    }
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    try {
      const realm = await Realm.open(databaseOptions);
      const data = realm.objects(LOGIN_SCHEMA_TABLE);
      if (data.length > 0) {
        this.props.navigation.navigate('MyTabPager');
      }
    } catch (e) {
      console.error(e);
      alert(e);
    }
  }

  async saveData() {
    try {
      const realm = await Realm.open(databaseOptions);
      realm.write(() => {
        realm.create(LOGIN_SCHEMA_TABLE, {
          uId: this.state.userId,
          pass: this.state.password,
        });
      });
      this.setState({userId: '', password: ''});
      ToastAndroid.show('logged in successfully', ToastAndroid.SHORT);
      this.props.navigation.navigate('MyTabPager');
    } catch (e) {
      console.error(e);
      alert(e);
    }
  }

  render() {
    return (
      <View style={CustomeStyle.loginView}>
        <TextInput
          placeholder="Enter User Id"
          style={CustomeStyle.inputText}
          value={this.state.userId}
          onChangeText={e => {
            this.setState({userId: e});
          }}
        />
        <TextInput
          style={CustomeStyle.inputText}
          value={this.state.password}
          placeholder="Enter Password"
          secureTextEntry={true}
          onChangeText={e => {
            this.setState({password: e});
          }}
        />
        <TouchableOpacity style={CustomeStyle.button}>
          <Button
            title="Submit"
            onPress={() => {
              this.test();
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const databaseOptions = {
  path: REALM_PATH,
  schema: SCHEMA_LIST,
  schemaVersion: 0,
};

export default Login;
