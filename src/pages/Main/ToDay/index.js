import React from 'react';
import {View, TouchableOpacity, Text, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {FlatList} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import * as actions from '../../../actions/appStatus';
import {
  URL_POST_TODO_LIST,
  URL_PUT_TODO_DETAIL,
  URL_POST_SUBTODO_LIST,
  URL_PUT_SUBTODO_DETAIL,
  URL_POST_PROJECT_LIST_EMAIL,
  URL_POST_TODO_LIST_EMAIL,
  URL_POST_SUBTODO_LIST_EMAIL,
} from '../../../globals/api';
import {
  NewWriteToDoModal,
  ToDoEditModal,
  SubToDoEditModal,
  NewWriteSubToDoModal,
} from '../../../modals';
import axios from 'axios';
import moment from 'moment';

class ToDay extends React.Component {
  constructor() {
    super();

    this.state = {
      isOpened: false,
      todoSlugForSubTodo: {
        slug: 0,
      },
      todoDataForModal: {
        todo_text: '',
        project: {
          project_text: '',
        },
        goal_date: null,
      },
      subtodoDataForModal: {
        subtodo_text: '',
        todo: {
          todo_text: '',
        },
        goal_date: null,
      },
      projectData: [
        {
          project_text: '',
        },
      ],

      NewWriteToDoModal: false,
      NewWriteSubToDoModal: false,
      ToDoEditModal: false,
      SubToDoEditModal: false,
    };
  }

  toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
  };

  _setTodoSlugForSubTodo = (slug) => {
    this.setState({
      todoSlugForSubTodo: slug,
    });
  };

  _setNewWriteSubToDoModal = (visible) => {
    this.setState({
      NewWriteSubToDoModal: visible,
    });
  };

  _setSubToDoEditModal = (visible, item) => {
    this.setState(
      {
        subtodoDataForModal: item,
      },
      () => {
        this.setState({
          SubToDoEditModal: visible,
        });
      },
    );
  };

  _setToDoEditModal = (visible, item) => {
    this.setState(
      {
        todoDataForModal: item,
      },
      () => {
        this.setState({
          ToDoEditModal: visible,
        });
      },
    );
  };

  _setNewWriteToDoModal = (visible) => {
    this.setState({
      NewWriteToDoModal: visible,
    });
  };

  _getTodoListForToDay = async () => {
    try {
      const config = {
        headers: {
          Authorization: this.props.token,
        },
      };
      const res = await axios.post(URL_POST_TODO_LIST_EMAIL, {}, config);

      if (res.status === 200) {
        const temp =
          res.data.length !== 0
            ? res.data.filter((item) => item.done === false)
            : res.data;
        this.props.todoUpdate(temp);
      }
    } catch (error) {
      console.log(error);
      console.error(error);
    }
  };

  _getProjectList = async () => {
    try {
      const config = {
        headers: {
          Authorization: this.props.token,
        },
      };
      const res = await axios.post(URL_POST_PROJECT_LIST_EMAIL, {}, config);

      if (res.status === 200) {
        this.props.projectUpdate(res.data);
      }
    } catch (error) {
      console.log(error);
      console.error(error);
    }
  };

  _getSubTodoList = async () => {
    try {
      const config = {
        headers: {
          Authorization: this.props.token,
        },
      };
      const res = await axios.post(URL_POST_SUBTODO_LIST_EMAIL, {}, config);
      if (res.status === 200 && res.data.length !== 0) {
        this.props.subtodoUpdate(res.data);
      }
    } catch (error) {
      console.log(error);
      console.error(error);
    }
  };

  _makeNewTodo = async (todoValue, projectValue) => {
    try {
      const config = {
        headers: {},
      };
      const formData = new FormData();
      formData.append('todo_text', todoValue.todo_text);
      formData.append(
        'goal_date',
        todoValue.goal_date.getFullYear() +
          '-' +
          (todoValue.goal_date.getMonth() + 1) +
          '-' +
          todoValue.goal_date.getDate() +
          'T00:00:00Z',
      );
      formData.append('project_id', projectValue.slug);
      const res = await axios.post(URL_POST_TODO_LIST, formData, config);

      if (res.status === 201) {
        this._getTodoListForToDay();
        this._getProjectList();
        this._getSubTodoList();
      }
    } catch (error) {
      console.log(error);
      console.error(error);
    }
  };

  _makeNewSubTodo = async (subtodoValue, slug) => {
    try {
      const config = {
        headers: {},
      };

      const formData = new FormData();
      formData.append('subtodo_text', subtodoValue.subtodo_text);
      formData.append(
        'goal_date',
        subtodoValue.goal_date.getFullYear() +
          '-' +
          (subtodoValue.goal_date.getMonth() + 1) +
          '-' +
          subtodoValue.goal_date.getDate() +
          'T00:00:00Z',
      );
      formData.append('todo_id', slug);
      const res = await axios.post(URL_POST_SUBTODO_LIST, formData, config);

      if (res.status == 201) {
        this._getTodoListForToDay();
        this._getProjectList();
        this._getSubTodoList();
      }
    } catch (error) {
      console.log(error);
      console.error(error);
    }
  };

  _editTodoDetail = async (todoValue, slug) => {
    try {
      const config = {
        headers: {},
      };

      const formData = new FormData();
      formData.append('todo_text', todoValue.todo_text);
      formData.append('goal_date', todoValue.goal_date);

      const res = await axios.put(URL_PUT_TODO_DETAIL(slug), formData, config);

      if (res.status === 200) {
        this._getTodoListForToDay();

        this._getProjectList();
        this._getSubTodoList();
      }
    } catch (error) {
      console.log(error);
      console.error(error);
    }
  };
  _doneForTodo = async (todoValue, slug) => {
    try {
      const config = {
        headers: {},
      };

      const formData = new FormData();
      if (todoValue.done) {
        formData.append('done', false);
      } else {
        formData.append('done', true);
      }

      const res = await axios.put(URL_PUT_TODO_DETAIL(slug), formData, config);

      if (res.status === 200) {
        this._getTodoListForToDay();
        this._getProjectList();
        this._getSubTodoList();
      }
    } catch (error) {
      console.log(error);
      console.error(error);
    }
  };

  _editSubTodoDetail = async (subTodoValue, slug) => {
    try {
      const config = {
        headers: {},
      };

      const formData = new FormData();
      formData.append('subtodo_text', subTodoValue.subtodo_text);
      formData.append('goal_date', subTodoValue.goal_date);

      const res = await axios.put(
        URL_PUT_SUBTODO_DETAIL(slug),
        formData,
        config,
      );

      if (res.status === 200) {
        this._getTodoListForToDay();
        this._getProjectList();
        this._getSubTodoList();
      }
    } catch (error) {
      console.log(error);
      console.error(error);
    }
  };

  _doneForSubTodo = async (subTodoValue, slug) => {
    try {
      const config = {
        headers: {},
      };

      const formData = new FormData();
      if (subTodoValue.done) {
        formData.append('subtodo_text', subTodoValue.subtodo_text);
        formData.append('done', false);
      } else {
        formData.append('subtodo_text', subTodoValue.subtodo_text);
        formData.append('done', true);
      }

      const res = await axios.put(
        URL_PUT_SUBTODO_DETAIL(slug),
        formData,
        config,
      );

      if (res.status === 200) {
        this._getTodoListForToDay();
        this._getProjectList();
        this._getSubTodoList();
      }
    } catch (error) {
      console.log(error);
      console.error(error);
    }
  };

  componentDidMount() {
    this._getTodoListForToDay();
    this._getProjectList();
    this._getSubTodoList();
  }

  render() {
    let todayData =
      this.props.appStatus.todo.length === 0
        ? this.props.appStatus.todo
        : this.props.appStatus.todo.filter(
            (item) =>
              new Date(item.goal_date).getFullYear() ===
                new Date().getFullYear() &&
              new Date(item.goal_date).getMonth() === new Date().getMonth() &&
              new Date(item.goal_date).getDate() === new Date().getDate(),
          );
    let notTodayData =
      this.props.appStatus.todo.length === 0
        ? this.props.appStatus.todo
        : this.props.appStatus.todo.filter(
            (item) =>
              new Date(item.goal_date).getFullYear() <
                new Date().getFullYear() ||
              (new Date(item.goal_date).getFullYear() ===
                new Date().getFullYear() &&
                new Date(item.goal_date).getMonth() < new Date().getMonth()) ||
              (new Date(item.goal_date).getFullYear() ===
                new Date().getFullYear() &&
                new Date(item.goal_date).getMonth() === new Date().getMonth() &&
                new Date(item.goal_date).getDate() < new Date().getDate()),
          );
    const days = [
      '월요일',
      '화요일',
      '수요일',
      '목요일',
      '금요일',
      '토요일',
      '일요일',
    ];
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            height: 55,
            backgroundColor: '#ffb6b6',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{marginLeft: 10}}
            onPress={() => {
              this.toggleDrawer();
            }}>
            <Icon name="bars" size={30}></Icon>
          </TouchableOpacity>

          <View style={{marginLeft: 40}}>
            <Text style={{color: 'white'}}>오늘</Text>
          </View>
        </View>
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 15,
              borderBottomWidth: 1,
              paddingLeft: 10,
              borderBottomColor: 'grey',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
              }}>
              기한이 지난
            </Text>
          </View>
          {notTodayData.length !== 0 && (
            <FlatList
              data={notTodayData}
              renderItem={({item, index}) => {
                const goalDate = '' + item.goal_date;

                if (item.goal_date === null) {
                  return (
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <TouchableOpacity
                        style={{
                          width: 30,
                          height: 30,
                          borderColor: 'grey',
                          borderRadius: 30 / 2,
                        }}
                        onPress={() => {
                          this._doneForTodo(item, item.slug);
                        }}></TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          borderBottomWidth: 1,
                          borderBottomColor: 'grey',
                          height: 50,
                          justifyContent: 'center',
                        }}
                        onPress={() => {
                          this._setToDoEditModal(true, item);
                        }}>
                        <Text style={{color: 'black', marginLeft: 10}}>
                          {item.todo_text}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                } else {
                  return (
                    <View
                      style={{
                        flexDirection: 'row',
                        height: 50,
                        borderBottomWidth: 1,
                        borderBottomColor: 'grey',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity
                        style={{
                          width: 25,
                          height: 25,
                          borderColor: 'grey',
                          borderWidth: 2,
                          borderRadius: 25 / 2,
                          marginLeft: 7,
                        }}
                        onPress={() => {
                          this._doneForTodo(item, item.slug);
                        }}></TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          justifyContent: 'center',
                        }}
                        onPress={() => {
                          this._setToDoEditModal(true, item);
                        }}>
                        <Text style={{color: 'black', marginLeft: 10}}>
                          {item.todo_text}
                        </Text>
                        <Text style={{color: 'black', marginLeft: 10}}>
                          {goalDate.substring(0, 10)}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                }
              }}
            />
          )}
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 15,
              borderBottomWidth: 1,
              paddingLeft: 10,
              borderBottomColor: 'grey',
              alignItems: 'center',
            }}>
            <Text style={{fontWeight: 'bold'}}>{'오늘 '}</Text>
            <Text style={{fontWeight: 'bold'}}>
              {moment().month() +
                1 +
                '월 ' +
                moment().date() +
                '일 ' +
                days[moment().day() - 1]}
            </Text>
          </View>
          {todayData.length !== 0 && (
            <FlatList
              data={todayData}
              renderItem={({item, index}) => {
                const goalDate = '' + item.goal_date;

                if (item.goal_date === null) {
                  return (
                    <View
                      style={{
                        flexDirection: 'row',
                        height: 50,
                        borderBottomWidth: 1,
                        borderBottomColor: 'grey',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity
                        style={{
                          width: 30,
                          height: 30,
                          borderColor: 'grey',
                          borderRadius: 30 / 2,
                        }}
                        onPress={() => {
                          this._doneForTodo(item, item.slug);
                        }}></TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          justifyContent: 'center',
                          marginLeft: 10,
                        }}
                        onPress={() => {
                          this._setToDoEditModal(true, item);
                        }}>
                        <Text
                          style={{
                            color: 'black',
                            fontWeight: 'bold',
                            marginLeft: 10,
                          }}>
                          {item.todo_text}
                        </Text>
                      </TouchableOpacity>
                      <View style={{flex: 1}}></View>
                      <View style={{flexDirection: 'row', marginRight: 10}}>
                        <Text>{item.project.project_text + ' '}</Text>
                        <Text>프로젝트</Text>
                      </View>
                    </View>
                  );
                } else {
                  return (
                    <View
                      style={{
                        flexDirection: 'row',
                        height: 50,
                        borderBottomWidth: 1,
                        borderBottomColor: 'grey',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity
                        style={{
                          width: 25,
                          height: 25,
                          borderColor: 'grey',
                          borderWidth: 2,
                          borderRadius: 25 / 2,
                          marginLeft: 7,
                        }}
                        onPress={() => {
                          this._doneForTodo(item, item.slug);
                        }}></TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          justifyContent: 'center',
                          marginLeft: 10,
                        }}
                        onPress={() => {
                          this._setToDoEditModal(true, item);
                        }}>
                        <Text
                          style={{
                            color: 'black',
                            fontWeight: 'bold',
                            marginLeft: 10,
                          }}>
                          {item.todo_text}
                        </Text>
                        <Text style={{color: 'black', marginLeft: 10}}>
                          {goalDate.substring(0, 10)}
                        </Text>
                      </TouchableOpacity>
                      <View style={{flex: 1}}></View>
                      <View style={{flexDirection: 'row', marginRight: 10}}>
                        <Text>{item.project.project_text + ' '}</Text>
                        <Text>프로젝트</Text>
                      </View>
                    </View>
                  );
                }
              }}
            />
          )}
        </ScrollView>
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 10,
            width: 50,
            height: 50,
            borderRadius: 30,
            right: 10,
            backgroundColor: '#aacfcf',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            this._setNewWriteToDoModal(true);
          }}>
          <Icon name="plus" size={30}></Icon>
        </TouchableOpacity>
        <NewWriteToDoModal
          setModalProp={this._setNewWriteToDoModal}
          animationType={'none'}
          transparent={true}
          data={this.state.projectData}
          visible={this.state.NewWriteToDoModal}
          _makeNewTodo={this._makeNewTodo}
        />
        <ToDoEditModal
          setModalProp={this._setToDoEditModal}
          animationType={'none'}
          transparent={true}
          subtodo={this.props.appStatus.subtodo}
          data={this.state.todoDataForModal}
          visible={this.state.ToDoEditModal}
          _editTodoDetail={this._editTodoDetail}
          _setNewWriteSubToDoModal={this._setNewWriteSubToDoModal}
          _setSubToDoEditModal={this._setSubToDoEditModal}
          _getSubTodoList={this._getSubTodoList}
          _doneForSubTodo={this._doneForSubTodo}
        />
        <SubToDoEditModal
          setModalProp={this._setSubToDoEditModal}
          animationType={'none'}
          transparent={true}
          data={this.state.subtodoDataForModal}
          visible={this.state.SubToDoEditModal}
          _editSubTodoDetail={this._editSubTodoDetail}
        />
        <NewWriteSubToDoModal
          setModalProp={this._setNewWriteSubToDoModal}
          animationType={'none'}
          transparent={true}
          data={this.state.todoDataForModal}
          visible={this.state.NewWriteSubToDoModal}
          _makeNewSubTodo={this._makeNewSubTodo}
          _getSubTodoList={this._getSubTodoList}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    appStatus: state.appStatus,
    token: state.user.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    projectUpdate: (project) => {
      dispatch(actions.ProjectUpdate(project));
    },
    todoUpdate: (todo) => {
      dispatch(actions.TodoUpdate(todo));
    },
    subtodoUpdate: (subtodo) => {
      dispatch(actions.SubTodoUpdate(subtodo));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDay);
