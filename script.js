let flag = true
let status_array = [[0,0,0],[0,0,0],[0,0,0]]
function install_start(){
	status_array = [[0,0,0],[0,0,0],[0,0,0]]
	const item  = document.getElementById("ooxx")
	item.innerHTML = `<tbody>`
	let htmlcode = ''
	var row = 0
	for(let i = 0 ; i < 9 ;i ++){
		if(i % 3 == 0){
			htmlcode += '<tr>'
		}
		let col = i % 3
		let th = `<th id='${i}' class='box' onclick='button_click(${row},${col},document.getElementById(${i}))'></th>`
		htmlcode += th
		if((i+1) % 3 == 0 ){
			htmlcode += `</tr>`
			row++
		}
	}
	item.innerHTML = `<tbody> ${htmlcode} </tbody>`
};
function button_click(row,col,item){
	if(item.innerText == ""){
		status_array[row][col] = flag ? 3 : 4;
		item.innerText = flag? "O" : "X";
		flag = !flag;
	}
	setTimeout(()=>{this.check_win(status_array)},500)
}
function check_win(array){
	for(let item of array){
		if(item.length < 3) break;
		let value = item[0]+item[1]+item[2]
		if(value == 9){
			console.log('O win')
			alert("O win")
			this.install_start()
		}
		if(value == 12){
			console.log("X win")
			alert("X WIN")
			this.install_start()
		}
	}
	const check_1 = array[0][1] + array[1][1] + array[2][1]
	const check_2 = array[0][2] + array[1][2] + array[2][2]
	const check_3 = array[0][0] + array[1][1] + array[2][2]
	const check_4 = array[0][2] + array[1][1] + array[2][0]
	if(check_1 == 9 || check_1 == 12){
		let ans = check_1 == 9 ? "O" : "X"
		console.log(ans ,"win")
		alert(`${ans} "win"`)
		this.install_start()
	}
	if(check_2 == 9 || check_2 == 12){
		let ans = check_2 == 9 ? "O" : "X"
		console.log(ans ,"win")
		alert(`${ans} "win"`)
		this.install_start()
	}
	if(check_3 == 9 || check_3 == 12){
		let ans = check_3 == 9 ? "O" : "X"
		console.log(ans ,"win")
		alert(`${ans} "win"`)
		this.install_start()
	}
	if(check_4 == 9 || check_4 == 12){
		let ans = check_4 == 9 ? "O" : "X"
		console.log(ans ,"win")
		alert(`${ans} "win"`)
		this.install_start()
	}
}