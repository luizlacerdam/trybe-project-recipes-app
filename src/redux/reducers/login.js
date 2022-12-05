import { LOGIN, LOGOUT } from '../actions/actionsTypes';

const INITIAL_STATE = {
  password: '',
  email: '',
};
const login = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      password: action.state.password,
      email: action.state.email,
    };
  case LOGOUT:
    return {
      ...INITIAL_STATE,
    };
  default:
    return state;
  }
};
export default login;
