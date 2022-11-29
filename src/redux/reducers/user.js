import { SAVE_USER } from '../actions';

const INIT_STATE = {
  email: '',
  password: '',
};

const user = (state = INIT_STATE, action) => {
  switch (action.type) {
  case SAVE_USER:
    return {
      ...state,
      email: action.userData.email,
      password: action.userData.password,
    };
  default:
    return state;
  }
};

export default user;
