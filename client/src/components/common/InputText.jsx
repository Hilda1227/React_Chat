import React, { Component } from 'react'
import '../../assete/scss/InputText.scss'

class InputText extends Component {
  constructor (props) {
    super(props)
    this.state = { val: '' }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    this.setState({
      val: e.target.value
    })
    this.props.onChange(e.target.value)
  }

  render () {
    const { inputType, placeholder } = this.props
    return (
      <div className='input-text '>
        <label />
        <input value={this.state.val} type={inputType} onChange={this.handleChange} placeholder={placeholder} />
      </div>
    )
  }
}

export default InputText
