import React, { PropTypes } from 'react';
import AuthUser from '../utils/AuthUser';
import PageForm from '../components/PageForm.jsx';
import request from '../utils/auth.js'
import {server} from '../config.json'
import {connect} from 'react-redux';
import { bindActionCreators }   from 'redux';
import PageAction   from '../actions/PageAction.js';

const {url : URL} = server


class NewPage extends React.Component {

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
      page: {
        title: '',
        slug: '',
        linkText: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  componentWillReceiveProps(nextProps){

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
    const title = this.state.page.title;
    const slug = this.state.page.slug;
    const linkText = this.state.page.linkText;
    const userId = localStorage.getItem('id');

    this.props.addPage({title: title, slug: slug, linkText: linkText, userId: userId});
    this.context.router.replace('/pages');
  }

  /**
   * Change the page object.
   *
   * @param {object} event - the JavaScript event object
   */
  changePage(event) {
    const field = event.target.name;
    const page = this.state.page;
    page[field] = event.target.value;

    this.setState({
      page
    });
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <PageForm
        onSubmit={this.processForm}
        onChange={this.changePage}
        errors={this.state.errors}
        successMessage={this.state.successMessage}
        page={this.state.page}
      />
    );
  }

}

NewPage.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    page: state.page,
  }
};

function matchDispatchToProps(dispatch){
    return bindActionCreators({addPage: PageAction.addPage},dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(NewPage);
