window.onload = function(){
	const send_btn = this.GetElement('send_btn')
	const check_btn = this.GetElement('check_btn')
	check_btn.addEventListener('onclick',()=>{this.check_status(check_btn,send_btn)})
}
function check_status(check,send){
	if(check.checked){
		send.disabled = ""
	}
	else{
		send.disabled = "disabled"
	}
}
function GetElement(id){
	return document.getElementById(id)
}