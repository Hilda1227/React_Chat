import React, {Component} from 'react'
import { Route, NavLink, BrowserHistory } from 'react-router-dom';
import InputText from '../components/common/InputText'
import { autobind } from 'core-decorators';
import { signUp, login} from '../redux/actions/user';
import socketEmit from '../redux/actions/socketEmit';
import PropTypes from 'prop-types';


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
      .then(data => {this.context.router.history.push("/"); localStorage.setItem('token', data.token);})
      .catch(err => alert(err))
    }
    else alert("输入不合法");
  }
  @autobind
  validateInput () {
    let regEmail = /^[0-9a-zA-Z_-]+@\w+\.\w+$/,
        nickname = this.state.nickname ? this.state.nickname.trim() : '' ,
        email = this.state.email ? this.state.email.trim() : '' ,
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

export default SignUp;