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
    var $title = $('#title');
    //读取我的资料
        
    var mydata =JSON.parse(localStorage.getItem('data')) ;
    console.log(mydata.name);
    if(mydata){
    	$title.html('我的资料');
    	
    	$input.eq(0).val(mydata.name) ;
		  $input.eq(1).val(mydata.phone);
		  $input.eq(2).val(mydata.sheng);
		 $input.eq(3).val(mydata.shi);
		 $input.eq(4).val(mydata.xian) ;
		  $input.eq(5).val(mydata.dress);
		  
		  
    }
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

			//datalist.push(data);
			//保存到本地存储
			localStorage.setItem('data',JSON.stringify(data));
			//console.log(JSON.parse(data))
			location.assign('zhongxin.html');
		}
	})
	
	
});