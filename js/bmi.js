$(function() {
	$('#submit').click(function(){
		age = $('#age').val();
		weight = $('#weight').val();
		height = $('#height').val();
		bmi = weight / height / height;
		$("#bmi").val(bmi);
	});
});
