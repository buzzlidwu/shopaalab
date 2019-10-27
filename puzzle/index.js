let Suffle_times = 0;
let step = 20;
let start_status = false
let index_temp = 0;
const puzzle_array = [...Array(9).keys()];
let ansArr = [];
const run_rule = {
  0: [1, 3],
  1: [1, -1, 3],
  2: [-1, 3],
  3: [1, 3, -3],
  4: [1, -1, 3, -3],
  5: [-1, 3, -3],
  6: [1, -3],
  7: [1, -1, -3],
  8: [-1, -3]
};

$(document).ready(() => {
  makerHtml();
});
$('#start_btn').click(function(){
  if(start_status) return
  let user_input = $('#step_size').val()
  console.log(parseFloat(user_input));
  
  step = parseFloat(user_input).toString() == 'NaN' ? 20 : parseFloat(user_input)
  console.log(step);
  
  createTopic(step)
  $(this).attr('disabled',true)
  $('#goback_btn').attr('disabled',false)
})
$('#goback_btn').click(function(){
  let i = ansArr.length
  const change = ()=>{
    let move = index_temp + -[ansArr[i]];
    [ puzzle_array[index_temp] , puzzle_array[move] ] = [ puzzle_array[move] , puzzle_array[index_temp] ]
    index_temp = move
    randomItem(puzzle_array)
    i--
    if(i>=0){
      setTimeout(()=>change(i),100)
    }
    else{
      Suffle_times = 0;
      step = 20;
      index_temp = 0;
      start_status = false
      ansArr = []
    }
  }
  change()
  $(this).attr('disabled',true)
  $('#start_btn').attr('disabled',false)
})

function createTopic(step) {
  
  if(step > 10000000) step = 10000000
  let step_ms = $('#step_speed').val()
  
  step_ms = parseFloat(step_ms).toString() == 'NaN' ? 50 : parseFloat(step_ms)

  let ans = [...Array(step)];
  let index = 0;
  for (let i in ans) {
    let rule = run_rule[index];
    let set = rule.length;
    let randomAns = Math.floor(Math.random() * set);
    ans[i] = rule[randomAns];
    index += rule[randomAns];
  }
  
  ansArr = ans;
  Suffle(step_ms);
  $(".box").click(function() {
    let data = $(this).data("order");
    checkMove(data, puzzle_array);
  });
}

function makerHtml() {
  let table = $(".table");
  let template = "";
  for (let i = 0; i < 9; i++) {
    template = `<div class="box" data-order='${i}' style='background-image:url("./style/p${i +
      1}.jpg")'></div>`;
    table.append(template);
  }
}

function Suffle(ms) {
  let change_index = index_temp + ansArr[Suffle_times];
  [puzzle_array[index_temp], puzzle_array[change_index]] = [
    puzzle_array[change_index],
    puzzle_array[index_temp]
  ];
  index_temp = change_index;
  Suffle_times++;
  randomItem(puzzle_array);
  
  if (Suffle_times < step) {
    setTimeout(() => {
      Suffle(ms);
    }, ms);
  }
}
function checkMove(ans) {

  let hidden = puzzle_array.indexOf(0);
  if (ans ==  hidden) return;
  let move_item = ans - hidden;
  let rule = run_rule[hidden].indexOf(move_item);
  if (rule == -1) return;
  [puzzle_array[hidden],puzzle_array[ans]] = [puzzle_array[ans],puzzle_array[hidden]]
  randomItem(puzzle_array)
}
function randomItem(array) {
  let boxs = document.getElementsByClassName("box");
  for (let box in boxs) {
    if (box == "length") break;
    boxs[box].setAttribute("data-ans", array[box]);

    if (array[box] != 0) {
      boxs[box].style.backgroundImage = `url("./style/p${array[box] + 1}.jpg")`;
      
    } else {
      boxs[box].style.backgroundImage = ``;
    }
  }
}
