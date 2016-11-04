;$(function($){
	
	var $ziliao = $('#ziliao');
	
	var mydata = localStorage.getItem('data');
	
	console.log(mydata);
	if(mydata){
		$ziliao.html('我的资料');
	}else{
		$ziliao.html('完善资料');
	}
});
