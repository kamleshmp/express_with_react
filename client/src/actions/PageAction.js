"use strict";
import Constants   from   "../constants";
import Api         from   "./Api";

export default {
  addPage(data){
    return function(dispatch){
      Api.post('/pages/new', data).then(function(res,err){
        return dispatch({
          type: Constants.NEW_PAGE,
          payload: res
        });
      });
    }
  },

  deletePage(id){
    return function(dispatch){
      Api.delete(`/pages/${id}`).then(function(res,err){
        return dispatch({
          type: Constants.DELETE_PAGE,
          payload: res
        });
      });
    }
  },

  editPage(id, data) {
    return function(dispatch){
      Api.put(`/pages/${id}/edit`, data).then(function(res,err){
        return dispatch({
          type: Constants.EDIT_PAGE,
          payload: res
        });
      });
    }
  },  

  getPage(id){

    return function(dispatch){
      Api.get(`/pages/${id}`).then(function(res,err){
        return dispatch({
          type: Constants.PAGE,
          payload: res.page
        });
      });
    }
  },
    
  getPages(userId){
    return function(dispatch){
      Api.get(`/pages`).then(function(res,err){
        return dispatch({
          type: Constants.PAGES,
          payload: res
        });
      });
    }
  }
}
