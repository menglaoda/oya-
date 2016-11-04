;$(function($){
	var $datalist = $('.dataList');
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
		$a = $('<a/>').attr('href','goods.html');
		$('<img/>').attr('src',arr[i].img).appendTo($a);
		$a.appendTo(img);
		img.appendTo(li);
		
		//商品标题和价格
		var info = $('<div/>').addClass('info col-xs-5');
		var title = $('<div/>').addClass('title');
		$('<p/>').html(arr[i].title).appendTo(title);
		$('<span/>').addClass('price').html('&yen;<i>'+arr[i].price+'</i>').appendTo(title);
		title.appendTo(info);
		info.appendTo(li);
		
		//数量
		var num = $('<div/>').addClass('num col-xs-3');
		$('<input type="button" value="-" class="cut" />').appendTo(num);
		$('<input type="text" value='+arr[i].count+' />').addClass('count').appendTo(num);
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
		var $title = $(this).closest('li').find('.title p').html();
		local($title,$count);
	});
	//数量增加
	$datalist.on('singleTap','.add',function(){
		var $count = $(this).siblings('.count').val();
		var $che = $(this).closest('li').find('.che');
		$(this).siblings('.count').val(++$count);
		if($che.prop('checked')){
			total();
		}
		var $title = $(this).closest('li').find('.title p').html();
		local($title,$count);
	});
	//更改本地存储
	function local($title,$count){
		arr = JSON.parse(localStorage.getItem('shoppingCar'));
		console.log($title);
		for(var i=0;i<arr.length;i++){  //遍历localStorage数组更改商品数量
			if(arr[i].title == $title){
				arr[i].count = $count;
				localStorage.setItem('shoppingCar',JSON.stringify(arr));
				console.log($count);
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
		arr = JSON.parse(localStorage.getItem('shoppingCar'));
		for(var i in arr){  //遍历localStorage数组更改商品数量
			if(arr[i].title == $(this).closest('li').find('.title p').html()){
				arr.splice(i,1);
				localStorage.setItem('shoppingCar',JSON.stringify(arr));
				//更改购物车总数
				var a = JSON.parse(localStorage.getItem('count'));
				localStorage.setItem('count',--a);
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
	var str,obj={},goods=[],goodsObj={};
	var $che = $('.dataList .che');
	$('.pay').on('touchend',function(){
		var index = 0;
		alert('正在跳转!');
		$che.each(function(idx,item){
			if(item.checked){
				goodsObj.title = $(this).closest('li').find('.title p').html();
				goodsObj.price = $(this).closest('li').find('.title i').html();
				goodsObj.img = $(this).closest('li').find('.goods img').attr('src');
				goodsObj.count = $(this).closest('li').find('.count').val();
				goods.push(goodsObj);
				index++;
			}
		});
		if(localStorage.getItem('order')) { //判断localStorage是否存在
			str = JSON.parse(localStorage.getItem('order')); //将localStorage字符串转换成数组
				obj = {
					'id':parseInt(Math.random()*1000),
					'sum': index,
					'goods':goods
				};
				if(obj.sum != 0){
					str.push(obj);
				}
		} else { //如果localStorage不存在则设置一个空数组追加对象
			str = [];
			obj = {
				'id':parseInt(Math.random()*1000),
				'sum': index,
				'goods':goods
			}
			if(obj.sum != 0){
				str.push(obj);
			}
		}
		str = JSON.stringify(str); //将数组转换为字符串
		var order = localStorage.setItem('order',str); //设置本地存储
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
