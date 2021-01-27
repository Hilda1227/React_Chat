import { Component } from 'react'
import { connect } from 'react-redux'
import UserProfile from '../components/UserProfile'
import { removeActiveItem } from '../redux/actions/activeList'
import { closeChatting } from '../redux/actions/chatting'

function mapStateToProps (state) {
  return {
    chatting: state.chatting.toJS()
  }
}
function mapDispatchToProps (dispatch) {
  return {
    delChatting: (payload) => {
      dispatch(closeChatting(payload))
      dispatch(removeActiveItem(payload))
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile)
