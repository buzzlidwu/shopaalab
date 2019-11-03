const range = (key,index)=>{
  let arr = Array.from({length:index},(v,k)=>{
    let obj = {
      todo:[],
      day: k + key
    }
    return obj
  })
  return arr
}
const now_date = new Date()
let todolist = {}
window.onload = ()=>{
  localGET()
  let now_year = now_date.getFullYear()
  todolist[now_year] = [...Array(12)]
  console.log(todolist)
  console.log(createMMDD(2019,11))
}
function createMMDD(yy,mm){
  let frist_day = new Date(yy,mm-1,1).getDay()
  let last_day = new Date(yy,mm-1,0).getDate()
  let day_len = new Date(yy,mm ,0).getDate()
  return [...range(last_day - frist_day + 1, frist_day ),...range(1,day_len),...range(1,43  - (last_day + frist_day))]
}
function localGET(){
  if( localStorage.getItem('_my_todolist') ) {
    todolist = localStorage.getItem('_my_todolist') 
  }else{
    todolist = new Object()
  }
}
function saveLocal(item){
  if(localStorage.getItem('_my_todolist')){

  }
  localStorage.setItem('_my_todolist',item)
}
// function nowMonth(first_dayinMonth,perMonth,last_day){ 
//   console.log(first_dayinMonth,perMonth,last_day);
  
//   let nowMonth = [...Array(35).keys()]
//   let sec = 1
//   let trd = 1
//   let htmlcode = ''
//   for(let i = 0; i < 35 ; i++){
    
//     if(first_dayinMonth > 0){
      
//       nowMonth[i] = perMonth - first_dayinMonth + 1
//       first_dayinMonth--
//       continue
//     }
//     if(sec <= last_day){
//       nowMonth[i] = sec
//       sec++
//       continue
//     }
//     nowMonth[i] = trd
//     trd++
//   }
  
//   for(let i in nowMonth){
//     if(i % 7 == 0){
//       htmlcode += `<tr>`
//     }
//     htmlcode+= `<td>${nowMonth[i]}</td>`
//   }
//   // console.log(htmlcode);
  
//   $('#table_body').html(htmlcode)
// }