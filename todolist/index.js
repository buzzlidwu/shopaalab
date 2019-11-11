const range = (key, index, color, status) => {
  let arr = Array.from({ length: index }, (v, k) => {
    let obj = {
      todo: [],
      day: k + key,
      color: color,
      side: status
    };
    return obj;
  });
  return arr;
};
const now_date = new Date();
let now_year = now_date.getFullYear();
let now_month = now_date.getMonth();
let todolist = {};
let add_tag = [0, 0];

window.onload = () => {
  checkStatus();
  $("#year_status").text(`${now_year}年`);
  $("#month_status").text(`${now_month + 1}月`);
};

$("#change_mm_right").click(() => {
  if (now_month == 11) {
    now_month = 0;
    now_year++;
  } else {
    now_month++;
  }
  changeView();
});

$("#change_mm_left").click(() => {
  if (now_month == 0) {
    now_month = 11;
    now_year--;
  } else {
    now_month--;
  }
  changeView();
});

$("#add_todo").click(() => {
  let [month, id] = add_tag;
  let text = $("#todo_input").val();
  if (text == "") return alert("新增代辦不能為空");
  todolist[now_year][month][id].todo.push(text);
  saveLocal(JSON.stringify(todolist));
  createHTML(todolist[now_year][now_month]);
  $("#show_form").css("display", "none");
});

$("#close_todo").click(() => {
  $("#show_form").css("display", "none");
});

function changeView() {
  $("#year_status").text(`${now_year}年`);
  $("#month_status").text(`${now_month + 1}月`);
  changeData(now_year, now_month);
}

function changeData(yy, mm) {
  if (!todolist[yy] || !todolist[yy][mm]) {
    MakeData(yy, mm);
  }
  createHTML(todolist[yy][mm]);
}

function MakeData(yy, mm) {
  if (!todolist[yy]) {
    todolist[yy] = [...Array(12)];
  }
  todolist[yy][mm] = createMMDD(yy, mm);
  createHTML(todolist[yy][mm]);
  saveLocal(JSON.stringify(todolist));
}

function checkStatus() {
  localGET();
  changeData(now_year, now_month);
}

function createMMDD(yy, mm) {
  let first_day = new Date(yy, mm, 1).getDay();
  let last_day = new Date(yy, mm, 0).getDate();
  let day_len = new Date(yy, mm + 1, 0).getDate();

  return [
    ...range(last_day - first_day + 1, first_day, "#333333", "per"),
    ...range(1, day_len, "red", "now"),
    ...range(1, 42 - (day_len + first_day), "#333333", "next")
  ];
}
function localGET() {
  if (localStorage.getItem("_my_todolist")) {
    let data = localStorage.getItem("_my_todolist");
    todolist = JSON.parse(data);
  }
}
function saveLocal(obj) {
  localStorage.setItem(`_my_todolist`, obj);
}

function createHTML(arr) {
  let htmlcode = "";
  for (let i in arr) {
    htmlcode += `<div class='todo_context' data-order=${i}>
    <div class='day_font' style='color:${arr[i].color}'>${arr[i].day}</div>`;

    for (let j of arr[i].todo) {
      htmlcode += `<li class='todo_item'>${j}</li>`;
    }
    htmlcode += `</div>`;
  }
  $("#js_install_todo").html(htmlcode);
  $("#js_install_todo div").dblclick(function() {
    showTable($(this).data("order"));
  });
}

async function showTable(id) {
  add_tag = [now_month, id];
  let data = await todolist[now_year][now_month][id];
  let month = now_month;
  if (data.side == "now") {
    month++;
  } else if (data.side == "next") {
    month += 2;
  }
  let date = `${now_year} / ${month} / ${data.day}`;
  let todo = data.todo;

  $("#data_bar").text(`選擇日期為 ： ${date}`);
  if (todo.length > 0) {
    createTodoView(todo, id);
  }
  $("#todo_input").val("");
  $("#show_form").css("display", "flex");
}

function createTodoView(todo, id) {
  let htmlcode = "";
  if (todo.length > 0) {
    for (let i in todo) {
      if (i)
        htmlcode += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
      ${todo[i]}
        <span class="badge badge-primary badge-pill" data-index='[${id},${i}]'>X</span>
      </li>`;
    }
  }
  $("#todo_list").html(htmlcode);
  $("#todo_list li span").dblclick(function() {
    let data_pos = $(this).data("index");
    let [index, item] = data_pos;
    todolist[now_year][now_month][index].todo.splice(item, 1);
    saveLocal(JSON.stringify(todolist));
    createTodoView(todolist[now_year][now_month][index].todo, add_tag[1]);
    createHTML(todolist[now_year][now_month]);
  });
}
