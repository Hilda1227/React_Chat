import React, {Component} from 'react'
import { Route, NavLink, BrowserHistory } from 'react-router-dom';
import InputText from '../components/common/InputText'
import { autobind } from 'core-decorators';
import { signUp, login} from '../redux/actions/user';
import { socketEmit } from '../redux/actions/common';
import PropTypes from 'prop-types';
import { showAlert } from '../redux/actions/pageUI';
import { setUser } from '../redux/actions/user';
import { dispatchAction } from '../redux/actions/common';
import { initRoomList } from '../redux/actions/activeList';
import { connect } from 'react-redux';

class SignUp extends Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      nickname: '',
      password: '',
      disabled: true
    }
  }
  static contextTypes = {
    router: PropTypes.object.isRequired
  };
  @autobind
  handleValue (name, val) {
    this.setState({
      [name]: val 
    })
  }
  @autobind
  handleSubmmit (e) {
    e.preventDefault(); const info = this.validateInput();
    if(info) {
      socketEmit('signUp', info)
      .then(data => {
        localStorage.setItem('token', data.token);
        dispatchAction(setUser(data.user));
        dispatchAction(initRoomList(data.user._id));
        this.context.router.history.push("/"); 
      })
      .catch(err => this.props.showAlert(err))
    }
    else this.props.showAlert('输入不合法')
  }
  @autobind
  validateInput () {
    let regEmail = /^[0-9a-zA-Z_-]+@\w+\.\w+$/,
        nickname = this.state.nickname ? this.state.nickname.trim() : '' ,
        email    = this.state.email ? this.state.email.trim() : '' ,
        password = this.state.password ? this.state.password.trim() : '' ;
    if(nickname && regEmail.test(email) && password)
      return { nickname, email, password };
    return false;
  }
  render () {
    return (
      <div className="sign">
      <div className="sign-link">
        <NavLink to="/login" activeClassName="active-link">登录</NavLink>
        <NavLink to="/signUp" activeClassName="active-link">注册</NavLink>
      </div>
      <form>
        <InputText inputType="text" placeholder="昵称" onChange={(val) => this.handleValue('nickname', val) }/> 
        <InputText inputType="text" placeholder="邮箱" onChange={(val) => this.handleValue('email', val) }/> 
        <InputText inputType="password" placeholder="密码" onChange={(val) => this.handleValue('password', val) }/>
        <button onClick={ this.handleSubmmit }>提交</button> 
      </form>                 
    </div>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => {
    return {
      showAlert: (payload) => dispatch(showAlert(payload))
    }
  }
)(SignUp);