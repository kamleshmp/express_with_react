import {createReducer} from '../utils';
import Constants   from   "../constants";

const initialState = {
    data: null,
    isFetching: false
};


export default function (state = initialState, action) {  
  switch(action.type) {
    case Constants.LOGIN:
      return { ...state, data: action.payload, action: 'login' };
    case Constants.REGISTER:
      return { ...state,  data: action.payload, action: 'register' };
  }

  return state;
}