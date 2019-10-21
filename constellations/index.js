$(() => {
  setLanguage();
  $("#userGuess").on("hide.datepicker", function() {
    getConstellationsIndex($(this).datepicker("getDate", true));
  });
});
async function getConstellationsIndex(date) {
  //格式化日期
  let [yy, mm, dd] = date.split("/");
  let math_number = [yy, mm, dd].join("");
  //只取月日
  let mmdd = Number(mm + dd);
  let constellations = getConstellations(mmdd);
  let ans = 0;
  for (let i of math_number) {
    ans += Number(i);
  }
  ans = ans.toString();
  ans = eval(`${ans[0]} + ${ans[1]}`);
  ans = ans >= 10 ? 0 : ans - 1;

  let api = await callApi(constellations);

  showToWeb(api, ans, date);
}
async function callApi(constellation) {
  const url = `https://buildschoolnumerology.azurewebsites.net/api/Number/Numerology?constellation=${constellation}`;
  let res = {};
  let callapi = await fetch(url);
  res = await callapi.json();

  return res;
}
function showToWeb(resjson, index, date) {
  let template = `
  <div class='list-group-item'>
    <span style='background-color:Aqua'>${date.replace(
      /\//g,
      "-"
    )}</span> 出生的你 星座是${resjson.name}
    <button type="button" class="close">&times;</button>
    <br>
    你的生命靈數: [${index + 1}] : ${resjson.lookup[index]}
  </div>
  `;
  $(".result").html(template);
}
function getConstellations(date) {
  let constellations = "";
  switch (parseInt(date / 100)) {
    case 1:
      constellations = date > 120 ? "aquarius" : "capricorn";
      break;
    case 2:
      constellations = date > 219 ? "pisces" : "capricorn";
      break;
    case 3:
      constellations = date > 321 ? "aries" : "pisces";
      break;
    case 4:
      constellations = date > 421 ? "taurus" : "aries";
      break;
    case 5:
      constellations = date > 521 ? "gemini" : "taurus";
      break;
    case 6:
      constellations = date > 622 ? "cancer" : "gemini";
      break;
    case 7:
      constellations = date > 723 ? "leo" : "cancer";
      break;
    case 8:
      constellations = date > 823 ? "virgo" : "leo";
      break;
    case 9:
      constellations = date > 923 ? "libra" : "virgo";
      break;
    case 10:
      constellations = date > 1024 ? "scorpio" : "libra";
      break;
    case 11:
      constellations = date > 1123 ? "sagittarius" : "scorpio";
      break;
    case 12:
      constellations = date > 1222 ? "capricorn" : "sagittarius";
      break;
  }
  return constellations;
}
function setLanguage() {
  $.fn.datepicker.languages["zh-CN"] = {
    format: "yyyy/mm/dd",
    daysMin: ["日", "一", "二", "三", "四", "五", "六"],
    monthsShort: [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月"
    ],
    weekStart: 1,
    startView: 2,
    yearFirst: true,
    yearSuffix: "年",
    autoHide: true
  };
  $("#userGuess").datepicker({
    language: "zh-CN"
  });
}
