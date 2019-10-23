const today = new Date()
let year = today.getFullYear()
let month = today.getMonth()
let first_day = new Date(year,month,1)
let perMonth = new Date(year,month,0).getDate()
let next_month = new Date(year,month+1,1)
let last_day = new Date(next_month -1).getDate()
let first_dayinMonth = first_day.getDay()
// let perm_lastday = new Date(first_day - 1).getDate()
// let curMonthDays = new Date(year,month,0).getDate();
// console.log(first_day,'first');
// console.log(perMonth,'perMonth');
// console.log(next_month,'next_month');
// console.log(last_day,'last_day');
// console.log(first_dayinMonth,'first_dayinMonth');

$(document).ready(()=>{
  nowMonth(first_dayinMonth,perMonth,last_day)
})
function nowMonth(first_dayinMonth,perMonth,last_day){ 
  console.log(first_dayinMonth,perMonth,last_day);
  
  let nowMonth = [...Array(35).keys()]
  let sec = 1
  let trd = 1
  let htmlcode = ''
  for(let i = 0; i < 35 ; i++){
    
    if(first_dayinMonth > 0){
      
      nowMonth[i] = perMonth - first_dayinMonth + 1
      first_dayinMonth--
      continue
    }
    if(sec <= last_day){
      nowMonth[i] = sec
      sec++
      continue
    }
    nowMonth[i] = trd
    trd++
  }
  
  for(let i in nowMonth){
    if(i % 7 == 0){
      htmlcode += `<tr>`
    }
    htmlcode+= `<td>${nowMonth[i]}</td>`
  }
  console.log(htmlcode);
  
  $('#table_body').html(htmlcode)
}