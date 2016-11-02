;$(function($){
	var $datalist = $('.dataList');
	var index = 0;
	//读取本地存储
	var arr = localStorage.getItem('shoppingCar');
	arr = arr ? JSON.parse(arr) : [];
	//创建购物车
	for(var i=0;i<arr.length;i++){
		//创建li
		var li = $('<li/>');
		//复选框
		var choice = $('<div/>').addClass('choice col-xs-1');
		$('<input type="checkbox" class="che" />').appendTo(choice);
		$('<span/>').appendTo(choice);
		li.append(choice);
		
		//商品图片
		var img = $('<div/>').addClass('goods col-xs-2');
		$('<img/>').attr('src',arr[i].img).appendTo(img);
		img.appendTo(li);
		
		//商品标题和价格
		var info = $('<div/>').addClass('info col-xs-5');
		var title = $('<div/>').addClass('title');
		$('<p/>').html(arr[i].title).appendTo(title);
		$('<span/>').html(arr[i].price).appendTo(title);
		title.appendTo(info);
		info.appendTo(li);
		
		//数量
		var num = $('<div/>').addClass('num col-xs-3');
		$('<input type="button" value="-" class="cut" />').appendTo(num);
		$('<input type="text" value="1" class="count" />').appendTo(num);
		$('<input type="button" value="+" class="add" />').appendTo(num);
		num.appendTo(li);
		
		//删除
		$('<span/>').addClass('glyphicon glyphicon-trash del col-xs-1').appendTo(li);
		
		//将li追加到购物车列表中
		li.appendTo($datalist);
	}
	//商品选择
	var $all = $(".allPick .che");
	var $checkbox = $('.che','.choice').not(".allPick .che");
	//全选
	$all.singleTap(function(){
		$checkbox.prop("checked",$all.prop("checked"));
		$('.che','.choice').filter(":checked").siblings('span').addClass('pic');
		$('.che','.choice').not(":checked").siblings('span').removeClass('pic');
		total();
	});
	//单选
	$checkbox.singleTap(function(){
		var $checked = $checkbox.filter(":checked");
		$all.prop("checked",$checkbox.length == $checked.length);
		$('.che','.choice').filter(":checked").siblings('span').addClass('pic');
		$('.che','.choice').not(":checked").siblings('span').removeClass('pic');
		total();
		
	});
	//数量减少
	$datalist.on('singleTap','.cut',function(){
		var $count = $(this).siblings('.count').val();
		var $che = $(this).closest('li').find('.che');
		if($count == 1){
			$(this).siblings('.count').val(1);
			//禁选按钮
//			$('.cut').attr({'disabled':'disabled'});
		}else{
			$(this).siblings('.count').val(--$count);
		}
		if($che.prop('checked')){
			total();
		}
		local();
	});
	//数量增加
	$datalist.on('singleTap','.add',function(){
		var $count = $(this).siblings('.count').val();
		var $che = $(this).closest('li').find('.che');
		$(this).siblings('.count').val(++$count);
		if($che.prop('checked')){
			total();
		}
		local();
	});
	//更改本地存储
	function local(){
		arr = JSON.parse(localStorage.getItem('shopping'));
		for(var i in arr){  //遍历localStorage数组更改商品数量
			if(arr[i].title == $(this).closest('li').find('.title').html()){
				arr[i].count = $count;
				localStorage.setItem('shopping',JSON.stringify(arr));
			}
		}
	}
	//删除
	$datalist.on('singleTap','.del',function(){
		var $count = $(this).closest('li').find('.price i').html()*$(this).closest('li').find('.count').val();
		$(this).closest('li').remove();
		var $total=$('span','.pay').html() - $count;
		$('span','.pay').html($total);
		//更改本地存储
		arr = JSON.parse(localStorage.getItem('shopping'));
		for(var i in arr){  //遍历localStorage数组更改商品数量
			if(arr[i].title == $(this).closest('li').find('.title').html()){
				arr.splice(i,1);
				localStorage.setItem('shopping',JSON.stringify(arr));
			}
		}
	});
	//计算价格
	function total(){
		var $total=0;
		$checkbox.each(function(){
			var $li = $(this).closest('li');
			if(this.checked){
				$total += $li.find('.price i').html()*$li.find('.count').val();
			}
		});
		$('span','.pay').html($total);
	}
	//确认支付
	$('.pay').singleTap(function(){
		alert('对不起，系统正在维护！');
	});
	//支付方式
	$('.payMethod').singleTap(function(){
		$('.payment').show();
	});
	
	//关闭支付方式
	$('.payment').on('singleTap','.del span',function(){
		$(this).closest('.payment').hide();
	});
});
