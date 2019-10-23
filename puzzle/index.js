let hidden = 0;
let Suffle_times = 3;
let puzzle_array = [...Array(9).keys()];

$(document).ready(() => {
  makerHtml();
  setTimeout(() => {
    Suffle();
  }, 500);
});
function makerHtml() {
  let table = $(".table");
  let template = "";
  for (let i = 0; i < 9; i++) {
    if (puzzle_array[i] == 0) {
      template = `<div class="box" data-order='${i}'></div>`;
    } else {
      template = `<div class="box" data-order='${i}'>${puzzle_array[i]}</div>`;
    }
    table.append(template);
  }
}

function Suffle() {
  puzzle_array.sort(() => (Math.random() > 0.5 ? 1 : -1));
  let cnt = 0;
  for (i = 0; i < 8; i++)
    for (j = i + 1; j < 9; j++) {
      if (puzzle_array[i] > puzzle_array[j] && puzzle_array[j] != 0) cnt++;
    }

  if (cnt % 2) {
    randomItem(puzzle_array)
    return setTimeout(() => {
      Suffle();
    }, 500);
  } else {
    randomItem(puzzle_array);
    $(".box").click(function() {
      let data = $(this).data('order')
      
      checkMove(data,puzzle_array)

    });
  }
}
function checkMove(data,array){
  hidden = array.indexOf(0);
  if(hidden == data) return
  const arr = [2,3,5,6,8]
  const check = arr.indexOf(hidden)
  let value  = hidden - data;
  //2 3 5 6 8
  if(check != -1){
    if(value == -3 || value == 3){
      [puzzle_array[hidden],puzzle_array[data]] = [puzzle_array[data],puzzle_array[hidden]]
      return randomItem(puzzle_array)
    }
    if(value == -2 || value == 2) return
    if(Math.floor(data/3) == Math.floor(hidden/3)){
      [puzzle_array[hidden],puzzle_array[data]] = [puzzle_array[data],puzzle_array[hidden]]
      return randomItem(puzzle_array)
    }
    
    if(value > -3 || value < 3){
      if(value == 1 || value == -1){
        if(Math.floor(data/3) == Math.floor(hidden/3)){
          [puzzle_array[hidden],puzzle_array[data]] = [puzzle_array[data],puzzle_array[hidden]]
          return randomItem(puzzle_array)
        }
      }
    }
  }else{
    if(value != -1 && value != 1 && value != -3 && value != 3) return 
    [puzzle_array[hidden],puzzle_array[data]] = [puzzle_array[data],puzzle_array[hidden]]
    return randomItem(puzzle_array)
  }
}
function randomItem(array){
  let boxs = document.getElementsByClassName("box");
    for (let box in boxs) {
      if (box == "length") break;
      boxs[box].setAttribute("data-order",box);
      boxs[box].innerText = array[box];
    }
}
