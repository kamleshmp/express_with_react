"use strict";
import Constants   from   "../constants";
import Api         from   "./Api";

export default {
  login(data){
    return function(dispatch){
      Api.post('/user/login', data).then(function(res,err){
        return dispatch({
          type: Constants.LOGIN,
          payload: res
        });
      });
    }
  },

  register(data){
    return function(dispatch){
      Api.post('/user/register', data).then(function(res,err){
        return dispatch({
          type: Constants.REGISTER,
          payload: res
        });
      });
    }
  }
}
