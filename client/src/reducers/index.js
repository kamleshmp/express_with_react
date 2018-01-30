import {combineReducers} from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import user from './user';
import pages from './page';

export default combineReducers({
 user,
 pages,
 routing: routerReducer
});