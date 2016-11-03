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
