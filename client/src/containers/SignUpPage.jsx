import React, { PropTypes } from 'react';
import SignUpForm from '../components/SignUpForm.jsx';
import request from '../utils/auth.js'
import {server} from '../config.json'
import _ from 'lodash'
import {connect} from 'react-redux';
import UserAction                   from '../actions/UserAction.js';
import { bindActionCreators }       from 'redux';
import AuthUser from '../utils/AuthUser';

const {url : URL} = server

class SignUpPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    // set the initial component state
    this.state = {
      errors: [],
      user: {
        email: '',
        username: '',
        password: '',
        confirmPassword:''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.setErrors = this.setErrors.bind(this);
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */

  componentWillReceiveProps(nextProps){
    if(nextProps.user.action == 'register') {
       if(nextProps.user.data && nextProps.user.data.errors) {
        this.setErrors(nextProps.user.data.errors);
       } else {
          localStorage.setItem('email', nextProps.user.data.email)
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
  setErrors(errs) {
    const errors = _.map(errs, (error, idx)=> {
       return <li key={`error-${idx}`}>{error}</li>
    });
    console.log(errors)
    this.setState({errors: errors});
  }

  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const username = encodeURIComponent(this.state.user.username);
    const email = this.state.user.email;
    const password = encodeURIComponent(this.state.user.password);

    this.props.register({email: email, password: password, username: username});

    // event.preventDefault()
    //     request({
    //         method: 'POST',
    //         url: URL + '/user/register',
    //         body: {
    //             username: username,
    //             email: email,
    //             password: password
    //         },
    //         success: (err, res) => {
    //           console.log('eeeeeeee', res)
    //             if(err) {
    //                 throw err
    //             } else if (res.body.errors){
    //               this.setErrors(res.body.errors);
    //             } else {
    //                 const {token, username, message} = res.body
    //                 localStorage.setItem('username', username)
    //                 localStorage.setItem('token', token)
    //                 this.setState({
    //                     token: token,
    //                     message: message,
    //                     errors: []
    //                 });
    //                 this.context.router.replace('/login');
    //             }
    //         }
    //     })
    // const formData = `name=${name}&email=${email}&password=${password}`;

    // // create an AJAX request
    // const xhr = new XMLHttpRequest();
    // xhr.open('post', '/auth/signup');
    // xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // xhr.responseType = 'json';
    // xhr.addEventListener('load', () => {
    //   if (xhr.status === 200) {
    //     // success

    //     // change the component-container state
    //     this.setState({
    //       errors: {}
    //     });

    //     // set a message
    //     localStorage.setItem('successMessage', xhr.response.message);

    //     // make a redirect
    //     this.context.router.replace('/login');
    //   } else {
    //     // failure

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
      <SignUpForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
      />
    );
  }

}

SignUpPage.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  console.log('aaaaaaaaaaaa', state)
  return {
    user: state.user,
  }
};

function matchDispatchToProps(dispatch){
    return bindActionCreators({register: UserAction.register},dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(SignUpPage);
