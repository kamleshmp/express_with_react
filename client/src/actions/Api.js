import {server} from '../config.json'
import request from '../utils/auth.js'
import AuthUser from '../utils/AuthUser';
const {url : URL} = server
var Api = {

    cache: {},
    baseUrl: URL,

    ajax: function () {
        var url, args;

        /**
          Parse arguments. Supports e.g. `ajax('/some-uri', { type: 'GET' })`
          and `ajax({ url: '/some-uri', type: 'GET' })` and so on.
        */
        if (arguments.length === 1) {
            if (typeof arguments[0] === 'string') {
                url = arguments[0];
                args = {};
            } else {
                args = arguments[0];
                url = args.url;
                delete args.url;
            }
        } else if (arguments.length === 2) {
            url = arguments[0];
            args = arguments[1];
        }

        // Default to GET
        if (!args.type) {
            args.type = 'GET';
        }

        // Default to JSON with GET
        if (!args.dataType && args.type === 'GET') {
            args.dataType = 'json';
        }

        if (!args.errorHandler) {
            args.errorHandler = this.errorHandler;
        }

        return $.ajax(this.buildURL(url), args);
    },

    buildURL: function(url) {
        // If it's an absolute URL, return it
        if (url.indexOf('http') === 0) {
            return url;
        }

        return this.baseUrl + url;
    },

    errorHandler: function(req, textStatus, errorThrown) {
        var _this = this;
        if (req.status === 401) {
            // TODO: what do?
        }
    },


    //getSections
    get:function(url){
        return this.ajax(url, {
            type: 'GET',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Accept', 'application/json')
                xhr.setRequestHeader('Content-Type', 'application/json')
                xhr.setRequestHeader('Authorization', `Bearer ${AuthUser.getToken()}`)
            },
        });

    },
    post:function(url, data){
        return this.ajax(url, {
            type: 'POST',
            data: JSON.stringify(data),
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Accept', 'application/json')
                xhr.setRequestHeader('Content-Type', 'application/json')
                xhr.setRequestHeader('Authorization', `Bearer ${AuthUser.getToken()}`)
            },
        });

    },

    put:function(url, data){
        return this.ajax(url, {
            type: 'PUT',
            dataType: 'JSON',
            data: data,
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', AuthUser.getToken())
            },
        });
    },
    
    delete:function(url, data){
        return this.ajax(url, {
            type: 'DELETE',
            dataType: 'JSON',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', AuthUser.getToken())
            },
        });
    }
}
export default Api;
