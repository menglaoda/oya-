;$(function(){

     	var swiper = new Swiper('.swiper-container', {
	        pagination: '.swiper-pagination',
	        // paginationClickable: true,
			visibilityFullFit : false,	//是否允许滑动：false:允许滑动
	        autoplay : 2000,
	        loop:true,
    	});

     var $eLi= $('ul.ul-li').find('li');
     var goods=$('.goods');
     var comment=$('.comment-list');

     $eLi.each(function(index){
     	var $self = $(this);
     	$self.on('singleTap',function(){
     		$self.addClass('active').siblings().removeClass('active');
     		if(index==0){
     			goods.css({display:'block'});
     			comment.css({display:'none'});
     			// $('.footer').css({display:'block'});
     		}else if(index==1){
     			goods.css({display:'none'});
     			comment.css({display:'block'});
     			// $('.footer').css({display:'none'});
     		}
     	});
     });
     // localStoryge
     // 按钮
     var $car=$('.payMethod');
     //读取购物车商品总数
     if(localStorage.getItem('count')){
     	total = JSON.parse(localStorage.getItem('count'));
     	$('.num').html(JSON.parse(localStorage.getItem('count')));
     }else{
     	total = parseInt($('.num').html());
     }
      // 点击的时候保存
    $car.on('singleTap',function(){
		var arr,obj={};
		if(localStorage.getItem('shoppingCar')){ //判断localStorage是否存在
			arr = JSON.parse(localStorage.getItem('shoppingCar'));   //将localStorage字符串转换成数组
			for(var i=0;i<arr.length;i++){   //遍历数组
				if(arr[i].title == $('.xinxi').find('.namee').html()){   //如果存在对应的商品对象
					arr[i].count = arr[i].count + 1;  //商品数量加1
					break; //退出循环
				}
			}
			if(i > arr.length-1){   //当数组不存在对应的对象时，创建一个对象并追加到数组的最后
      			obj ={'title':$('.xinxi').find('.namee').html(),'img':$('.swiper-wrapper').find('img').eq(0).attr('src'),'price':$('.xinxi').find('.price i').html(),'count':1};
				total++;
				$('.num').html(total);
				arr.push(obj);
			}
		}else{  //如果localStorage不存在则设置一个空数组追加对象
			arr = [];
      		obj ={'title':$('.xinxi').find('.namee').html(),'img':$('.swiper-wrapper').find('img').eq(0).attr('src'),'price':$('.xinxi').find('.price i').html(),'count':1};
			total++;
			$('.num').html(total);
			arr.push(obj);
		}
	    arr = JSON.stringify(arr);  //将数组转换为字符串
    	localStorage.setItem('shoppingCar',arr);
    	//购物车商品总数
    	localStorage.setItem('count',total);//设置本地存储
  });
    
});	



   

;$(function($){
	//轮播图
	var mySwiper = new Swiper('.swiper-container', {
		width: window.innerWidth,
		pagination: '.swiper-pagination',
		autoplay: 3000,
		paginationClickable: true,
		loop: true,
	});
	//懒加载
	var $fix = $('.fix').eq(1);
	//设置全局ajax
	$.ajaxSetup({
		url:'../data/products.json',
		success:function(res){
			$.each(res, function(idx,item) {
				//创建商品对象并追加到页面中
				var $products = $('<div/>').addClass('products');
				var $col = $('<div/>').addClass('col-xs-12');
				var $a = $('<a/>').attr('href',item.href);
				var $img = $('<img/>').attr('src',item.img);
				$a.append($img);
				$col.append($a);
				$products.append($col);
				
				var $title = $('<div/>').addClass('pro-title').html(item.title);
				$products.append($title);
				
				var $price = $('<strong/>').addClass('price').html('&yen;'+item.price);
				$products.append($price);
				
				$fix.append($products);
				
			});
		}
		
	});
	$.ajax();  //执行ajax
	var n = 0;  //声明停止懒加载变量
	$(window).on('scroll',function(){
		var scrollTop = $(window).scrollTop();
		//滚动懒加载
		if(scrollTop >= $(document).height()-$(window).height() - 100){  //当滚动条快到底部时
			n++;
			if(n < 4){  //懒加载十次
				$.ajax();
			}
		}
		//显示回到顶部按钮
		if(scrollTop >= 300){
			$('.scroll_top').show();
		}else{
			$('.scroll_top').hide();
		}
		
	});
	//点击回到顶部
	$('.scroll_top').on('click',function(){
		$('html,body').animate({'scrollTop':0});
	});
});

