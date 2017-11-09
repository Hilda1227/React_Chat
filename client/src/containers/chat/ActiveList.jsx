import { Component } from 'react';
import { connect } from 'react-redux';

import ActiveList from '../../components/chat/ActiveList';
// import { increment } from '../actionsCreators';

// 哪些 Redux 全局的 state 是我们组件想要通过 props 获取的？
function mapStateToProps(state) {
  return {
    activeList: state.activeList
  };
}

// // 哪些 action 创建函数是我们想要通过 props 获取的？
// function mapDispatchToProps(dispatch) {
//   return {
//     onIncrement: () => dispatch(increment())
//   };
// }

export default connect(mapStateToProps)(ActiveList);