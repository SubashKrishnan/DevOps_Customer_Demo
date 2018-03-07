//var app = angular.module('MyApp', [])
//app.controller('MyController', function ($scope, $http, $window) {
//	$scope.IsVisible = false;
//	$scope.Search = function () {
//		var customer = '{Name: "' + $scope.Prefix + '" }';
//		var post = $http({
//			method: "POST",
//			url: "/api/AjaxAPI/AjaxMethod",
//			dataType: 'json',
//			data: customer,
//			headers: { "Content-Type": "application/json" }
//		});

//		post.success(function (data, status) {
//			$scope.Customers = data;
//			$scope.IsVisible = true;
//		});

//		post.error(function (data, status) {
//			$window.alert(data.Message);
//		});
//	}
//});
/* Main function */
$(function () {
	/* Login Button Click */
	$("#btnLogin").click(function () {
		//var val = ValidationLogin();
		if (ValLog() === false) {
			return false;
		}
		$('#img').show();
		var Login = {};
		Login.strLogUserName = $("#txtLogUserName").val();
		Login.strLogPassword = $("#txtLogPassword").val();
		$.ajax({
			type: "POST",
			url: "/Login/Login",
			data: '{Login: ' + JSON.stringify(Login) + '}',
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function (response) {
				$('#img').hide();
				//alert("Hello: " + response.LoginStatus);
				if (response.intStatus === 0) {
					$("#divErrorLogin").css("display", "block");
					$("#divErrorLoginActivationFaied").css("display", "none");
					//$("#divErrorEmailExits").css("display", "none");
					$("#txtLogUserName").focus();
				}
				if (response.intStatus === 1) {

					//window.location.href = "/Index";

					var url = $("#RedirectTo").val();
					location.href = url;
					//window.location.href = '@Url.Action("Index", "Home")';
				}
				if (response.intStatus === 2) {
					$("#divErrorLoginActivationFaied").css("display", "block");
					$("#divErrorLogin").css("display", "none");
					//$("#divErrorEmailExits").css("display", "none");
					$("#txtLogUserName").focus();
				}
			},
			failure: function (response) {
				$('#img').hide();

				alert(response.responseText);
			},
			error: function (response) {
				$('#img').hide();

				alert(response.responseText);
			}
		});
	});

});
/* Login Validation */
function ValLog() {
	var LogUserName = document.getElementById("txtLogUserName").value;
	var LogPassword = document.getElementById("txtLogPassword").value;
	if (LogUserName === "") {
		$("#divErrorLogUserName").css("display", "block");
		$("#txtLogUserName").focus();
		return false;
	}
	else {
		$("#divErrorLogUserName").css("display", "none");
	}
	if (LogPassword === "") {
		$("#divErrorLogPassword").css("display", "block");
		$("#txtLogPassword").focus();
		return false;
	}
	else {
		$("#divErrorLogPassword").css("display", "none");
	}
	return true;
}
function changeHashOnLoad() {
    window.location.href += "#";
    setTimeout("changeHashAgain()", "50");
}
function changeHashAgain() {
    window.location.href += "1";
}
