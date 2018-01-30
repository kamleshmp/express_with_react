import React, { PropTypes } from 'react';
import { Link } from 'react-router';


const SignUpForm = ({
  onSubmit,
  onChange,
  errors,
  user,
}) => (
  <div className="container">
     <div className="container">
        <div className="row">
            <div className="col-md-6 col-md-offset-3">
                <div className="panel panel-login">
                  <ul>{errors}</ul>
                    <div className="panel-heading">
                        <div className="row">
                            <div className="col-xs-6">
                                <Link to={'/login'} className="active" id="login-form-link">Login</Link>
                            </div>
                            <div className="col-xs-6">
                                <Link to={'/signup'} id="register-form-link">Register</Link>
                            </div>
                        </div>
                        <hr/>
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-lg-12">
                                <form id="register-form" onSubmit={onSubmit}>
                                    <div className="form-group">
                                      <input 
                                        onChange={onChange}
                                        value={user.username}
                                        type="text" 
                                        name="username" 
                                        id="username" 
                                        tabIndex="1" 
                                        className="form-control" 
                                        placeholder="Username" 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input 
                                        onChange={onChange}
                                        value={user.email}
                                        type="email" 
                                        name="email" 
                                        id="email" 
                                        tabIndex="1" 
                                        className="form-control" 
                                        placeholder="Email Address" 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input 
                                        onChange={onChange}
                                        value={user.password}
                                        type="password" 
                                        name="password" 
                                        id="password" 
                                        tabIndex="2"
                                        className="form-control" 
                                        placeholder="Password"/>
                                    </div>
                                    <div className="form-group">
                                        <input
                                        onChange={onChange}
                                        value={user.confirmPassword} 
                                        type="password" 
                                        name="confirmPassword" 
                                        id="confirmPassword" 
                                        tabIndex="2" 
                                        className="form-control" 
                                        placeholder="Confirm Password"/>
                                    </div>
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-sm-6 col-sm-offset-3">
                                                <input type="submit" name="register-submit" id="register-submit" tabIndex="4" className="form-control btn btn-register" value="Register Now"/>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
);

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired
};

export default SignUpForm;