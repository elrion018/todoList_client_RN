import * as types from "../actions/appStatus/types";

const initialState = {
  project: [],
  todo: [],
  subtodo: [],
};

const appStatus = (state = initialState, action) => {
  switch (action.type) {
    case types.PROJECT_UPDATE:
      return {
        ...state,
        project: action.project,
      };

    case types.TODO_UPDATE:
      return {
        ...state,
        todo: action.todo,
      };

    case types.SUBTODO_UPDATE:
      return {
        ...state,
        subtodo: action.subtodo,
      };

    default:
      return state;
  }
};

export default appStatus;
