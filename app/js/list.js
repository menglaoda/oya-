$(function(){
	
	var allList = $('.list-brand li');
	var listRight = $('.rightt');
	console.log(listRight)
	
	// 点击显示对应的rightt
	allList.click(function(){
		var index=$(this).index();
		console.log(index)
		$(this).addClass('active').siblings().removeClass('active');
		listRight.eq(index).css('zIndex','100').siblings().css('zIndex','1');
	})
	

})