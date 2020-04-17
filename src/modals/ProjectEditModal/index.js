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

class ProjectEditModal extends React.Component {
  constructor() {
    super();
    this.state = {
      bgOpacity: new Animated.Value(0),
      pageHeight: new Animated.Value(0),
      projectValue: {
        project_text: '',
        slug: 0,
      },
      nameChangeMode: false,
    };
  }

  _firstLoad = () => {
    this.setState({
      projectValue: this.props.data,
    });

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
      if (this.state.nameChangeMode) {
        this.setState({
          nameChangeMode: false,
        });
      }
      this.props.setModalProp(false, {
        project_text: '',
      });
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

  _setNameChangeMode = (visible) => {
    this.setState({
      nameChangeMode: visible,
    });
  };

  render() {
    const {
      animationType,
      transparent,
      visible,
      setModalProp,
      data,
      _makeNewProject,
      _editProjectDetail,
      _deleteProjectDetail,
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
              {this.state.nameChangeMode ? (
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <Text>프로젝트 이름 변경</Text>
                    <View style={{flex: 1}}></View>
                    <TouchableOpacity
                      style={{
                        marginRight: 15,
                      }}
                      onPress={() => {
                        _deleteProjectDetail(this.state.projectValue.slug);

                        this._dismissAnimate();
                      }}>
                      <Text>삭제</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{alignItems: 'center', justifyContent: 'center'}}
                      onPress={() => {
                        _editProjectDetail(
                          this.state.projectValue,
                          this.state.projectValue.slug,
                        );
                        this._setNameChangeMode(false);
                      }}>
                      <Icon name={'send'} size={20}></Icon>
                    </TouchableOpacity>
                  </View>

                  <TextInput
                    placeholder={'프로젝트를 입력하세요'}
                    onChangeText={(text) => {
                      this.handleTextChange(text);
                    }}
                    value={this.state.projectValue.project_text}></TextInput>
                </View>
              ) : (
                <View>
                  <View style={{flexDirection: 'row'}}>
                    <Text>프로젝트 이름</Text>
                    <View style={{flex: 1}}></View>

                    <TouchableOpacity
                      onPress={() => {
                        _deleteProjectDetail(this.state.projectValue.slug);
                        this._dismissAnimate();
                      }}>
                      <Text>삭제</Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    onPress={() => {
                      this._setNameChangeMode(true);
                    }}
                    style={{
                      marginTop: 13,
                    }}>
                    <Text
                      style={{
                        textDecorationLine: 'underline',
                        textDecorationStyle: 'solid',
                      }}>
                      {this.state.projectValue.project_text}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </Animated.View>
      </Modal>
    );
  }
}

export default ProjectEditModal;
