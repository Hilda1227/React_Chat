import React from 'react'
import '../assete/scss/TextMessageItem.scss'
import config from '../config/serverConfig'

// 防xss注入
function escaper (value) {
  const escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  }
  const reg = RegExp('(' + Object.keys(escapeMap).join('|') + ')', 'g')
  return value.replace(reg, (match, p1) => {
    return escapeMap[p1]
  })
}

// 匹配url
function matchLink (value) {
  const reg = RegExp('(?:https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]', 'g')
  return value.replace(reg, match => {
    return `<a href = '${match}' class = 'link'>${match}</a>`
  })
}

// 匹配表情
function matchEmoji (value) {
  return value.replace(/#emoji\(([^)]*)\)/g, (match, p1) => {
    return `<img src = '${config.EMOJI_URL}${p1}.png' class = 'emoji' />`
  })
}

function handleText (value) {
  value = String(value)
  value = escaper(value)
  value = matchLink(value)
  value = matchEmoji(value)
  return value
}

const TextMessageItem = (props) => {
  return (
    <p className='content' dangerouslySetInnerHTML={{ __html: handleText(props.content) }} />
  )
}
export default TextMessageItem
