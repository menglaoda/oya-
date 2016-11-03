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
     		console.log(index);
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
     
     var i=0;
      // 点击的时候保存
    $car.on('singleTap',function(){
    	i++;
     $('.num').html(j);
    	 var arr=[],obj={};
      obj ={'title':$('.xinxi').find('.namee').html(),'img':$('.swiper-wrapper').find('img').eq(0).attr('src'),'price':$('.xinxi').find('.price').html(),'count':$('.glyphicon').find('.num').html()};
    	arr.push(obj);

    	arr = JSON.stringify(arr);  //将数组转换为字符串
    	localStorage.setItem('shoppingCar',arr);   //设置本地存储
    })
    
});	



   
