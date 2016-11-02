;$(function($){
	var $datalist = $('.dataList');
	var index = 0;
	//读取本地存储
	var arr = localStorage.getItem('shoppingCar');
	arr = arr ? JSON.parse(arr) : [];
	//商品选择
	var $all = $(".allPick .che");
	var $checkbox = $('.che','.choice').not(".allPick .che");
	
	$all.singleTap(function(){
		$checkbox.prop("checked",$all.prop("checked"));
		$('.che','.choice').filter(":checked").siblings('span').addClass('pic');
		$('.che','.choice').not(":checked").siblings('span').removeClass('pic');
	});
	
	
	$checkbox.singleTap(function(){
		var $checked = $checkbox.filter(":checked");
		$all.prop("checked",$checkbox.length == $checked.length);
		$('.che','.choice').filter(":checked").siblings('span').addClass('pic');
		$('.che','.choice').not(":checked").siblings('span').removeClass('pic');
		
	});
	var $count = $('.count').val();
	//数量减少
	$('.cut').on('singleTap',function(){
		if($count == 1){
			$('.count').val(1);
			//禁选按钮
//			$('.cut').attr({'disabled':'disabled'});
		}else{
			$('.count').val(--$count);
		}
	});
	//数量增加
	$('.add').on('singleTap',function(){
		$('.count').val(++$count);
	});
	//删除
	$('.del').on('singleTap',function(){
		$(this).closest('li').remove();
	});
	
});
