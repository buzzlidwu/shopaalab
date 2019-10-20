let ans_arr = []
let user_input = []
let ans_label = $('#guessResults')
let user_input_label =$('#userGuess')
// let random_list = [...Array(10).keys()]

$(()=>{

  // input = 3568
  // ans = createSet(1249)
  // let toArr = new Set(input.toString().split(''))
  // let intersectionSet = new Set([...ans].filter(x => toArr.has(x.toString())));

  // checkAns([...ans],[...toArr],[...intersectionSet])
})
$('#start').click(function(){
  //check btn status
  if($(this).attr('disabled')) return
  //close start btn and open restart & cheat btn
  $(this)
    .attr('disabled',true)
    .css('backgroundColor','#adadad')
  $('#restart')
    .attr('disabled',false)
    .css('backgroundColor','#ffffff')
  $('#cheat')
    .attr('disabled',false)
    .css('backgroundColor','#ffffff')
  gameStrat()
})
$('#restart').click(function(){
  //check btn status
  if($(this).attr('disabled')) return
  //close restart & cheat  btn and open start btn
  $(this)
    .attr('disabled',true)
    .css('backgroundColor','#adadad')
  $('#start')
    .attr('disabled',false)
    .css('backgroundColor','#ffffff')
  $('#cheat')
    .attr('disabled',true)
    .css('backgroundColor','#adadad')
})
$('#cheat').click(function(){
  //check btn status
  if($(this).attr('disabled')) return
  let [a,b,c,d] = ans_arr
  alert(`${a}${b}${c}${d}`)
})
$('#guess').click(()=>{
  if(isNaN(user_input_label.val())) return alert('輸入的數字中包含文字!請重新輸入')
  let user_input = new Set($('#userGuess').val().toString().split(''))
  if(user_input.size != 4) return alert('請輸入四位不同數字!')
  let intersectionSet = new Set(ans_arr.filter(x => user_input.has(x.toString())));
  let ans = checkAns(ans_arr,[...user_input],[...intersectionSet])
  labelAdd(ans)
  user_input_label.val('')
})
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
      $('#restart')
        .attr('disabled',true)
        .css('backgroundColor','#adadad')
      $('#start')
        .attr('disabled',false)
        .css('backgroundColor','#ffffff')
      $('#cheat')
        .attr('disabled',true)
        .css('backgroundColor','#adadad')
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