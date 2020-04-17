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

class SubToDoEditModal extends React.Component {
  constructor() {
    super();

    this.state = {
      bgOpacity: new Animated.Value(0),
      pageHeight: new Animated.Value(0),
      subTodoValue: {
        todo_text: '',
        goal_date: new Date(),
        slug: 0,
      },
      tempGoalDate: new Date(),
      tempTodoText: '',
      tempSlug: 0,

      todoValue: {},
      selectedDay: null,
      isCalendars: false,
      nameChangeMode: false,
    };
  }

  componentDidMount() {
    console.log(this.props.data, 'data');
  }

  _menu = null;

  fixDate = () => {
    let copiedArray = this.state.subTodoValue;

    if (this.state.tempGoalDate === null) {
      copiedArray = {
        ...copiedArray,
        subtodo_text: this.state.tempSubTodoText,
        goal_date: this.state.tempGoalDate,
        slug: this.state.tempSlug,
      };
    } else {
      copiedArray = {
        ...copiedArray,
        subtodo_text: this.state.tempSubTodoText,
        slug: this.state.tempSlug,
        goal_date:
          this.state.tempGoalDate.getFullYear() +
          '-' +
          (this.state.tempGoalDate.getMonth() + 1) +
          '-' +
          this.state.tempGoalDate.getDate() +
          'T00:00:00Z',
      };
    }

    this.setState(
      {
        subTodoValue: copiedArray,
      },
      () => {
        this.props._editSubTodoDetail(
          this.state.subTodoValue,
          this.state.subTodoValue.slug,
        );
      },
    );
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
        convertedDateString[1],
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
    if (this.props.data.goal_date === null) {
      this.setState({
        tempSubTodoText: this.props.data.subtodo_text,
        tempGoalDate: null,
        tempSlug: this.props.data.slug,
      });
    } else {
      this.setState({
        tempSubTodoText: this.props.data.subtodo_text,
        tempGoalDate: new Date(this.props.data.goal_date),
        tempSlug: this.props.data.slug,
      });
    }
    this.setState({
      subTodoValue: this.props.data,
    });

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
  _setNameChangeMode = (visible) => {
    this.setState({
      nameChangeMode: visible,
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
    Animated.timing(this.state.bgOpacity, {
      toValue: 0,
      duration: 500,
    });
    Animated.timing(this.state.pageHeight, {
      toValue: 0,
      duration: 500,
    }).start(() => {
      if (this.state.isCalendars) {
        this.setState({
          isCalendars: false,
        });
      }
      if (this.state.nameChangeMode) {
        this.setState({
          nameChangeMode: false,
        });
      }
      this.props.setModalProp(false, {
        subtodo_text: '',
        todo: {
          todo_text: '',
        },
        goal_date: null,
      });
    });
  };

  handleTextChange = (text) => {
    let copiedArray = this.state.todoValue;
    copiedArray = {
      ...copiedArray,
      subtodo_text: text,
    };
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
      _editSubTodoDetail,
      data,
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
                      }}
                      onPress={() => {
                        this.handleChangeByButton(item);
                      }}>
                      <View
                        style={{
                          height: 20,
                          width: 20,
                          backgroundColor: 'blue',
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
                height: 300,
                paddingRight: 32,
                paddingLeft: 32,
                backgroundColor: 'white',
              }}>
              {this.state.nameChangeMode && (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text>작업 이름 변경</Text>
                  <View style={{flex: 1}}></View>
                  <TouchableOpacity
                    style={{alignItems: 'center', justifyContent: 'center'}}
                    onPress={() => {
                      _editSubTodoDetail(
                        this.state.subTodoValue,
                        this.state.subTodoValue.slug,
                      );
                      this._setNameChangeMode(false);
                    }}>
                    <Icon name={'send'} size={20}></Icon>
                  </TouchableOpacity>
                </View>
              )}
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 10 / 2,
                    backgroundColor: '#fde2e2',
                  }}></View>
                <Text style={{marginLeft: 10}}>{data.todo.todo_text}</Text>
              </View>
              <View>
                {this.state.nameChangeMode ? (
                  <TextInput
                    value={this.state.subTodoValue.subtodo_text}
                    onChangeText={(text) => {
                      this.handleTextChange(text);
                    }}></TextInput>
                ) : (
                  <>
                    <TouchableOpacity
                      onPress={() => {
                        this._setNameChangeMode(true);
                      }}>
                      <Text>{data.subtodo_text}</Text>
                    </TouchableOpacity>
                    {this.state.tempGoalDate === null ? (
                      <TouchableOpacity
                        onPress={() => {
                          this._openCalendarsAnimate();
                        }}>
                        <Text>날짜 없음</Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          this._openCalendarsAnimate();
                        }}>
                        <Text>
                          {this.state.tempGoalDate.getFullYear() +
                            '년 ' +
                            (this.state.tempGoalDate.getMonth() + 1) +
                            '월 ' +
                            this.state.tempGoalDate.getDate() +
                            '일 ' +
                            this.state.tempGoalDate.getHours() +
                            ':'}
                          {this.state.tempGoalDate.getMinutes() < 9
                            ? '0' + this.state.tempGoalDate.getMinutes()
                            : this.state.tempGoalDate.getMinutes()}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </>
                )}
              </View>
            </View>
          )}
        </Animated.View>
      </Modal>
    );
  }
}

export default SubToDoEditModal;
