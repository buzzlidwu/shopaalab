function MathBMI() {
  const bmi_text = this.GetElement('bmi_text');
  const weight_input = this.GetElement('weight_input');
  const height_input = this.GetElement('height_input');
  if (weight_input.value == '' || height_input.value == '') {
    return alert('身高或體重為空 請確認輸入');
  }
  let bmi = weight_input.value / Math.pow(height_input.value / 100, 2);
  bmi_text.innerText = `你的BMI為: ${bmi}`;
}
function GetElement(id) {
  return document.getElementById(id);
}