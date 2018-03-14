var app = angular.module("myApp", ['angularUtils.directives.dirPagination']);
app.directive("dateTimePicker", DatetimePicker)
app.directive('numbersOnly', NumbersOnly);
app.directive('decimalOnly', DecimalOnly);
//app.directive("dateTimePicker", DatetimePicker2)
app.controller("myCtrl", function ($scope, $http, $timeout) {
	$scope.AddUpdateOrders = function () {
		//var Action = document.getElementById("btnSave").getAttribute("value");
		var validations = $scope.Validations();
		if (validations === false) {
			return;
		}
		$scope.Order = {};
		$scope.Order.intID = document.getElementById("OrderId").value;
		$scope.Order.strFirstName = $scope.txtOrderBuyerName;
		$scope.Order.strSecondName = $scope.txtOrderArticleNo;
		$scope.Order.intMode = 1;
		$http({
			method: "post",
			url: "/api/AjaxAPI/AddUpdateOrders",
			datatype: "json",
			data: JSON.stringify($scope.Order)
		}).then(function (response) {
			$scope.OrderMsg = response.data;
			document.getElementById("btnSave").setAttribute("value", "Save");
			$scope.AutoHideMsgs();
			$scope.GetAllOreders();
			$scope.ClearFields();
		});
	};
	$scope.GetAllOreders = function () {
		$http({
			method: "get",
			url: "/api/AjaxAPI/GetDatas"
		}).then(function (response) {
			$scope.Orders = response.data;
		}, function () {
			alert("Error Occur");
		});
	};
	$scope.DeleteOrder = function (Order) {
		
		$scope.Order = {};
		$scope.Order.intID = Order.ID;
		$scope.Order.intMode = 2;
		$http({
			method: "post",
			url: "/api/AjaxAPI/AddUpdateOrders",
			datatype: "json",
			data: JSON.stringify($scope.Order)
		}).then(function (response) {
			$scope.OrderMsg = response.data;
			$scope.AutoHideMsgs();
			$scope.GetAllOreders();
		});
	};
	$scope.EditOrder = function (Order) {
		document.getElementById("OrderId").value = Order.ID;
		$scope.txtOrderBuyerName = Order.FIRST_NAME,
			$scope.txtOrderArticleNo = Order.SECOND_NAME,
		document.getElementById("btnSave").setAttribute("value", "Update");
	};
	$scope.ClearFields = function () {
		$scope.txtOrderBuyerName = "";
		$scope.txtOrderArticleNo = "";
		document.getElementById("OrderId").value = 0;
	}
	$scope.Validations = function () {
		if ($scope.txtOrderBuyerName === "" | $scope.txtOrderBuyerName === undefined) {
			$("#divErrorBuyerName").css("display", "block");
			$("#txtOrderBuyerName").focus();
			return false;
		}
		else {
			$("#divErrorBuyerName").css("display", "none");
		}
		if ($scope.txtOrderArticleNo === "" | $scope.txtOrderArticleNo === undefined) {
			$("#divErrorArticleNo").css("display", "block");
			$("#txtOrderArticleNo").focus();
			return false;
		}
		else {
			$("#divErrorArticleNo").css("display", "none");
		}
		
		return true;
	}
	$scope.AutoHideMsgs = function () {
		$scope.divMsgs = true;
		$timeout(function () {
			$scope.divMsgs = false;
		}, 3000);
	}
});
function DatetimePicker() {
	return {
		restrict: "A",
		require: "ngModel",
		link: function (scope, element, attrs, ngModelCtrl) {
			var parent = $(element).parent();
			var dtp = parent.datetimepicker({
				format: "DD/MM/YYYY",
				showTodayButton: true
				//pickTime: true
			});
			dtp.on("dp.change", function (e) {
				ngModelCtrl.$setViewValue(moment(e.date).format("DD/MM/YYYY"));
				scope.$apply();
			});
		}
	};
}
function NumbersOnly() {
	return {
		require: 'ngModel',
		link: function (scope, element, attr, ngModelCtrl) {
			function fromUser(text) {
				if (text) {
					var transformedInput = text.replace(/[^0-9]/g, '');
					if (transformedInput !== text) {
						ngModelCtrl.$setViewValue(transformedInput);
						ngModelCtrl.$render();
					}
					return transformedInput;
				}
				return undefined;
			}
			ngModelCtrl.$parsers.push(fromUser);
		}
	};
}
function DecimalOnly() {
	return {
		require: '?ngModel',
		link: function (scope, element, attrs, ngModelCtrl) {
			if (!ngModelCtrl) {
				return;
			}
			ngModelCtrl.$parsers.push(function (val) {
				if (angular.isUndefined(val)) {
					var val = '';
				}
				var clean = val.replace(/[^0-9\.]/g, '');
				var decimalCheck = clean.split('.');
				if (!angular.isUndefined(decimalCheck[1])) {
					decimalCheck[1] = decimalCheck[1].slice(0, 3);
					clean = decimalCheck[0] + '.' + decimalCheck[1];
				}
				if (val !== clean) {
					ngModelCtrl.$setViewValue(clean);
					ngModelCtrl.$render();
				}
				return clean;
			});
			element.bind('keypress', function (event) {
				if (event.keyCode === 32) {
					event.preventDefault();
				}
			});
		}
	};
}