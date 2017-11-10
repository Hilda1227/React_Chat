import React from 'react';
import '../../assete/scss/InputForm.scss'

const InputForm = ({ onSubmit, create, join, close }) => {
  let input;
  return (
    <div className = { `input-form${ create || join ? '' : '-hidden'}` }>
      <span className = 'close'
        onClick = { () => {close(); input.value = ''} }
      ></span>
      <p>请输入群组名</p>
      <input ref = { node => input = node } type = 'text'></input>
      <button onClick = { () => onSubmit(input.value) }>确定</button>
    </div> 
  );
}

export default InputForm;