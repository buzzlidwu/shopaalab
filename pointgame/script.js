var score = 0
function updatescore(){
	$(".score").text("SCORE :"+ score)
}
$("[class^='cir']").click(function(){
	var num = $(this).attr("data-label")
	console.log(num)
	var total = score += parseInt(num*10)
	updatescore()
})

$(window).keydown(function(evt){
	console.log(evt.key)
	var ct = evt.key
	if(ct=="r"){
		score = 0
		updatescore()
	}
	if(ct == "c"){
		$(".pointgame").toggleClass("moving")
	}
})
$(window).mousemove(function(evt){
	$(".pos").text("X"+evt.pageX+",Y"+evt.pageY)
	
	$(".mouse")
		.css("left",evt.pageX+"px")
		.css("top",evt.pageY+"px")
})

$(".pointgame").click(function(evt){
	var spot = $("<div class=spot></div>")
	$(spot)
		.css("left",evt.pageX-$(this).offset().left+"px")
		.css("top",evt.pageY-$(this).offset().top+"px")
	
		$(this).append(spot)
	
})