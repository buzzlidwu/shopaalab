const range = (key,index,color)=>{
  let arr = Array.from({length:index},(v,k)=>{
    let obj = {
      todo:[],
      day: k + key,
      color: color
    }
    return obj
  })
  return arr
}
const now_date = new Date()
let now_year = now_date.getFullYear()
let now_month = now_date.getMonth()
let todolist = {}
window.onload = ()=>{
  checkStatus()
  $('#year_status').text(`${now_year}年`)
  $('#month_status').text(`${now_month + 1}月`)
}

$('#change_mm_right').click(()=>{
  console.log(now_month);
  
  if(now_month == 11){
    now_month = 0
    now_year++
  }else{
    now_month++
  }
  changeView()
  console.log(todolist);
})
$('#change_mm_left').click(()=>{
  if(now_month == 0){
    now_month = 11
    now_year--
  }else{
    now_month--
  }
  changeView()
  console.log(todolist);
  
})
function changeView(){
  $('#year_status').text(`${now_year}年`)
  $('#month_status').text(`${now_month + 1}月`)
  changeData(now_year,now_month)
}
function changeData(yy,mm){
  if(!todolist[yy] || !todolist[yy][mm]){
    MakeData(yy,mm)
  }
  createHTML(todolist[yy][mm])
}
function MakeData(yy,mm){
  if(!todolist[yy]){
    todolist[yy] = [...Array(12)]
  }
  todolist[yy][mm] = createMMDD(yy,mm)
  createHTML(todolist[yy][mm])
  saveLocal(JSON.stringify(todolist))
}
//start check data
function checkStatus(){
  localGET()
  changeData(now_year,now_month)
}
function createMMDD(yy,mm){
  let first_day = new Date(yy,mm,1).getDay()
  let last_day = new Date(yy,mm,0).getDate()
  let day_len = new Date(yy,mm+1,0).getDate()
  
  return [...range(last_day - first_day + 1, first_day,'#333333' ),...range(1,day_len,'red'),...range(1,42  - (day_len + first_day),'#333333')]
}
function localGET(){
  if( localStorage.getItem('_my_todolist') ) {
    let data = localStorage.getItem('_my_todolist') 
    todolist = JSON.parse(data)
  }
}
function saveLocal(obj){
  localStorage.setItem(`_my_todolist`,obj)
}

function createHTML(arr){ 
  todolist[2019][10][0].todo = [1,2,3]
  let htmlcode = ''
  for(let i in arr){
    if(i % 7 == 0){
      htmlcode += `<tr>`
    }
    htmlcode+= `<td class='table_days'data-order=${i}>
    <span class='day_font' style='color:${arr[i].color}'>${arr[i].day}</span>` 

    for(let j of arr[i].todo){
      htmlcode+= `<li class='todo_item'>${j}</li>`
    }
    htmlcode+= `</td>`
  }
  $('#table_body').html(htmlcode)
  $('#table_body td').click(function(){
    $this = $(this)
  })
}