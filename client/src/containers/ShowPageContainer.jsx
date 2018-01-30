import React, { PropTypes } from 'react';
import AuthUser from '../utils/AuthUser';
import ShowPage from '../components/ShowPage.jsx';
import request from '../utils/auth.js'
import {server} from '../config.json'
import {connect} from 'react-redux';
import { bindActionCreators }   from 'redux';
import PageAction   from '../actions/PageAction.js';

class ShowPageContainer extends React.Component {
  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);
    this.state = {
      page: {}
    }
  }

  componentWillMount(){
    this.props.getPage(this.props.params.id);
  }

  componentWillReceiveProps(nextProps){
   console.log('xxxxxxxxxxx',nextProps)
  }


  /**
   * Render the component.
   */
  render() {
    return (
      <ShowPage
        page={this.state.page}
      />
    );
  }

}

ShowPageContainer.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
   console.log('xxxxxxxxxxx',state)
  return {
    page: state.page,
  }
};

function matchDispatchToProps(dispatch){
    return bindActionCreators({getPage: PageAction.getPage},dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ShowPageContainer);
