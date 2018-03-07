var app = angular.module("myApp", ['angularUtils.directives.dirPagination']);
app.directive("dateTimePicker", DatetimePicker)
app.directive('numbersOnly', NumbersOnly);
app.directive('decimalOnly', DecimalOnly);
//app.directive("dateTimePicker", DatetimePicker2)
app.controller("myCtrl", function ($scope, $http, $timeout) {
	$scope.AddUpdateCostingEntry = function () {
		
		//var Action = document.getElementById("btnSave").getAttribute("value");
		var validations = $scope.Validations();
		if (validations === false) {
			return;
		}
		$scope.CostingEntry = {};
		$scope.CostingEntry.intCostingEntryID = document.getElementById("CostingEntryId").value;
		$scope.CostingEntry.intCostingEntryparticularsID = $scope.ddlCostingEntryParticular;
		$scope.CostingEntry.intCostingEntryBuyerNameID = $scope.ddlCostingEntryBuyerName;
		$scope.CostingEntry.strCostingEntryName = $scope.txtCostingEntryName;
		$scope.CostingEntry.decCostingEntryCottonPrecost = $scope.txtCostingEntryCottonPrecost;
		$scope.CostingEntry.decCostingEntryCottonActual = $scope.txtCostingEntryCottonActual;
		$scope.CostingEntry.decCostingEntryRibPrecost = $scope.txtCostingEntryRibPrecost;
		$scope.CostingEntry.decCostingEntryRibActual = $scope.txtCostingEntryRibActual;
		$scope.CostingEntry.decCostingEntryOthersPrecost = $scope.txtCostingEntryOthersPrecost;
		$scope.CostingEntry.decCostingEntryOthersActual = $scope.txtCostingEntryOthersActual;
		$scope.CostingEntry.intMode = 1;
		$http({
			method: "post",
			url: "/api/AjaxAPI/AddUpdateCostingEntry",
			datatype: "json",
			data: JSON.stringify($scope.CostingEntry)
		}).then(function (response) {
			$scope.Msg = response.data;
			document.getElementById("btnSave").setAttribute("value", "Save");
				$scope.AutoHideMsgs();
				$scope.GetAllCostingEntry();
				$scope.ClearFields();
		});

	};
	$scope.GetAllCostingEntry = function () {
	    $scope.GetAllParticulars();
	    $scope.GetAllBuyernames();
		$http({
			method: "get",
			url: "/api/AjaxAPI/GetAllCostingEntry"
		}).then(function (response) {
			$scope.CostingEntrys = response.data;
		}, function () {
			alert("Error Occur");
		});
	};
	$scope.GetAllParticulars = function () {
		$http({
			method: "get",
			url: "/api/AjaxAPI/GetAllParticulars"
		}).then(function (response) {
			$scope.Particulars = response.data;
			//$scope.Orders = response.data;
		}, function () {
			alert("Error Occur");
		});
	};
	$scope.GetAllBuyernames = function () {
		$http({
			method: "get",
			url: "/api/AjaxAPI/GetAllBuyernames"
		}).then(function (response) {
			$scope.BuyerNames = response.data;
			//$scope.Orders = response.data;
		}, function () {
			alert("Error Occur");
		});
	};
	$scope.DeleteCostingEntry = function (CostingEntry) {
		$scope.CostingEntry = {};
		$scope.CostingEntry.intCostingEntryID = CostingEntry.ID;
		$scope.CostingEntry.intMode = 2;
		$http({
			method: "post",
			url: "/api/AjaxAPI/AddUpdateCostingEntry",
			datatype: "json",
			data: JSON.stringify($scope.CostingEntry)
		}).then(function (response) {
			$scope.Msg = response.data;
			$scope.AutoHideMsgs();
			$scope.GetAllCostingEntry();
		});
	};
	$scope.EditCostingEntry = function (CostingEntry) {
		debugger;
	    $scope.GetAllParticulars();
	    $scope.GetAllBuyernames();
		document.getElementById("CostingEntryId").value = CostingEntry.ID;
		$scope.ddlCostingEntryParticular = CostingEntry.PARTICULARS_ID;
		$scope.ddlCostingEntryBuyerName = CostingEntry.ORDER_ID;
		$scope.txtCostingEntryName = CostingEntry.NAME;
		$scope.txtCostingEntryCottonPrecost = CostingEntry.COTTON_PRECOST;
		$scope.txtCostingEntryCottonActual = CostingEntry.COTTON_ACTUAL;
		$scope.txtCostingEntryRibPrecost = CostingEntry.RIB_PRECOST;
		$scope.txtCostingEntryRibActual = CostingEntry.RIB_ACTUAL;
		$scope.txtCostingEntryOthersPrecost = CostingEntry.OTHERS_PRECOST;
		$scope.txtCostingEntryOthersActual = CostingEntry.OTHERS_ACTUAL;

		document.getElementById("btnSave").setAttribute("value", "Update");
	};
	$scope.ClearFields = function () {
	    $scope.ddlCostingEntryParticular = "";
		$scope.ddlCostingEntryBuyerName = "";
		$scope.txtCostingEntryName = "";
		$scope.txtCostingEntryCottonPrecost = "";
		$scope.txtCostingEntryCottonActual = "";
		$scope.txtCostingEntryRibPrecost = "";
		$scope.txtCostingEntryRibActual = "";
		$scope.txtCostingEntryOthersPrecost = "";
		$scope.txtCostingEntryOthersActual = "";
		document.getElementById("CostingEntryId").value = 0;
	}
	$scope.Validations = function () {
	    debugger;
	    if ($scope.ddlCostingEntryParticular === "" | $scope.ddlCostingEntryParticular === undefined) {
	        $("#divErrorParticular").css("display", "block");
			$("#ddlCostingEntryParticular").focus();
			return false;
		}
		else {
	        $("#divErrorParticular").css("display", "none");
		}
		
	    if ($scope.ddlCostingEntryBuyerName === "" | $scope.ddlCostingEntryBuyerName === undefined) {
	        $("#divErrorBuyerName").css("display", "block");
			$("#ddlCostingEntryBuyerName").focus();
			return false;
		}
		else {
	        $("#divErrorBuyerName").css("display", "none");
		}
		
	    if ($scope.txtCostingEntryName === "" | $scope.txtCostingEntryName === undefined) {
	        $("#divErrorName").css("display", "block");
			$("#txtCostingEntryName").focus();
			return false;
		}
		else {
	        $("#divErrorName").css("display", "none");
		}
		
	    if ($scope.txtCostingEntryCottonPrecost === "" | $scope.txtCostingEntryCottonPrecost === undefined) {
	        $("#divErrorCottonPrecost").css("display", "block");
			$("#txtCostingEntryCottonPrecost").focus();
			return false;
		}
		else {
	        $("#divErrorCottonPrecost").css("display", "none");
		}
		
	    if ($scope.txtCostingEntryCottonActual === "" | $scope.txtCostingEntryCottonActual === undefined) {
	        $("#divErrorCottonActual").css("display", "block");
			$("#txtCostingEntryCottonActual").focus();
			return false;
		}
		else {
	        $("#divErrorCottonActual").css("display", "none");
		}
		
	    if ($scope.txtCostingEntryRibPrecost === "" | $scope.txtCostingEntryRibPrecost === undefined) {
	        $("#divErrorRibPrecost").css("display", "block");
			$("#txtCostingEntryRibPrecost").focus();
			return false;
		}
		else {
	        $("#divErrorRibPrecost").css("display", "none");
		}
		
	    if ($scope.txtCostingEntryRibActual === "" | $scope.txtCostingEntryRibActual === undefined) {
	        $("#divErrorRibActual").css("display", "block");
			$("#txtCostingEntryRibActual").focus();
			return false;
		}
		else {
	        $("#divErrorRibActual").css("display", "none");
		}
		
	    if ($scope.txtCostingEntryOthersPrecost === "" | $scope.txtCostingEntryOthersPrecost === undefined) {
	        $("#divErrorOthersPrecost").css("display", "block");
			$("#txtCostingEntryOthersPrecost").focus();
			return false;
		}
		else {
	        $("#divErrorOthersPrecost").css("display", "none");
		}
		
	    if ($scope.txtCostingEntryOthersActual === "" | $scope.txtCostingEntryOthersActual === undefined) {
	        $("#divErrorOthersActual").css("display", "block");
			$("#txtCostingEntryOthersActual").focus();
			return false;
		}
		else {
	        $("#divErrorOthersActual").css("display", "none");
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
				format: "DD-MMM-YYYY",
				showTodayButton: true
				//pickTime: true
			});
			dtp.on("dp.change", function (e) {
				ngModelCtrl.$setViewValue(moment(e.date).format("DD-MMM-YYYY"));
				scope.$apply();
			});
		}
	};
}
function NumbersOnly () {
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
		link: function(scope, element, attrs, ngModelCtrl) {
			if(!ngModelCtrl) {
				return; 
			}

			ngModelCtrl.$parsers.push(function(val) {
				if (angular.isUndefined(val)) {
					var val = '';
				}
				var clean = val.replace(/[^0-9\.]/g, '');
				var decimalCheck = clean.split('.');

				if(!angular.isUndefined(decimalCheck[1])) {
					decimalCheck[1] = decimalCheck[1].slice(0,3);
					clean =decimalCheck[0] + '.' + decimalCheck[1];
				}

				if (val !== clean) {
					ngModelCtrl.$setViewValue(clean);
					ngModelCtrl.$render();
				}
				return clean;
			});

			element.bind('keypress', function(event) {
				if(event.keyCode === 32) {
					event.preventDefault();
				}
			});
		
		}
	};
}