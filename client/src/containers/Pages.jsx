import React, { PropTypes } from 'react';
import AuthUser from '../utils/AuthUser';
import PageIndex from '../components/PageIndex.jsx';
import request from '../utils/auth.js'
import {server} from '../config.json'
import {connect} from 'react-redux';
import { bindActionCreators }   from 'redux';
import PageAction   from '../actions/PageAction.js';
import { Link, IndexLink } from 'react-router';

const {url : URL} = server


class Pages extends React.Component {

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
   		pages: []
    };
    console.log(this.props)
    this.props.getPages(localStorage.getItem('id'));
    this.props.getPage(1);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.pages.action == 'pages') {
      const pages = _.map(nextProps.pages.data.pages, function(page){
        return <tr key={page.id}>
          <td>{page.id}</td>
          <td>{page.title}</td>
          <td>{page.linkText}</td>
          <td><Link to={`/pages/${page.id}`}>{page.slug}</Link></td>
          <td><Link to="/pages">Edit</Link></td>
          <td><Link to="/pages">Delete</Link></td>
        </tr>
      })
      this.setState({
        pages: pages
      });
    }
  }
  /**
   * Render the component.
   */
  render() {
    return (
      <PageIndex
        pages={this.state.pages}
      />
    );
  }

}

Pages.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
console.log('yyyyyyyyyy',state)
  return {
    pages: state.pages,
  }
};

function matchDispatchToProps(dispatch){
    return bindActionCreators({getPages: PageAction.getPages, getPage: PageAction.getPage},dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Pages);
