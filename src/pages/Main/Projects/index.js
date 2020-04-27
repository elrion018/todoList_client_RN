import React from 'react';
import {View, TouchableOpacity, Text, FlatList, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  URL_POST_PROJECT_LIST,
  URL_PUT_PROJECT_LIST,
  URL_POST_PROJECT_LIST_EMAIL,
  URL_POST_TODO_LIST_EMAIL,
  URL_POST_SUBTODO_LIST_EMAIL,
} from '../../../globals/api';
import {connect} from 'react-redux';
import axios from 'axios';
import * as actions from '../../../actions/appStatus';
import {NewWriteProjectModal, ProjectEditModal} from '../../../modals';
class Projects extends React.Component {
  constructor() {
    super();

    this.state = {
      newWriteProjectModal: false,
      projectEditModal: false,
      projectDataForModal: {
        project_text: '',
      },
    };
  }

  toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
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

  _getTodoList = async () => {
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

  _setNewWriteProjectModal = (visible) => {
    this.setState({
      newWriteProjectModal: visible,
    });
  };

  _setProjectEditModal = (visible, item) => {
    this.setState(
      {
        projectDataForModal: item,
      },
      () => {
        this.setState({
          projectEditModal: visible,
        });
      },
    );
  };

  _makeNewProject = async (projectValue) => {
    try {
      const config = {
        headers: {},
      };
      const formData = new FormData();
      formData.append('project_text', projectValue.project_text);
      const res = await axios.post(URL_POST_PROJECT_LIST, formData, config);

      if (res.status === 201) {
        this._getTodoList();
        this._getProjectList();
        this._getSubTodoList();
      }
    } catch (error) {
      console.log(error);
      console.error(error);
    }
  };

  _editProjectDetail = async (projectValue, slug) => {
    try {
      const config = {
        headers: {},
      };

      const formData = new FormData();
      formData.append('project_text', projectValue.project_text);

      const res = await axios.put(URL_PUT_PROJECT_LIST(slug), formData, config);

      if (res.status === 200) {
        this._getTodoList();
        this._getProjectList();
        this._getSubTodoList();
      }
    } catch (error) {
      console.log(error);
      console.error(error);
    }
  };

  _deleteProjectDetail = async (slug) => {
    try {
      const config = {
        headers: {},
      };

      const res = await axios.delete(URL_PUT_PROJECT_LIST(slug), config);
      console.log(res);
      if (res.status === 204) {
        this._getTodoList();
        this._getProjectList();
        this._getSubTodoList();
      }
    } catch (error) {
      console.log(error);
      console.error(error);
    }
  };

  componentDidMount() {
    this._getTodoList();
    this._getProjectList();
    this._getSubTodoList();
  }

  render() {
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
            <Text style={{color: 'white'}}>프로젝트</Text>
          </View>
          <View style={{flex: 1}} />
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 20,
            }}
            onPress={() => {
              this._setNewWriteProjectModal(true);
            }}>
            <Icon name="plus" size={20} />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <FlatList
            data={this.props.appStatus.project}
            renderItem={({item}) => {
              return (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TouchableOpacity
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: 'grey',
                      height: 50,
                      justifyContent: 'center',
                      width: Dimensions.get('window').width,
                    }}
                    onPress={() => {
                      this._setProjectEditModal(true, item);
                    }}>
                    <Text
                      style={{
                        color: 'black',
                        marginLeft: 15,
                        fontWeight: 'bold',
                      }}>
                      {item.project_text}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
        <NewWriteProjectModal
          setModalProp={this._setNewWriteProjectModal}
          animationType={'none'}
          transparent={true}
          visible={this.state.newWriteProjectModal}
          _makeNewProject={this._makeNewProject}
        />
        <ProjectEditModal
          setModalProp={this._setProjectEditModal}
          animationType={'none'}
          transparent={true}
          visible={this.state.projectEditModal}
          data={this.state.projectDataForModal}
          _editProjectDetail={this._editProjectDetail}
          _deleteProjectDetail={this._deleteProjectDetail}
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

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
