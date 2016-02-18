$(function() {
	age = $('#age');
	weight = $('#weight');
	height = $('#height');
	// 计算BMI
	function calcBmi() {
		$('input').removeClass('err');
		bmi = weight.val() / height.val() / height.val();
		$("#bmi_result").val(bmi);
	}
	// 对FORM进行验证
	var validator = new FormValidator('bmicalc_form', [{
		name: 'age',
		display: '年龄',
		rules: 'required|numeric|greater_than[5]|less_than[70]',
		depends: function(f) {//清除所有错误告警
			$('input').removeClass("err");
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
	}], function(errors, event) {
		if (errors.length > 0) {
			var errorString = '';
			for (var i = 0, errorLength = errors.length; i < errorLength; i++) {
				errorString += errors[i].message + '<br />';
				$('#' + errors[i].id).addClass('err');
			}
			alert(errorString);
		} else {
			calcBmi();
		}
		event.preventDefault();
	}).setMessage('required', '%s是必须的！').setMessage('numeric', '%s必须是数字！').setMessage('decimal', '%s必须是小数或整数！').setMessage('min_length', '%s字符的长度必须大于%s！').setMessage('greater_than', '%s必须大于%s！').setMessage('less_than', '%s必须小于%s！');
});
