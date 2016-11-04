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
