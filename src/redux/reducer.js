import { LOGIN_ACTION, LOGOUT_ACTION } from "./actions";

const initialState = {
  isLoggedIn: false,
  userName: "",
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_ACTION:
      return {
        ...state,
        isLoggedIn: true,
        userName: action.payload,
      };
    case LOGOUT_ACTION:
      return {
        ...state,
        isLoggedIn: false,
        userName: "",
      };
    default:
      return state;
  }
};
