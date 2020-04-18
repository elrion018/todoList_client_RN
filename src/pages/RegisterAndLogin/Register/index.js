import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  TextInput,
} from 'react-native';

import {URL_POST_REGISTER_ID} from '../../../globals/api';
import axios from 'axios';

class Register extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };
  }

  _register = async () => {
    try {
      const config = {
        headers: {},
      };
      const formData = new FormData();
      formData.append('email', this.state.email);
      formData.append('password', this.state.password);
      const res = await axios.post(URL_POST_REGISTER_ID, formData, config);
      if (res.status === 201) {
        alert('이미 회원가입하셨습니다.');
      }

      if (res.status === 200) {
        alert('회원가입 완료!');
        this.props.navigation.goBack();
      }
    } catch (error) {
      console.dir(error);
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
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: '#ffb6b6',
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            color: 'white',
            marginTop: Dimensions.get('window').height / 3,
          }}>
          정말 간단한 정보만 입력해주시면 됩니다!
        </Text>
        <Text style={{color: 'white', marginTop: 30}}>
          저희는 심플한 앱을 지향합니다!
        </Text>
        <Text style={{color: 'white'}}>가입 후 다양한 기능을 누려보세요.</Text>
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
        <TouchableOpacity
          onPress={() => {
            this._register();
          }}
          style={{
            marginTop: 30,
          }}>
          <Text style={{color: '#30A9DE'}}>회원가입하기!</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Register;
