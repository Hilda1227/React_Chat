import React, {Component} from 'react';
import { Route, NavLink } from 'react-router-dom';
import InputText from '../components/common/InputText';
import '../assete/scss/sign.scss';
import { autobind } from 'core-decorators';
import { socketEmit } from '../redux/actions/common';
import { login} from '../redux/actions/user';
import PropTypes from 'prop-types';
import { setUser } from '../redux/actions/user';
import { dispatchAction } from '../redux/actions/common';
import { initRoomList } from '../redux/actions/activeList';
import { connect } from 'react-redux';
import { showAlert } from '../redux/actions/pageUI';

class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
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
    .then(data => { 
      localStorage.setItem('token', data.token);
      dispatchAction(setUser(data.user));
      dispatchAction(initRoomList(data.user._id));
      this.context.router.history.push("/");
    })
    .catch(err => this.props.showAlert(err))
  }
  render () {
    return (
      <div className="sign">
        <div className="sign-link">
        <NavLink to="/login" activeClassName="active-link">登录</NavLink>
        <NavLink to="/signUp" activeClassName="active-link">注册</NavLink>
        </div>
        <form>
          <InputText inputType="text" placeholder="用户名或邮箱" onChange={(val) => this.handleValue('email', val) }/> 
          <InputText inputType="text" placeholder="密码" onChange={(val) => this.handleValue('password', val) }/> 
          <button onClick={ this.handleSubmmit }>GO</button> 
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
)(Login);