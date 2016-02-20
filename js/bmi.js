$(function() {
	monspan = $('#monspan');
	$('#result div').hide();
	monspan.hide();
	age = $('#age');
	weight = $('#weight');
	height = $('#height');
	age.blur(function() {
		if (age.val() < 19) {
			monspan.show();
		} else {
			monspan.hide();
		}
	});
	// 用户对象
	var usr = {};
	usr.norhigh = 24;
	usr.norlow = 18.5;
	usr.ustat = '4';
	// 计算BMI
	function calcBmi() {
		bmi = weight.val() / height.val() / height.val();
		usr.bmi = bmi;
		$("#bmi_result").val(bmi.toFixed(2));
		usr.age = age.val();
		usr.gender = $('#gender[checked=true]').val();
		if (usr.age < 5 || usr.age > 70) {
			alert('您的年龄不在BMI适用范围内！');
		} else if (usr.age <= 19) {
			alert('青少年BMI标准要相比常人BMI数值略低。');
			url = "data/bmi_girls_z_WHO2007_exp.json";
			if (usr.gender == "male") {
				url = "data/bmi_boys_z_WHO2007_exp.json";
			}
			hobj = $.ajax({
				url: url,
				async: false
			});
			// 获取map
			ybmis = eval("(" + hobj.responseText + ")");
			// 判断月份
			m = usr.age * 12;
			if (month.val() > 0) {
				m += month.val();
			}
			bmistats = ybmis[m].split('|');
			usr.norhigh = bmistats[1];
			usr.norlow = bmistats[0];
			statarry = new Array("2neg", "0", "1", "2", "3", "4");
			for (var i = 0; i < bmistats.length; i++) {
				if (bmi < bmistats[i]) {
					usr.ustat = statarry[i];
					break;
				}
			}
		} else {
			//根据BMI给出建议
			if (bmi < 18.5) {
				usr.ustat = '2neg';
			} else if (bmi < 24) {
				usr.ustat = '0';
			} else if (bmi < 28) {
				usr.ustat = '1';
			} else if (bmi < 35) {
				usr.ustat = '2';
			} else if (bmi < 40) {
				usr.ustat = '3';
			} else if (bmi >= 40) {
				usr.ustat = '4';
			}
		}
		$("#norbmi").text("根据以上信息，您的正常的BMI范围是：" + usr.norlow + "~" + usr.norhigh);
		$('#result_sd' + usr.ustat).show();
	}
	// 对FORM进行验证
	var validator = new FormValidator('bmicalc_form', [{
		name: 'age',
		display: '年龄',
		rules: 'required|numeric|greater_than[5]|less_than[70]',
		depends: function(f) { //清除所有错误告警
			$('input').removeClass("err");
			// 隐藏答案
			$('#result div').hide();
			return true;
		}
	}, {
		name: 'weight',
		display: '体重',
		rules: 'required|min_length[2]|decimal|greater_than[15]|less_than[300]'
	}, {
		name: 'height',
		display: '身高',
		rules: 'required|min_length[3]|decimal|greater_than[1]|less_than[3]'
	}], function(errs, e) {
		if (errs.length > 0) {
			var errStr = '';
			for (var i = 0, errLen = errs.length; i < errLen; i++) {
				errStr += errs[i].message + '<br />';
				$('#' + errs[i].id).addClass('err');
			}
			alert(errStr);
		} else {
			calcBmi();
		}
		//event.preventDefault();
	}).setMessage('required', '%s是必须的！').setMessage('numeric', '%s必须是数字！').setMessage('decimal', '%s必须是小数或整数！').setMessage('min_length', '%s字符的长度必须大于%s！').setMessage('greater_than', '%s必须大于%s！').setMessage('less_than', '%s必须小于%s！');
	$('#calc').click(function() {
		$('input').removeClass('err');
		validator._validateForm();
	});
});
