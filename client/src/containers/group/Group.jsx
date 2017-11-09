import { Component } from 'react';
import { connect } from 'react-redux';

import Group from '../../components/group/Group';

function mapStateToProps(state) {
  return {
    _id: state.user.get('_id')
  };
}

export default connect(mapStateToProps)(Group);


