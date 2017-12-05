export function formatDate (date) {
  if( !(date instanceof Date) ) date = new Date(date);
  let start = +date, day = 1000 * 60 * 60 * 24,
      now = +new Date(), dis = now - start;
  if(dis < day){
    return date.getHours() + ':' + date.getMinutes();
  }else if(dis <= day * 2) {
    return '昨天';
  }else if(dis <= day * 7) {
    return '星期' + (date.getDay() === 0 ? '日' : date.getDay());
  }else {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
}