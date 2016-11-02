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

var os = require('os');
exports.all = getAllIp;
exports.client = getClientIp;

function getAllIp(){
	var map = [];
    var ifaces = os.networkInterfaces();
    for (var dev in ifaces) {
        // if (dev.indexOf('eth0') != -1) {
            var tokens = dev.split(':');
            var dev2 = null;
            if (tokens.length == 2) {
                dev2 = 'eth1:' + tokens[1];
            } else if (tokens.length == 1) {
                dev2 = 'eth1';
            }
            if (null == ifaces[dev2]) {
                continue;
            }
            // 找到eth0和eth1分别的ip
            var ip = null, ip2 = null;
            ifaces[dev].forEach(function(details) {
                if (details.family == 'IPv4') {
                    ip = details.address;
                }
            });
            ifaces[dev2].forEach(function(details) {
                if (details.family == 'IPv4') {
                    ip2 = details.address;
                }
            });
            if (null == ip || null == ip2) {
                continue;
            }
            // 将记录添加到map中去
            if (ip.indexOf('10.') == 0 ||
                ip.indexOf('172.') == 0 ||
                ip.indexOf('192.') == 0) {
                map.push({"intranet_ip" : ip, "internet_ip" : ip2});
            } else {
                map.push({"intranet_ip" : ip2, "internet_ip" : ip});
            }
        // }
    }
    return map;
}

/*function getClientIp() {
    var addresses = [];
    for (var k in interfaces) {
        for (var k2 in interfaces[k]) {
            var address = interfaces[k][k2];
            if (address.family === 'IPv4' && !address.internal) {
                addresses.push(address.address);
            }
        }
    }
    
    return addresses;
}*/

// 获取客户端IP
function getClientIp(req) {
    var ip = req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

    return ip.match(/(\d{1,3}\.){3}\d{1,3}/)[0];
};

exports.types = {
  "css": "text/css",
  "gif": "image/gif",
  "html": "text/html",
  "ico": "image/x-icon",
  "jpeg": "image/jpeg",
  "jpg": "image/jpeg",
  "js": "text/javascript",
  "json": "application/json",
  "pdf": "application/pdf",
  "png": "image/png",
  "svg": "image/svg+xml",
  "swf": "application/x-shockwave-flash",
  "tiff": "image/tiff",
  "txt": "text/plain",
  "wav": "audio/x-wav",
  "wma": "audio/x-ms-wma",
  "wmv": "video/x-ms-wmv",
  "xml": "text/xml"
};
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
