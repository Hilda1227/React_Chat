import React from 'react';
import '../../assete/scss/TextMessageItem.scss';
import { Component } from 'react';
import { connect } from 'react-redux';
import { formatDate } from '../../util/date.js'


const TextMessageItem = (props) => {
  return (
    <p className = 'content'>{ props.content }</p>
  )
}
export default TextMessageItem

// function mapStateToProps(state, ownProps) {
//   return {
//     isSelf: state.user.get('nickname') === ownProps.sender
//   };
// }

// export default connect(mapStateToProps)(TextMessageItem);