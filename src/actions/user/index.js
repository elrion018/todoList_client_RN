import * as types from './types';

//user

export const TokenUpdate = (token) => {
  return {
    type: types.TOKEN_UPDATE,
    token,
  };
};
