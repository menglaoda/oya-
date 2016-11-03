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