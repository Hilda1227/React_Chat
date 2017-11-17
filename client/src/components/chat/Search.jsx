import React from 'react'
import '../../assete/scss/Search.scss'

const Search = ({searchAddItem, user_id}) => {
  let input;
  return (
    <div className = 'search'>
    <div className = 'search-wrap'>
      <label htmlFor = 'search'></label>
      <input placeholder = '搜索开始新的对话' id = 'search'
        ref={ (node) => input=node }
        onKeyDown = { (e) => {
          if(e.keyCode == 13) {
            e.target.value.trim()
            ? searchAddItem({ nickname: e.target.value, type: 'private', user_id})
            : alert('请输入有效的用户名');
            e.target.value = '';
          }
        } }
      />
    </div>
  </div>
  )
}

export default Search