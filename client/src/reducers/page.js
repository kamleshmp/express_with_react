import {createReducer} from '../utils';
import Constants   from   "../constants";

const initialState = {
    data: null,
    isFetching: false
};


export default function (state = initialState, action) {  
  switch(action.type) {
  	case Constants.PAGE:
      return { ...state, data: action.payload, action: 'page' };
    case Constants.PAGES:
      return { ...state, data: action.payload, action: 'pages' };
    case Constants.NEW_PAGE:
      return { ...state,  data: action.payload, action: 'new_page' };
    case Constants.EDIT_PAGE:
      return { ...state,  data: action.payload, action: 'edit_page' };
    case Constants.DELETE_PAGE:
      return { ...state,  data: action.payload, action: 'delete_page' };
  }

  return state;
}