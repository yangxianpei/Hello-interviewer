//放置方法
const getYearMonthDay=(data)=>{
  let year = data.getFullYear();
  let month = data.getMonth();
  let day = data.getDate()
  return {year,month,day}
}

const wantDate=(year,month,day)=>{
    return new Date(`${year}-${month+1}-${day}`)
}
const getCruendTimeInfo=()=>{
  let nowTime=new Date()
  let h = nowTime.getHours();
  let m = nowTime.getMinutes();
  let s = nowTime.getSeconds();
  return {
    h,m,s
  }
}
export{
  getYearMonthDay,
  wantDate,
  getCruendTimeInfo
}