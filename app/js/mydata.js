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

	$input.eq(0).on('blur', function() {
		var txt = $input.eq(0).val();

		if(txt == '') {
			otext.html('你的小昵称呢？');
		} else {
			var pattern = /^.{2,10}/;
			var otxt = pattern.test(txt);

			if(otxt) {
				otext.html('帅气的小名');
			} else {
				otext.html('什么玩意！');
				$input.eq(1).val('');
			}
		}
	})

	$input.eq(1).on('blur', function() {
		var num = $input.eq(1).val();

		if(num == '') {
			otext.html('你的telephone number 呢？');
		} else {
			var pattern = /^(134|155|180|150|138|156)\d{8}$/;
			var oname = pattern.test(num);
			if(oname) {
				otext.html('可以可以！');
			} else {
				otext.html('错了错了，没有你这手机号');
				$input.eq(1).val('');
			}

		}
	})

	$.ajax({
		url: '../data/region.json',
		success: function(res) {
			//			console.log(res);

			$.each(res, function(idx, item) {
				//<option value="广东" label="大陆">广东</option>

				$.each(item, function(idx, name) {
//					console.log(name);
					var $sheng_name = $('<option/>');
					$sheng_name.attr({
						value: name.name
					}).html(name.name).appendTo($shenglist);

					$shi.on('focus', function() {
						var $sheng_txt = $sheng.val();

						if(name.name == $sheng_txt) {
							console.log(item[idx]);
							$shilist.empty();

							$.each(item[idx].regions, function(idx, shi) {
								var $shi_name = $('<option/>');
								$shi_name.attr({
									value: shi.name
								}).html(shi.name).appendTo($shilist);
//								console.log(shi);
																
								$xian.on('focus', function() {
									var $shi_txt = $shi.val();	
								    if(shi.name == $shi_txt){
								    	$xianlist.empty();
//								    	console.log(item[idx].regions[idx]);
								    	console.log(shi.name);
								    	$.each(shi.regions, function(idx, xian) {
								    		var $xian_name = $('<option/>');
								    		
											$xian_name.attr({
												value: xian.name
											}).html(xian.name).appendTo($xianlist);
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
	var datalist = localStorage.getItem('datalist');//这里得到的有可能为null
	datalist = datalist ? JSON.parse(datalist) : [];
	
	$input.eq(6).on('singleTap',function(){
	if($input.eq(0).val() == '' || $input.eq(1).val() == '' || $input.eq(2).val() == '' || $input.eq(3).val() == '' || $input.eq(4).val() == '' || $input.eq(5).val() == ''){
	    otext.html('写完再走！');	
	
	
	}else{		
		var data = {};
		
		data.name = $input.eq(0).val();
		data.phone = $input.eq(1).val();
		data.sheng = $input.eq(2).val();
		data.shi = $input.eq(3).val();
		data.xian = $input.eq(4).val();
		
		datalist.push(data);
		
		localStorage.setItem('datalist',JSON.stringify(datalist));
	}
	})
});