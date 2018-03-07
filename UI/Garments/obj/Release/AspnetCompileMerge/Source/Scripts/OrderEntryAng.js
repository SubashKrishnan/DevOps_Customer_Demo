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
		$scope.Order.intOrderID = document.getElementById("OrderId").value;
		$scope.Order.strOrderBuyerName = $scope.txtOrderBuyerName;
		$scope.Order.strOrderArticleNo = $scope.txtOrderArticleNo;
		$scope.Order.strOrderStyle = $scope.txtOrderStyle;
		$scope.Order.strOrderDescription = $scope.txtOrderDescription;
		$scope.Order.intOrderQty = $scope.txtOrderQty;
		$scope.Order.intOrderProgQty = $scope.txtOrderProgQty;
		$scope.Order.intOrderActQty = $scope.txtOrderActQty;
		$scope.Order.decOrderPcWtNet = $scope.txtOrderPcWtNet;
		$scope.Order.decOrderPcWtGross = $scope.txtOrderPcWtGross;
		$scope.Order.strOrderDelDate = $scope.txtOrderDelDate;
		$scope.Order.strOrderDespDate = $scope.txtOrderDespDate;
		$scope.Order.strOrderSublier = $scope.txtOrderSublier;
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
			url: "/api/AjaxAPI/GetOrders"
		}).then(function (response) {
			$scope.Orders = response.data;
		}, function () {
			alert("Error Occur");
		});
	};
	$scope.DeleteOrder = function (Order) {
		debugger;
		$scope.Order = {};
		$scope.Order.intOrderID = Order.ID;
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
		$scope.txtOrderBuyerName = Order.BUYER_NAME,
		$scope.txtOrderArticleNo = Order.ARTICLE_NO,
		$scope.txtOrderStyle = Order.STYLE,
		$scope.txtOrderDescription = Order.DESCRIPTION,
		$scope.txtOrderQty = Order.ORDER_QTY,
		$scope.txtOrderProgQty = Order.PROG_QTY,
		$scope.txtOrderActQty = Order.ACT_QTY,
		$scope.txtOrderPcWtNet = Order.PC_WT_NET,
		$scope.txtOrderPcWtGross = Order.PC_WT_GROSS,
		$scope.txtOrderDelDate = Order.DEL_DATE,
		$scope.txtOrderDespDate = Order.DESP_DATE,
		$scope.txtOrderSublier = Order.SUBLIER
		document.getElementById("btnSave").setAttribute("value", "Update");
	};
	$scope.ClearFields = function () {
		$scope.txtOrderBuyerName = "";
		$scope.txtOrderArticleNo = "";
		$scope.txtOrderStyle = "";
		$scope.txtOrderDescription = "";
		$scope.txtOrderQty = "";
		$scope.txtOrderProgQty = "";
		$scope.txtOrderActQty = "";
		$scope.txtOrderPcWtNet = "";
		$scope.txtOrderPcWtGross = "";
		$scope.txtOrderDelDate = "";
		$scope.txtOrderDespDate = "";
		$scope.txtOrderSublier = "";
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
		if ($scope.txtOrderStyle === "" | $scope.txtOrderStyle === undefined) {
			$("#divErrorStyle").css("display", "block");
			$("#txtOrderStyle").focus();
			return false;
		}
		else {
			$("#divErrorStyle").css("display", "none");
		}
		if ($scope.txtOrderDescription === "" | $scope.txtOrderDescription === undefined) {
			$("#divErrorDescription").css("display", "block");
			$("#txtOrderDescription").focus();
			return false;
		}
		else {
			$("#divErrorDescription").css("display", "none");
		}
		if ($scope.txtOrderQty === "" | $scope.txtOrderQty === undefined) {
			$("#divErrorQty").css("display", "block");
			$("#txtOrderQty").focus();
			return false;
		}
		else {
			$("#divErrorQty").css("display", "none");
		}
		if ($scope.txtOrderProgQty === "" | $scope.txtOrderProgQty === undefined) {
			$("#divErrorProgQty").css("display", "block");
			$("#txtOrderProgQty").focus();
			return false;
		}
		else {
			$("#divErrorProgQty").css("display", "none");
		}
		if ($scope.txtOrderActQty === "" | $scope.txtOrderActQty === undefined) {
			$("#divErrorActQty").css("display", "block");
			$("#txtOrderActQty").focus();
			return false;
		}
		else {
			$("#divErrorActQty").css("display", "none");
		}
		if ($scope.txtOrderPcWtNet === "" | $scope.txtOrderPcWtNet === undefined) {
			$("#divErrorPcWtNet").css("display", "block");
			$("#txtOrderPcWtNet").focus();
			return false;
		}
		else {
			$("#divErrorPcWtNet").css("display", "none");
		}
		if ($scope.txtOrderPcWtGross === "" | $scope.txtOrderPcWtGross === undefined) {
			$("#divErrorPcWtGross").css("display", "block");
			$("#txtOrderPcWtGross").focus();
			return false;
		}
		else {
			$("#divErrorPcWtGross").css("display", "none");
		}
		if ($scope.txtOrderDelDate === "" | $scope.txtOrderDelDate === undefined) {
			debugger;
			$("#divErrorDelDateValid").css("display", "none");
			$("#divErrorDelDate").css("display", "block");
			$("#txtOrderDelDate").focus();
			return false;
		}
		else {
			debugger;
			var dateString = $scope.txtOrderDelDate;
			var regex = /(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/;
			if (regex.test(dateString)) {
				var parts = dateString.split("/");
				var dt = new Date(parts[1] + "/" + parts[0] + "/" + parts[2]);
				var IsValid = (dt.getDate() == parts[0] && dt.getMonth() + 1 == parts[1] && dt.getFullYear() == parts[2]);
				if (IsValid == true) {
					$("#divErrorDelDateValid").css("display", "none");
				}
				else {
					$("#divErrorDelDateValid").css("display", "block");
					$("#divErrorDelDate").css("display", "none");
					$("#txtOrderDelDate").focus();
					return false;
				}
			}
			else {
				$("#divErrorDelDateValid").css("display", "block");
				$("#divErrorDelDate").css("display", "none");
				$("#txtOrderDelDate").focus();
				return false;
			}
			$("#divErrorDelDate").css("display", "none");
		}
		if ($scope.txtOrderDespDate === "" | $scope.txtOrderDespDate === undefined) {
			debugger;
			$("#divErrorDespDateValid").css("display", "none");
			$("#divErrorDespDate").css("display", "block");
			$("#txtOrderDespDate").focus();
			return false;
		}
		else {
			var dateString = $scope.txtOrderDespDate;
			var regex = /(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/;
			if (regex.test(dateString)) {
				var parts = dateString.split("/");
				var dt = new Date(parts[1] + "/" + parts[0] + "/" + parts[2]);
				var IsValid = (dt.getDate() == parts[0] && dt.getMonth() + 1 == parts[1] && dt.getFullYear() == parts[2]);
				if (IsValid == true) {
					$("#divErrorDespDateValid").css("display", "none");
				}
				else {
					$("#divErrorDespDateValid").css("display", "block");
					$("#divErrorDespDate").css("display", "none");
					$("#txtOrderDespDate").focus();
					return false;
				}
			}
			else {
				$("#divErrorDespDateValid").css("display", "block");
				$("#divErrorDespDate").css("display", "none");
				$("#txtOrderDespDate").focus();
				return false;
			}
			$("#divErrorDespDate").css("display", "none");
		}
		if ($scope.txtOrderBuyerName === "" | $scope.txtOrderBuyerName === undefined) {
			$("#divErrorBuyerName").css("display", "block");
			$("#txtOrderBuyerName").focus();
			return false;
		}
		else {
			$("#divErrorBuyerName").css("display", "none");
		}
		if ($scope.txtOrderSublier === "" | $scope.txtOrderSublier === undefined) {
			$("#divErrorSublier").css("display", "block");
			$("#txtOrderSublier").focus();
			return false;
		}
		else {
			$("#divErrorSublier").css("display", "none");
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