import React, {Component} from 'react';
import { Route, NavLink } from 'react-router-dom';
import InputText from '../components/InputText';
import '../assete/scss/sign.scss'
import { autobind } from 'core-decorators';
import socketEmit from '../actions/socketEmit';
import { login} from '../actions/user';
import PropTypes from 'prop-types';



class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.handleSubmmit = this.handleSubmmit.bind(this);
  }
  static contextTypes = {
    router: PropTypes.object.isRequired
  };
  @autobind
  handleValue(name, val) {
    this.setState({
      [name]: val 
    })
  }
  @autobind
  handleSubmmit (e) {
    e.preventDefault();
    socketEmit('login', {email: this.state.email, password: this.state.password})
    .then(data => this.context.router.history.push("/"))
    .catch(err => alert(err))
  }
  render () {
    return (
      <div className="sign">
        <div className="sign-link">
        <NavLink to="/login" activeClassName="active-link">登录</NavLink>
        <NavLink to="/signUp" activeClassName="active-link">注册</NavLink>
        </div>
        <form>
          <InputText inputType="text" placeholder="邮箱" onChange={(val) => this.handleValue('email', val) }/> 
          <InputText inputType="text" placeholder="密码" onChange={(val) => this.handleValue('password', val) }/> 
          <button onClick={ this.handleSubmmit }>GO</button> 
        </form>                 
      </div>
    )
  }
}

export default Login;