import React from 'react'
import '../../assete/scss/SubmitButton.scss'

const SubmitButton = (props) => {
  const { size = '55', color = '#50d2be', disabled = true, direction = 'center', isCircle, children, onClick } = props
  const style = {
    width: size + 'px',
    height: isCircle ? (size + 'px') : (size * 0.618 + 'px'),
    backgroundColor: disabled ? null : color,
    borderRadius: isCircle ? '50%' : '6px'
  }
  return (
    <div className='submit-button-wrap'>
      <span
        style={style}
        onClick={disabled ? null : onClick}
        className={`submit-button submit-button-${disabled ? 'disabled' : 'usable'}`}
      >
        {children || <i className={`icon-${disabled ? 'disabled' : 'usable'}`} />}
      </span>
    </div>
  )
}

export default SubmitButton
