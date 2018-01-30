import React, { PropTypes } from 'react';
import AuthUser from '../utils/AuthUser';
import LoginForm from '../components/LoginForm.jsx';
import request from '../utils/auth.js'
import {server} from '../config.json'
import {connect} from 'react-redux';
import { bindActionCreators }   from 'redux';
import UserAction   from '../actions/UserAction.js';

const {url : URL} = server


class LoginPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    const storedMessage = localStorage.getItem('successMessage');
    let successMessage = '';

    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }

    // set the initial component state
    this.state = {
      errors: {},
      successMessage,
      user: {
        email: '',
        password: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.user.action == 'login') {
       if(nextProps.user.data && nextProps.user.data.message) {
        this.setState({
          errors: {message: nextProps.user.data.message}
        });
       } else {
          localStorage.setItem('email', nextProps.user.data.email);
          localStorage.setItem('token', nextProps.user.data.token);
          localStorage.setItem('id', nextProps.user.data.id);
          AuthUser.authenticateUser(nextProps.user.data.token);
          this.setState({
              token: nextProps.user.data.token
          });
          this.context.router.replace('/');
       }
    }
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const email = this.state.user.email;
    const password = this.state.user.password;

    this.props.login({email: email, password: password});
    // request({
    //         method: 'POST',
    //         url: URL + '/user/login',
    //         body: {
    //             email: email,
    //             password: password
    //         },
    //         success: (err, res) => {
    //           console.log('rrrrrrrr', res)
    //             const {token, email, message} = res.body
    //             if(message) {
    //               this.setState({
    //                 errors: res.body
    //               });
    //             } else {
    //               localStorage.setItem('email', email)
    //               localStorage.setItem('token', token);
    //               AuthUser.authenticateUser(token);
    //               this.setState({
    //                   token: token,
    //                   message: message
    //               });
    //               this.context.router.replace('/');
    //             }
    //         }
    //     })
    // const formData = `email=${email}&password=${password}`;

    // // create an AJAX request
    // const xhr = new XMLHttpRequest();
    // xhr.open('post', '/auth/login');
    // xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // xhr.responseType = 'json';
    // xhr.addEventListener('load', () => {
    //   if (xhr.status === 200) {
    //     // success

    //     // change the component-container state
    //     this.setState({
    //       errors: {}
    //     });

    //     // save the token
    //     AuthUser.authenticateUser(xhr.response.token);


    //     // change the current URL to /
    //     this.context.router.replace('/');
    //   } else {
    //     // failure

    //     // change the component state
    //     const errors = xhr.response.errors ? xhr.response.errors : {};
    //     errors.summary = xhr.response.message;

    //     this.setState({
    //       errors
    //     });
    //   }
    // });
    // xhr.send(formData);
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <LoginForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        successMessage={this.state.successMessage}
        user={this.state.user}
      />
    );
  }

}

LoginPage.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  console.log('yyyyyyyyyyyyyyyyy', state)
  return {
    user: state.user,
  }
};

function matchDispatchToProps(dispatch){
    return bindActionCreators({login: UserAction.login},dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(LoginPage);