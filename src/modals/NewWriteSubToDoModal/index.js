import React from 'react';
import {
  View,
  Modal,
  Text,
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  TouchableHighlightBase,
} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import Icon from 'react-native-vector-icons/FontAwesome';

class NewWriteSubToDoModal extends React.Component {
  constructor() {
    super();

    this.state = {
      bgOpacity: new Animated.Value(0),
      pageHeight: new Animated.Value(0),
      subTodoValue: {
        subtodo_text: '',
        goal_date: new Date(),
      },
      todoValue: {},

      tempGoalDate: new Date(),
      selectedDay: null,
      isCalendars: false,
    };
  }

  componentDidMount() {}

  _menu = null;

  fixDate = () => {
    let copiedArray = this.state.subTodoValue;

    copiedArray = {
      ...copiedArray,
      goal_date: this.state.tempGoalDate,
    };

    this.setState({
      subTodoValue: copiedArray,
    });
  };

  handleChangeByButton = (value) => {
    let nowDate = new Date();
    switch (value) {
      case '오늘':
        this.setState({
          tempGoalDate: new Date(),
        });
        break;
      case '내일':
        nowDate.setDate(nowDate.getDate() + 1);
        this.setState({
          tempGoalDate: nowDate,
        });
        break;

      case '다음 주':
        nowDate.setDate(nowDate.getDate() + 7);
        this.setState({
          tempGoalDate: nowDate,
        });
        break;
      case '날짜 없음':
        this.setState({
          tempGoalDate: null,
        });
      default:
    }
  };

  handleDateChange = (value) => {
    const convertedDateString = value.dateString.split('-');

    this.setState({
      tempGoalDate: new Date(
        convertedDateString[0],
        convertedDateString[1] - 1,
        convertedDateString[2],
      ),
    });
  };

  setMenuRef = (ref) => {
    this._menu = ref;
  };

  hideMenu = (item) => {
    this.setState({
      todoValue: item,
    });
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

  _firstLoad = () => {
    // this.setState({
    //   todoValue: this.props.data[0]
    // });
    Animated.timing(this.state.bgOpacity, {
      toValue: 1,
      duration: 500,
    }).start();
    Animated.timing(this.state.pageHeight, {
      toValue: 150,
      duration: 500,
    }).start();
  };

  _setIsCalendars = (visible) => {
    this.setState({
      isCalendars: visible,
    });
  };

  _openCalendarsAnimate = () => {
    Animated.timing(this.state.pageHeight, {
      toValue: 650,
      duration: 500,
    }).start(() => {
      this._setIsCalendars(true);
    });
  };

  _closeCalendarsAnimate = () => {
    Animated.timing(this.state.pageHeight, {
      toValue: 150,
      duration: 500,
    }).start(() => {
      this._setIsCalendars(false);
    });
  };

  _dismissAnimate = () => {
    if (this.state.isCalendars) {
      this._setIsCalendars(false);
    }
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
    let copiedArray = this.state.subTodoValue;
    copiedArray = {
      ...copiedArray,
      subtodo_text: text,
    };
    console.log(copiedArray);
    this.setState({
      subTodoValue: copiedArray,
    });
  };

  render() {
    const day = ['오늘', '내일', '다음 주', '날짜 없음'];
    const {
      animationType,
      transparent,
      visible,
      setModalProp,
      data,
      _makeNewSubTodo,
      _getSubTodoList,
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
          {this.state.isCalendars ? (
            <>
              <View
                style={{
                  paddingTop: 20,
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                  width: '100%',
                  height: 300,
                  paddingRight: 32,
                  paddingLeft: 32,
                  backgroundColor: 'white',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Icon name="pen" size={20}></Icon>
                  {this.state.tempGoalDate === null && (
                    <TouchableOpacity style={{marginLeft: 10}}>
                      <Text>날짜 없음</Text>
                    </TouchableOpacity>
                  )}
                  {this.state.tempGoalDate !== null && (
                    <TouchableOpacity style={{marginLeft: 10}}>
                      <Text>
                        {this.state.tempGoalDate.getFullYear() +
                          '년 ' +
                          (this.state.tempGoalDate.getMonth() + 1) +
                          '월 ' +
                          this.state.tempGoalDate.getDate() +
                          '일'}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
                {day.map((item) => {
                  return (
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        height: 30,
                        width: '100%',
                        alignItems: 'center',
                      }}
                      onPress={() => {
                        this.handleChangeByButton(item);
                      }}>
                      <View
                        style={{
                          height: 10,
                          width: 10,
                          borderRadius: 10 / 2,
                          backgroundColor: '#fde2e2',
                        }}></View>

                      <Text style={{marginLeft: 10}}>{item}</Text>
                    </TouchableOpacity>
                  );
                })}
                <TouchableOpacity
                  style={{position: 'absolute', right: 20, bottom: 20}}
                  onPress={() => {
                    this.fixDate();
                    this._closeCalendarsAnimate();
                  }}>
                  <Text>일정 변경</Text>
                </TouchableOpacity>
              </View>
              <CalendarList
                style={{
                  height: 350,
                }}
                onDayPress={this.handleDateChange}
                markedDates={{
                  [this.state.selectedDay]: {
                    selected: true,
                    selectedColor: 'blue',
                  },
                }}
                pastScrollRange={50}
                futureScrollRange={50}
                scrollEnabled={true}
                showScrollIndicator={true}></CalendarList>
            </>
          ) : (
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
                <TextInput
                  placeholder={'할 일을 입력하세요'}
                  value={this.state.subTodoValue.subtodo_text}
                  onChangeText={(text) =>
                    this.handleTextChange(text)
                  }></TextInput>
              </View>

              <View style={{flexDirection: 'row'}}>
                {this.state.subTodoValue.goal_date === null && (
                  <TouchableOpacity
                    onPress={() => {
                      if (this.state.isCalendars) {
                        this._closeCalendarsAnimate();
                      } else {
                        this._openCalendarsAnimate();
                      }
                    }}>
                    <Text>날짜 없음</Text>
                  </TouchableOpacity>
                )}
                {this.state.subTodoValue.goal_date !== null && (
                  <TouchableOpacity
                    onPress={() => {
                      if (this.state.isCalendars) {
                        this._closeCalendarsAnimate();
                      } else {
                        this._openCalendarsAnimate();
                      }
                    }}>
                    <Text>
                      {this.state.subTodoValue.goal_date.getFullYear() +
                        '년 ' +
                        (this.state.subTodoValue.goal_date.getMonth() + 1) +
                        '월 ' +
                        this.state.subTodoValue.goal_date.getDate() +
                        '일 '}
                    </Text>
                  </TouchableOpacity>
                )}
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
                  _makeNewSubTodo(this.state.subTodoValue, data.slug);
                  setModalProp(false);
                  this.setState({
                    subTodoValue: {
                      subtodo_text: '',
                      goal_date: new Date(),
                    },
                  });
                }}>
                <Icon name={'send'} size={30}></Icon>
              </TouchableOpacity>
            </View>
          )}
        </Animated.View>
      </Modal>
    );
  }
}

export default NewWriteSubToDoModal;
