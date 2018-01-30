import React, { PropTypes } from 'react';
import { Link } from 'react-router';


const LoginForm = ({
  onSubmit,
  onChange,
  errors,
  successMessage,
  user
}) => (
  <div className="container">
    <div className="container">
        <div className="row">
            <div className="col-md-6 col-md-offset-3">
                <div className="panel panel-login">
                    <div className="panel-heading">
                      {errors.message && <p className="error-message">{errors.message}</p>}
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
                                <form id="login-form" onSubmit={onSubmit}>
                                    <div className="form-group">
                                        <input
                                         type="text"
                                         name="email" 
                                         id="email" 
                                         tabIndex="1" 
                                         className="form-control" 
                                         placeholder="Email" 
                                         onChange={onChange}
                                         value={user.email}/>
                                    </div>
                                    <div className="form-group">
                                        <input 
                                        type="password" 
                                        name="password" 
                                        id="password" 
                                        tabIndex="2" 
                                        className="form-control" 
                                        placeholder="Password"
                                        onChange={onChange}
                                        value={user.password}
                                        />
                                    </div>
                                    <div className="form-group text-center">
                                        <input type="checkbox" tabIndex="3" className="" name="remember" id="remember"/>
                                        <label htmlFor="remember"> Remember Me</label>
                                    </div>
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-sm-6 col-sm-offset-3">
                                                <input 
                                                type="submit" 
                                                name="login-submit" 
                                                id="login-submit" 
                                                tabIndex="4" 
                                                className="form-control btn btn-login" 
                                                value="Log In"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="text-center">
                                                  
                                                </div>
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

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  successMessage: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

export default LoginForm;