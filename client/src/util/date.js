const week = ['日', ' 一', '二', '三', '四', '五', '六']

export function formatDate (date) {
  if (!(date instanceof Date)) date = new Date(date)
  const start = +date
  const day = 1000 * 60 * 60 * 24
  const now = +new Date(); const dis = now - start
  if (dis < day) {
    return String(date.getHours()).padStart(2, '0') + ':' + String(date.getMinutes()).padStart(2, '0')
  } else if (dis <= day * 2) {
    return '昨天'
  } else if (dis <= day * 7) {
    return '星期' + week[date.getDay()]
  } else {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  }
}

export function formatCompleteDate (time, str) {
  if (time != null) {
    const date = new Date(time)
    return date.getFullYear() + str + (date.getMonth() + 1) + str + date.getDate() + ' ' +
           String(date.getHours()).padStart(2, '0') + ':' + String(date.getMinutes()).padStart(2, '0')
  }
}
