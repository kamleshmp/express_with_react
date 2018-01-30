import React, { PropTypes } from 'react';
import { Link } from 'react-router';


const PageForm = ({
  onSubmit,
  onChange,
  errors,
  successMessage,
  page
}) => (
  <div className="container">
    <div className="container">
        <div className="row">
            <div className="col-md-6 col-md-offset-3">
                <div className="panel panel-login">
                    <div className="panel-heading">
                      {errors.message && <p className="error-message">{errors.message}</p>}
                        <div className="row">
                            <div className="col-xs-12">
                                <h3> Add New Page </h3>
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
                                         name="title" 
                                         id="title" 
                                         tabIndex="1" 
                                         className="form-control" 
                                         placeholder="Page title" 
                                         onChange={onChange}
                                         value={page.title}/>
                                    </div>
                                    <div className="form-group">
                                        <input 
                                        type="text" 
                                        name="slug" 
                                        id="slug" 
                                        tabIndex="2" 
                                        className="form-control" 
                                        placeholder="Page slug"
                                        onChange={onChange}
                                        value={page.slug}
                                        />
                                    </div>
                                     <div className="form-group">
                                        <input 
                                        type="text" 
                                        name="linkText" 
                                        id="linkText" 
                                        tabIndex="2" 
                                        className="form-control" 
                                        placeholder="Page linkText"
                                        onChange={onChange}
                                        value={page.linkText}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-sm-6 col-sm-offset-3">
                                                <input 
                                                type="submit" 
                                                name="page-submit" 
                                                id="page-submit" 
                                                tabIndex="4" 
                                                className="form-control btn btn-login" 
                                                value="Submit"/>
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

PageForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  successMessage: PropTypes.string.isRequired,
  page: PropTypes.object.isRequired
};

export default PageForm;