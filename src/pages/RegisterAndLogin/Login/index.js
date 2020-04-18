import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Dimensions,
} from 'react-native';
import axios from 'axios';

import {URL_POST_LOGIN_ID} from '../../../globals/api';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };
  }

  _login = async () => {
    try {
      const config = {
        headers: {},
      };
      const formData = new FormData();
      formData.append('email', this.state.email);
      formData.append('password', this.state.password);
      const res = await axios.post(URL_POST_LOGIN_ID, formData, config);
      if (res.status === 200) {
        this.props.navigation.navigate('Drawer');
      }
    } catch (error) {
      if (error.response.status === 400) {
        alert('아이디가 존재하지 않습니다.');
      }
      if (error.response.status === 401) {
        alert('비밀번호가 일치하지 않습니다.');
      }
    }
  };

  handleEmail = (text) => {
    this.setState({
      email: text,
    });
  };

  handlePassword = (text) => {
    this.setState({
      password: text,
    });
  };

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', backgroundColor: '#ffb6b6'}}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            color: 'white',
            marginTop: Dimensions.get('window').height / 3,
          }}>
          TodoList에 오신 것을 환영합니다!
        </Text>
        <Text style={{color: 'white', marginTop: 30}}>
          언제어디서든 할 일을 저장하고 관리하세요!
        </Text>
        <Text style={{color: 'white'}}>생산성을 증대시키세요!</Text>
        <TextInput
          placeholder={'Email을 입력하세요.'}
          value={this.state.email}
          onChangeText={(text) => {
            this.handleEmail(text);
          }}
        />
        <TextInput
          placeholder={'Password를 입력하세요.'}
          value={this.state.password}
          onChangeText={(text) => {
            this.handlePassword(text);
          }}
          secureTextEntry={true}
        />
        <View
          style={{
            flexDirection: 'row',
            marginTop: 30,
          }}>
          <TouchableOpacity
            onPress={() => {
              this._login();
            }}>
            <Text style={{color: '#30A9DE'}}>로그인!</Text>
          </TouchableOpacity>
          <View style={{width: 30}}></View>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Register');
            }}>
            <Text style={{color: '#30A9DE'}}>회원가입하러 가기!</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Login;
