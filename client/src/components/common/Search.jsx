import React from 'react'
import '../../assete/scss/Search.scss'

const Search = ({ handleEnter, placeholder, handleChange }) => {
  let input
  const handlers = {
    onChange: handleChange ? () => { handleChange(input.value) } : null,
    onKeyDown: handleEnter
      ? function (e) {
          const val = input.value.trim()
          if (e.keyCode == 13) {
            val ? handleEnter(val) : alert('请输入有效的关键字')
          }
        } : null
  }
  return (
    <div className='search'>
      <div className='search-wrap'>
        <label htmlFor='search' />
        <input
          id='search'
          ref={node => input = node}
          placeholder={placeholder}
          {...handlers}
        />
      </div>
    </div>
  )
}

export default Search
