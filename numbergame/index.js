let ans_arr = []
let user_input = []
let ans_label = $('#guessResults')
let user_input_label =$('#userGuess')
$(()=>{
  //defalut world
  btnStatus(false,true)
})
$('#start').click(function(){
  //check btn status
  if($(this).attr('disabled')) return
  //close start btn and open restart & cheat btn
  btnStatus(true,false)
  gameStrat()
})
$('#restart').click(function(){
  //check btn status
  if($(this).attr('disabled')) return
  //close restart & cheat  btn and open start btn
  btnStatus(false,true)
})
$('#cheat').click(function(){
  //check btn status
  if($(this).attr('disabled')) return
  let [a,b,c,d] = ans_arr
  alert(`${a}${b}${c}${d}`)
})
$('#guess').click(function(){
  //check btn status
  if($(this).attr('disabled')) return
  //check user input has str
  if(isNaN(user_input_label.val())) return alert('輸入的數字中包含文字!請重新輸入')
  //group input to Set
  let user_input = new Set($('#userGuess').val().toString().split(''))
  //check group size
  if(user_input.size != 4) return alert('請輸入四位不同數字!')
  let intersectionSet = new Set(ans_arr.filter(x => user_input.has(x.toString())));
  let ans = checkAns(ans_arr,[...user_input],[...intersectionSet])
  labelAdd(ans)
  user_input_label.val('')
})
function btnStatus(start,reset){
  let [c1,c2] = start ?  ['#adadad','#ffffff'] : ['#ffffff','#adadad']
  $('#start')
    .attr('disabled',start)
    .css('backgroundColor',c1)
  $('#restart')
    .attr('disabled',reset)
    .css('backgroundColor',c2)
  $('#cheat')
    .attr('disabled',reset)
    .css('backgroundColor',c2)
  $('#guess')
    .attr('disabled',reset)
    .css('backgroundColor',c2)
}
function labelAdd(ans){
  let [a,b] = ans
  let template = ''
  if(a==4){
    template = `
    <li class="list-group-item">
      <span class="label label-success">4A0B</span>
    </li>
    `

    setTimeout(()=>{
      alert('恭喜您已成功解出答案! 遊戲準備重製!')
      btnColor('#start',false)
      btnColor('#restart',true)
      btnColor('#cheat',true)
      btnColor('#guess',true)
      ans_label.html('')
    },1000)
  }else{
    template = `
    <li class="list-group-item">
      <span class="label label-danger">${a}A${b}B</span>
    </li>
    `
  }
  ans_label.append(template)
}
function checkAns(ans,user,intersection){
  let a = 0
  let b = intersection.length
  for(let i of intersection){
    if(ans.indexOf(i) == user.indexOf(i)){
      a++
      b--
    }
  }
  return [a,b]
}
function gameStrat(){
  ans_arr = []
  let random_list = [...Array(10).keys()]
  for(let i = 0 ; i < 4 ;i++){
    let index = Math.floor(Math.random() * random_list.length)
    ans_arr.push(random_list.splice(index,1)[0].toString())
  }
}