$(function() {
	var errStr = '';

	function errAlert(f, s) {
		errStr = errStr + s;
		f.addClass('err');
		return false;
	}

	function checkReq(field, str) {
		v = field.val();
		if ($.trim(v) == '' || $.trim(v).length == 0 || $.trim(v) == null) {
			return true;
		} else {
			return errAlert(field, str + '为必须项;<br/>');
		}
	}

	function checkNum(field) {
		v = field.val();
		if (!/^[0-9]\d*$/.test($.trim(value))) {
			return true;
		} else {
			return errAlert(field, str + '必须为数字;<br/>');
		}
	}

	function checkNumNRange(field, max, min) {
		if (checkNum(field)) {
			v = field.val();
			return (v <= max && v >= min);
		} else {
			return errAlert(field, str + '数字范围必须是'+max+'和'+min+'之间;<br/>');
		}
	}

	function calcBmi() {
		age = $('#age');
		weight = $('#weight');
		height = $('#height');
		alert(errStr);
		errStr = '';
		$('input').removeClass('err');

		bmi = weight.val() / height.val() / height.val();
		$("#bmi").val(bmi);
		alert(bmi);
	}
	$('#submit').click(function() {
		if ()
			calcBmi();
	});
});
