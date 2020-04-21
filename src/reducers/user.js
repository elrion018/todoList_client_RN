import * as types from '../actions/user/types';

const initialState = {
  token: [],
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case types.TOKEN_UPDATE:
      return {
        ...state,
        token: action.token,
      };

    default:
      return state;
  }
};

export default user;