$(function(){
	
	var allList = $('.list-brand li');
	var $allUl = $('ul.allUl');
	var $ediv =$('.list-Img');

	// 点击显示对应的rightt
	allList.on('singleTap',function(){
		var index=$(this).index();

		$(this).addClass('active').siblings().removeClass('active');
		// listRight.eq(index).css('zIndex','100').siblings().css('zIndex','1');
		
	})

	var dex = 0;
	allList.on('singleTap',function(){
		// 初始化
		
		$.ajaxSetup({
			url:'../data/liebiao1.json',
			type:'get',
			dataType:'json',
			async:true,
			success:function(res){
				console.log(res);

				console.log($allUl);
				$allUl.eq(0).find('img').attr({src:res[dex].imgurl});
				$allUl.eq(0).find('p').text(res[dex].name);
				
				$allUl.eq(1).find('img').attr({src:res[dex+1].imgurl});
				$allUl.eq(1).find('p').text(res[dex+1].name);
	
				// $.each(res,function(idx,item){
				// 	console.log(this);
				// 	$allUl[0].find('img').attr({src:htis})
			
				// });
				dex++;
				if(dex>=res.length-1){
					dex=0;
				}
			}
		})
		// 请求
		$.ajax();
		
	})

})
;
$(function($) {

	var $input = $('input');
	var otext = $('.txt');
	var $sheng = $('#sheng');
	var $shenglist = $('#shenglist');
	var $shi = $('#shi');
	var $shilist = $('#shilist');
	var $xian = $('#xian');
	var $xianlist = $('#xianlist');

	//昵称验证
	$input.eq(0).on('blur', function() {
			var txt = $input.eq(0).val();

			if(txt == '') {
				otext.html('昵称不能为空！');
			} else {
				var pattern = /^.{2,10}/;
				var otxt = pattern.test(txt);

				if(otxt) {
                    otext.html('');
				} else {
					$input.eq(1).val('');
				}
			}
		})
		//手机号码验证
	$input.eq(1).on('blur', function() {
		var num = $input.eq(1).val();

		if(num == '') {
			otext.html('填写手机号。');
		} else {
			var pattern = /^(134|155|180|150|138|156)\d{8}$/;
			var oname = pattern.test(num);
			if(oname) {
				 otext.html('');
			} else {
				$input.eq(1).val('');
			}
		}
	})

	//ajax加载全国各地省市县
	$.ajax({
		url: '../data/region.json',
		success: function(res) {
			//			console.log(res);
			//遍历第一遍
			$.each(res, function(idx, item) {
				//遍历第二遍，得出省份并创建
				$.each(item, function(idx, name) {
					var $sheng_name = $('<option/>');
					$sheng_name.attr({value: name.name}).html(name.name).appendTo($shenglist);

					$shi.on('focus', function() {
						var $sheng_txt = $sheng.val();
						//获取选择的省份匹配相等得出idx
						if(name.name == $sheng_txt) {
							$shilist.empty();
							//遍历第三遍取到的下标idx，遍历regions得出其全部的市
							$.each(item[idx].regions, function(idx, shi) {
								var $shi_name = $('<option/>');
								$shi_name.attr({value: shi.name}).html(shi.name).appendTo($shilist);

								$xian.on('focus', function() {
									var $shi_txt = $shi.val();
									//获取选择的市匹配相等得出idx
									if(shi.name == $shi_txt) {
										$xianlist.empty();
										//遍历第四遍，得出所包含的县并创建
										$.each(shi.regions, function(idx, xian) {
											var $xian_name = $('<option/>');

											$xian_name.attr({value: xian.name}).html(xian.name).appendTo($xianlist);
										})
									}

								})
							})
						}

					})

				})

			})

		}
	})

	//读取本地存储
	//	var datalist = localStorage.getItem('datalist');//这里得到的有可能为null
	//	datalist = datalist ? JSON.parse(datalist) : [];
	//完善信息不是重复多个的，每次覆盖前面的
	var data = {};

	//提交按钮事件
	$input.eq(6).on('singleTap', function() {
		if($input.eq(0).val() == '' || $input.eq(1).val() == '' || $input.eq(2).val() == '' || $input.eq(3).val() == '' || $input.eq(4).val() == '' || $input.eq(5).val() == '') {
			otext.html('写完再走！');

		} else {

			data.name = $input.eq(0).val();
			data.phone = $input.eq(1).val();
			data.sheng = $input.eq(2).val();
			data.shi = $input.eq(3).val();
			data.xian = $input.eq(4).val();
			data.dress = $input.eq(5).val();

			//		datalist.push(data);
			//保存到本地存储
			localStorage.setItem('data', data);
			//		console.log(JSON.parse(data))
			location.assign('zhongxin.html');
		}
	})
});
;$(function($){
	//懒加载效果
	var $list = $('.list');   //保存对象
	//设置全局ajax
	$.ajaxSetup({
		url:"../data/list.json",   //获取json地址
		success:function(res){   //请求成功后执行
			$.each(res,function(idx,item){   //遍历获取的对象
				//创建数据列表
				var $row = $('<div/>').addClass('row-content');   
				var $col1 = $('<div/>').addClass('col-xs-3');
				$col1.html(item.income);
				$row.append($col1);
				var $col2 = $('<div/>').addClass('col-xs-3');
				$col2.html(item.surplus);
				$row.append($col2);
				var $col3 = $('<div/>').addClass('col-xs-3');
				$col3.html(item.remark);
				$row.append($col3);
				var $col4 = $('<div/>').addClass('col-xs-3');
				$col4.html(item.time);
				$row.append($col4);
				$list.append($row);  
			});
		}
	});
	//让页面加载完马上触发ajax加载数据
	$.ajax();
	var n = 0;  //初始化懒加载的次数
	//滚动事件触动懒加载
	$(window).on('scroll',function(){
		var scrollTop = $(window).scrollTop();   //滚动条距离顶部的距离
		if(scrollTop >= $(document).height()-$(window).height() - 100){  //当滚动条快到底部时
			n++;
			if(n < 3){  //懒加载3次
				$.ajax();
			}
		}
	});
});
;$(function($){
	var $menu = $('.side-list');
	var $btn = $('#memu-list');
	
	$btn.on('singleTap',function(){
		$menu.fadeToggle();
	})
	
});

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
				str.push(obj);
		} else { //如果localStorage不存在则设置一个空数组追加对象
			str = [];
			obj = {
				'id':parseInt(Math.random()*1000),
				'sum': index,
				'goods':goods
			}
			str.push(obj);
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

;$(function(){
	var $DDsection = $(".DDsection");
	
	var shuju = JSON.parse(localStorage.getItem("order"));
//	    console.log(shuju);
	$.each(shuju,function(idx,item) {
		
			var $dingdan1 = $("<div></div>");
			var $dingdan1_1 = $("<div></div>");
			$dingdan1_1.addClass("dingdan1_1");
			//创建两个span  <span>店铺1</span><span>交易成功</span>放入 $dingdan1_1
			var $span1 = $("<span></span>");
			var $span2 = $("<span></span>");
			$span1.html("店铺 <i>"+item.id+"</i>");
			$span2.html("交易成功");
			$span1.addClass("span1");
			$span2.addClass("span2");
			$dingdan1_1.addClass("dingdan1_1");
			$span1.appendTo($dingdan1_1);
			$span2.appendTo($dingdan1_1);
			
			 $dingdan1_1.appendTo($dingdan1);

		var total = 0;
		$.each(item.goods, function(idx,item) {
			var $dingdan1_2 = $("<div></div>");
			 $dingdan1_2.addClass("dingdan1_2");
			
			//				  <div class="dingdan1_2">
//              	<div class="dingdan1_2_1">
//              		<img src="../img/56.jpg"/>
//              	</div>
//              	<div class="dingdan1_2_2">
//              		<h2>物品名称</h2>
//              		<span>单价</span>
//              		<span>数量</span>
//              	</div>
//              </div>	
            var $dingdan1_2_1 = $("<div></div>");
            var $dingdan1_2_2 = $("<div></div>");
            var $oimg= $("<img />");
            $oimg.attr("src",item.img);
            $oimg.addClass("oimg");
            $dingdan1_2_1.addClass("dingdan1_2_1");
            $oimg.appendTo($dingdan1_2_1);
            $dingdan1_2_1.appendTo($dingdan1_2);
            
            var $h22 = $("<p></p>");
            var $span3 = $("<span></span>");
			var $span4 = $("<span></span>");
			$h22.html(item.title);
			$span3.html('&yen;'+item.price);
			$span4.html('&times;'+item.count);
			$span3.addClass("span3");
			$span4.addClass("span4");
			$dingdan1_2_2.addClass("dingdan1_2_2");
			$h22.appendTo($dingdan1_2_2);
			$span3.appendTo($dingdan1_2_2);
			$span4.appendTo($dingdan1_2_2);
			
			$dingdan1_2.addClass("dingdan1_2");
			$dingdan1_2_2.appendTo($dingdan1_2);
			 $dingdan1_2.appendTo($dingdan1);
			
			total += item.price * item.count;
		});
	
		var $dingdan1_3 = $("<div></div>");
		var $dingdan1_4 = $("<div></div>");
	
//				  <div class="dingdan1_3">
//              	<h3 class="hh3">共<b>2</b>件商品：合计 ￥<span>240</span></h3>
//              </div>	
        var $hh3 = $("<p></p>");
        var $b = $("<b></b>");
         var $b1 = $("<b></b>");
        var $span5 = $("<span></span>");
        $b.html(item.sum);
         $b1.html("件商品：合计 ￥");
        $span5.html(total);
        $hh3.addClass("hh3");
        
        $b.appendTo($hh3);
        $b1.appendTo($hh3);
        $span5.appendTo($hh3);
        $hh3.appendTo($dingdan1_3);
        
//              <div class="dingdan1_4">
//              	<span>
//	                	 <button>付款</button>
//	                	 <button>删除订单</button>
//	                	 <button>查看物流</button>
//              	</span>
//              </div>	
        var $span5 = $("<span></span>");
        var $buttom1 = $("<button></button>");
        var $buttom2 = $("<button></button>");
        var $buttom3 = $("<button></button>");
        $buttom1.html("付款");
        $buttom2.html("删除订单");
        $buttom3.html("查看物流");
        $span5.addClass("span5");
        $buttom1.addClass("button1"); 
        $buttom2.addClass("button2");
        $buttom3.addClass("button1");
        $buttom1.appendTo($span5);
        $buttom2.appendTo($span5);
        $buttom3.appendTo($span5);
        $span5.appendTo($dingdan1_4);
        
       
        $dingdan1_3.addClass("dingdan1_3");
        $dingdan1_4.addClass("dingdan1_4");
        $dingdan1.addClass("dingdan1");
        
       
       
        $dingdan1_3.appendTo($dingdan1);
        $dingdan1_4.appendTo($dingdan1);
        
        $dingdan1.appendTo($DDsection);
        
        //点击取消订单
//              var btn2 = $(".button2");
            
        $buttom2.on("singleTap",function(){
        	$buttom2.closest($dingdan1).remove();
        	for(var i=0;i<shuju.length;i++){
        		if(shuju[i].id == $(this).closest('.dingdan1').find('.dingdan1_1 i').html()){
        			shuju.splice(i,1);
		      	   localStorage.setItem('order',JSON.stringify(shuju));
        		}
        	}
         
        });
	});
//	$.ajax({
//		type:"get",
//		url:"../data/submit.json",
//		async:true,
//		success:function(res){
//			console.log(res);
//			$.each(res,function(idx,item){
//				var $dingdan1 = $("<div></div>");
//				var $dingdan1_1 = $("<div></div>");
//				var $dingdan1_2 = $("<div></div>");
//				var $dingdan1_3 = $("<div></div>");
//				var $dingdan1_4 = $("<div></div>");
//				//创建两个span  <span>店铺1</span><span>交易成功</span>放入 $dingdan1_1
//				var $span1 = $("<span></span>");
//				var $span2 = $("<span></span>");
//				$span1.html(item.name);
//				$span2.html(item.status);
//				$span1.addClass("span1");
//				$span2.addClass("span2");
//				$dingdan1_1.addClass("dingdan1_1");
//				$span1.appendTo($dingdan1_1);
//				$span2.appendTo($dingdan1_1);
////				  <div class="dingdan1_2">
////              	<div class="dingdan1_2_1">
////              		<img src="../img/56.jpg"/>
////              	</div>
////              	<div class="dingdan1_2_2">
////              		<h2>物品名称</h2>
////              		<span>单价</span>
////              		<span>数量</span>
////              	</div>
////              </div>	
//              var $dingdan1_2_1 = $("<div></div>");
//              var $dingdan1_2_2 = $("<div></div>");
//              var $oimg= $("<img />");
//              $oimg.attr("src",item.src);
//              $oimg.addClass("oimg");
//              $dingdan1_2_1.addClass("dingdan1_2_1");
//              $oimg.appendTo($dingdan1_2_1);
//              $dingdan1_2_1.appendTo($dingdan1_2);
//              
//              var $h22 = $("<h2></h2>");
//              var $span3 = $("<span></span>");
//				var $span4 = $("<span></span>");
//				$h22.html(item.introduce);
//				$span3.html(item.price);
//				$span4.html(item.count);
//				$span3.addClass("span3");
//				$span4.addClass("span4");
//				$dingdan1_2_2.addClass("dingdan1_2_2");
//				$h22.appendTo($dingdan1_2_2);
//				$span3.appendTo($dingdan1_2_2);
//				$span4.appendTo($dingdan1_2_2);
//				
//				$dingdan1_2.addClass("dingdan1_2");
//				$dingdan1_2_2.appendTo($dingdan1_2);
//				
////				  <div class="dingdan1_3">
////              	<h3 class="hh3">共<b>2</b>件商品：合计 ￥<span>240</span></h3>
////              </div>	
//              var $hh3 = $("<h3></h3>");
//              var $b = $("<b></b>");
//               var $b1 = $("<b></b>");
//              var $span5 = $("<span></span>");
//              $b.html(item.count);
//               $b1.html("件商品：合计 ￥");
//              $span5.html(item.totalprice);
//              $hh3.addClass("hh3");
//              $b.html(item.count);
//              $b.appendTo($hh3);
//              $b1.appendTo($hh3);
//              $span5.appendTo($hh3);
//              $hh3.appendTo($dingdan1_3);
//              
////              <div class="dingdan1_4">
////              	<span>
////	                	 <button>付款</button>
////	                	 <button>删除订单</button>
////	                	 <button>查看物流</button>
////              	</span>
////              </div>	
//              var $span5 = $("<span></span>");
//              var $buttom1 = $("<button></button>");
//              var $buttom2 = $("<button></button>");
//              var $buttom3 = $("<button></button>");
//              $buttom1.html("付款");
//              $buttom2.html("删除订单");
//              $buttom3.html("查看物流");
//              $span5.addClass("span5");
//              $buttom1.addClass("button1"); 
//              $buttom2.addClass("button1");
//              $buttom3.addClass("button1");
//              $buttom1.appendTo($span5);
//              $buttom2.appendTo($span5);
//              $buttom3.appendTo($span5);
//              $span5.appendTo($dingdan1_4);
//              
//              
//              $dingdan1_1.addClass("dingdan1_1");
//              $dingdan1_2.addClass("dingdan1_2");
//              $dingdan1_3.addClass("dingdan1_3");
//              $dingdan1_4.addClass("dingdan1_4");
//              $dingdan1.addClass("dingdan1");
//              
//              $dingdan1_1.appendTo($dingdan1);
//              $dingdan1_2.appendTo($dingdan1);
//              $dingdan1_3.appendTo($dingdan1);
//              $dingdan1_4.appendTo($dingdan1);
//              
//              $dingdan1.appendTo($DDsection);
//              
//              //点击取消订单
//              $buttom2.on("click",function(){
//              	console.log("aa");
//              	$buttom2.closest($dingdan1).remove();
//              })
//              
//			})
//		}
//		
//	});
});
