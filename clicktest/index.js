let mousedown = 0;
let clicktime = 0;
let clicktimev2 = 0;
var flag = false;
const point = document.getElementById("user_click");
let setTime = null
$(()=>{
  const point = document.getElementById("user_click");
  point.addEventListener(
    "mousedown",
    function(event) {
      return downGetTime("mousedown  ", event);
    },
    false
  );
  point.addEventListener(
    "mouseup",
    function(event) {
      return logIt("mouseup    ", event);
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
})


function logIt(event, e) {
  clearInterval(setTime)
  flag = true
  console.log(clicktimev2);
  clicktimev2 = 0
  // if(event)return console.log(new Date().getTime()-mousedown,'click');
  // return console.log(new Date().getTime()-mousedown,'mouse down');
}
function downGetTime() {
  mousedown = new Date().getTime();
  setTime = setInterval(() => {
    clicktimev2++
  }, 1);
}
