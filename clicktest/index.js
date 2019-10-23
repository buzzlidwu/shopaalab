let mousedown = 0;
let clicktime = 0;
let clicktimev2 = 0;
var flag = false;
let avg_ms = []
let setTime = null;
$(() => {
  const point = document.getElementById("user_click");
  point.addEventListener(
    "mousedown",
    function(event) {
      return downGetTime("mousedown", event);
    },
    false
  );
  point.addEventListener(
    "click",
    function(event) {
      return logIt(0, event);
    },
    false
  );
  $('#show_table').click(()=>{
    avg()
  })
});

function logIt(event, e) {
  clearInterval(setTime);
  console.log(clicktimev2);
  avg_ms.push(clicktimev2)
  clicktimev2 = 0;
  
}
function avg(){
  console.log('start');
  
  let j = 0
  for(let i in avg_ms){
    j+=avg_ms[i]
  }
  $('#show_table').text(j/avg_ms.length)
}
function downGetTime() {
  mousedown = new Date().getTime();
  setTime = setInterval(() => {
    clicktimev2++;
  }, 1);
}
