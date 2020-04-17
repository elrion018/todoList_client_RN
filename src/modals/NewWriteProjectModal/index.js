import React from 'react';
import {
  View,
  Modal,
  Text,
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class NewWriteProjectModal extends React.Component {
  constructor() {
    super();
    this.state = {
      bgOpacity: new Animated.Value(0),
      pageHeight: new Animated.Value(0),
      projectValue: {
        project_text: '',
      },
    };
  }

  _firstLoad = () => {
    Animated.timing(this.state.bgOpacity, {
      toValue: 1,
      duration: 500,
    });
    Animated.timing(this.state.pageHeight, {
      toValue: 150,
      duration: 500,
    }).start();
  };

  _dismissAnimate = () => {
    Animated.timing(this.state.bgOpacity, {
      toValue: 0,
      duration: 500,
    });
    Animated.timing(this.state.pageHeight, {
      toValue: 0,
      duration: 500,
    }).start(() => {
      this.props.setModalProp(false);
    });
  };

  handleTextChange = (text) => {
    let copiedArray = this.state.projectValue;
    copiedArray = {
      ...copiedArray,
      project_text: text,
    };
    this.setState({
      projectValue: copiedArray,
    });
  };

  render() {
    const {
      animationType,
      transparent,
      visible,
      setModalProp,
      _makeNewProject,
    } = this.props;
    return (
      <Modal
        animationType={animationType}
        transparent={transparent}
        visible={visible}
        onShow={() => {
          this._firstLoad();
        }}
        onRequestClose={() => {
          this._dismissAnimate();
        }}>
        <TouchableWithoutFeedback
          onPress={() => {
            this._dismissAnimate();
          }}>
          <Animated.View
            style={{
              height: '100%',
              width: '100%',
              position: 'absolute',
              backgroundColor: 'rgba(100,100,100,0.25)',
              opacity: this.state.bgOpacity,
            }}></Animated.View>
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: this.state.pageHeight,
          }}>
          <View
            style={{
              paddingTop: 20,
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              width: '100%',
              height: 150,
              paddingRight: 32,
              paddingLeft: 32,
              backgroundColor: 'white',
            }}>
            <View>
              <Text>이름</Text>
              <View>
                <TextInput
                  placeholder={'프로젝트를 입력하세요'}
                  onChangeText={(text) => {
                    this.handleTextChange(text);
                  }}></TextInput>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 10,
              bottom: 10,
              width: 50,
              height: 50,
              borderRadius: 30,
              backgroundColor: '#aacfcf',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              _makeNewProject(this.state.projectValue);
              setModalProp(false);
              this.setState({
                projectValue: {
                  project_text: '',
                },
              });
            }}>
            <Icon name={'send'} size={30}></Icon>
          </TouchableOpacity>
        </Animated.View>
      </Modal>
    );
  }
}

export default NewWriteProjectModal;
