import React, { Component }from 'react';
import '../../assete/scss/Expressions.scss';
import config from '../../config/serverConfig';

class Expressions extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    let emojis = new Array(27).fill(0).map((item, index) => {
      return (
        <img className = 'emoji' 
          key = { index } 
          src = {config.EMOJI_URL + (index) + '.png'}
          onClick = { () => this.props.onClick(`#emoji(${index})`) }
        />
      )
    })
    return (
      <div className = { `expressions expressions${this.props.isShow ? '' : '-hidden'}` } >
          { emojis }
      </div>
    )
  }
}


export default Expressions