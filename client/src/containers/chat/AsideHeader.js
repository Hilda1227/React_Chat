import { Component } from 'react';
import { connect } from 'react-redux';
import AsideHeader from '../../components/chat/AsideHeader';
import { selectLeftPanel } from '../../redux/actions/pageUI';
import { clearUser } from '../../redux/actions/user';

function mapStateToProps(state) {
  return {
    user: state.user
  };
}
function mapDispatchToProps(dispatch) {
  return {
    selectLeftPanel: payload => () => dispatch(selectLeftPanel(payload)),
    clearUser: () => dispatch(clearUser()) 
  };
}

export default connect( mapStateToProps, mapDispatchToProps)(AsideHeader);