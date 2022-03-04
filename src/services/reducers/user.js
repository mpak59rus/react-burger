import { USER_SET_DATA, USER_LOGOUT, USER_UPDATE_SUCCESS, TOKEN_UPDATE_SUCCESS, TOKEN_UPDATE_REQUEST, TOKEN_UPDATE_FAIL, USER_UPDATE_FAIL, USER_UPDATE_REQUEST } from "../actions/user";

const userInitState = {
  userName: null,
  email: null,
  isAuthenticated: false,
  token: null,

  isRequest: false,
  isFail: false
};

export const userReducer = (state = userInitState, action) => {
  switch (action.type) {
    case USER_SET_DATA: {
      return {
        userName: action.name,
        email: action.email,
        isAuthenticated: true,
        token: action.token
      };
    }
    case USER_LOGOUT: {
      return {
        userName: null,
        email: null,
        isAuthenticated: false,
        token: null
      };
    }
    case USER_UPDATE_SUCCESS: {
      return {
        ...state,
        isRequest: false,
        email: action.email,
        userName: action.name
      }
    }
    case USER_UPDATE_REQUEST: {
      return {
        ...state,
        isRequest: true

      }
    }
    case USER_UPDATE_FAIL: {
      return {
        ...state,
        isRequest: false,
        isFail: true
      }
    }
    case TOKEN_UPDATE_REQUEST: {
      return {
        ...state,
        isRequest: true,
        token: null
      }
    }
    case TOKEN_UPDATE_SUCCESS: {
      return {
        ...state,
        isRequest: false,
        token: action.token
      }
    }
    case TOKEN_UPDATE_FAIL: {
      return {
        token: null,
        isRequest: false,
        isFail: true
      }
    }
    default: {
      return state;
    }
  }
};
