var app = angular.module("myApp", ['angularUtils.directives.dirPagination']);
app.directive("dateTimePicker", DatetimePicker)
app.directive('numbersOnly', NumbersOnly);
app.directive('decimalOnly', DecimalOnly);
//app.directive("dateTimePicker", DatetimePicker2)
app.controller("myCtrl", function ($scope, $http, $timeout) {
    $scope.AddUpdateDyeingEntry = function () {

        //var Action = document.getElementById("btnSave").getAttribute("value");
        var validations = $scope.Validations();
        if (validations === false) {
            return;
        }
        $scope.DyeingEntry = {};
        $scope.DyeingEntry.intDyeingEntryID = document.getElementById("DyeingEntryId").value;
        $scope.DyeingEntry.intDyeingEntryBuyerNameID = $scope.ddlDyeingEntryBuyerName;
        $scope.DyeingEntry.strDyeingEntryName = $scope.txtDyeingEntryName;
        $scope.DyeingEntry.strDyeingEntryColour = $scope.txtDyeingEntryColour;
        $scope.DyeingEntry.decDyeingEntryQty = $scope.txtDyeingEntryQty;
        $scope.DyeingEntry.decDyeingEntryRatePrecost = $scope.txtDyeingEntryRatePrecost;
        $scope.DyeingEntry.decDyeingEntryRateActual = $scope.txtDyeingEntryRateActual;
        $scope.DyeingEntry.decDyeingEntryPercentage = $scope.txtDyeingEntryPercentage;
        $scope.DyeingEntry.decDyeingEntryTlRatePrecost = $scope.txtDyeingEntryTlRatePrecost;
        $scope.DyeingEntry.decDyeingEntryTlRateActual = $scope.txtDyeingEntryTlRateActual;
        $scope.DyeingEntry.intMode = 1;
        $http({
            method: "post",
            url: "/api/AjaxAPI/AddUpdateDyeingEntry",
            datatype: "json",
            data: JSON.stringify($scope.DyeingEntry)
        }).then(function (response) {
            $scope.Msg = response.data;
            document.getElementById("btnSave").setAttribute("value", "Save");
            $scope.AutoHideMsgs();
            $scope.GetAllDyeingEntry();
            $scope.ClearFields();
        });

    };
    $scope.GetAllDyeingEntry = function () {
        $scope.GetAllBuyernames();
        $http({
            method: "get",
            url: "/api/AjaxAPI/GetAllDyeingEntry"
        }).then(function (response) {
            $scope.DyeingEntrys = response.data;
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
    $scope.DeleteDyeingEntry = function (DyeingEntry) {
        $scope.DyeingEntry = {};
        $scope.DyeingEntry.intDyeingEntryID = DyeingEntry.ID;
        $scope.DyeingEntry.intMode = 2;
        $http({
            method: "post",
            url: "/api/AjaxAPI/AddUpdateDyeingEntry",
            datatype: "json",
            data: JSON.stringify($scope.DyeingEntry)
        }).then(function (response) {
            $scope.Msg = response.data;
            $scope.AutoHideMsgs();
            $scope.GetAllDyeingEntry();
        });
    };
    $scope.EditDyeingEntry = function (DyeingEntry) {
        $scope.GetAllBuyernames();
        debugger;
        document.getElementById("DyeingEntryId").value = DyeingEntry.ID;
        $scope.ddlDyeingEntryBuyerName = DyeingEntry.ORDER_ID;
        $scope.txtDyeingEntryName = DyeingEntry.NAME;
        $scope.txtDyeingEntryColour = DyeingEntry.COLOUR;
        $scope.txtDyeingEntryQty = DyeingEntry.QTY;
        $scope.txtDyeingEntryRatePrecost = DyeingEntry.RATE_PRECOST;
        $scope.txtDyeingEntryRateActual = DyeingEntry.RATE_ACTUAL;
        $scope.txtDyeingEntryPercentage = DyeingEntry.PERCENTAGE;
        $scope.txtDyeingEntryTlRatePrecost = DyeingEntry.TL_RATE_PRECOST;
        $scope.txtDyeingEntryTlRateActual = DyeingEntry.TL_RATE_ACTUAL;

        document.getElementById("btnSave").setAttribute("value", "Update");
    };
    $scope.ClearFields = function () {
        $scope.ddlDyeingEntryBuyerName = "";
        $scope.txtDyeingEntryName = "";
        $scope.txtDyeingEntryColour = "";
        $scope.txtDyeingEntryQty = "";
        $scope.txtDyeingEntryRatePrecost = "";
        $scope.txtDyeingEntryRateActual = "";
        $scope.txtDyeingEntryPercentage = "";
        $scope.txtDyeingEntryTlRatePrecost = "";
        $scope.txtDyeingEntryTlRateActual = "";
        document.getElementById("DyeingEntryId").value = 0;
    }
    $scope.Validations = function () {
        debugger;
        if ($scope.ddlDyeingEntryBuyerName === "" | $scope.ddlDyeingEntryBuyerName === undefined) {
            $("#divErrorBuyerName").css("display", "block");
            $("#ddlDyeingEntryBuyerName").focus();
            return false;
        }
        else {
            $("#divErrorBuyerName").css("display", "none");
        }

        if ($scope.txtDyeingEntryName === "" | $scope.txtDyeingEntryName === undefined) {
            $("#divErrorName").css("display", "block");
            $("#txtDyeingEntryName").focus();
            return false;
        }
        else {
            $("#divErrorName").css("display", "none");
        }

        if ($scope.txtDyeingEntryColour === "" | $scope.txtDyeingEntryColour === undefined) {
            $("#divErrorColour").css("display", "block");
            $("#txtDyeingEntryColour").focus();
            return false;
        }
        else {
            $("#divErrorColour").css("display", "none");
        }

        if ($scope.txtDyeingEntryQty === "" | $scope.txtDyeingEntryQty === undefined) {
            $("#divErrorQuantity").css("display", "block");
            $("#txtDyeingEntryQty").focus();
            return false;
        }
        else {
            $("#divErrorQuantity").css("display", "none");
        }

        if ($scope.txtDyeingEntryRatePrecost === "" | $scope.txtDyeingEntryRatePrecost === undefined) {
            $("#divErrorRatePrecost").css("display", "block");
            $("#txtDyeingEntryRatePrecost").focus();
            return false;
        }
        else {
            $("#divErrorRatePrecost").css("display", "none");
        }

        if ($scope.txtDyeingEntryRateActual === "" | $scope.txtDyeingEntryRateActual === undefined) {
            $("#divErrorRateActual").css("display", "block");
            $("#txtDyeingEntryRateActual").focus();
            return false;
        }
        else {
            $("#divErrorRateActual").css("display", "none");
        }

        if ($scope.txtDyeingEntryPercentage === "" | $scope.txtDyeingEntryPercentage === undefined) {
            $("#divErrorPercentage").css("display", "block");
            $("#txtDyeingEntryPercentage").focus();
            return false;
        }
        else {
            $("#divErrorPercentage").css("display", "none");
        }

        if ($scope.txtDyeingEntryTlRatePrecost === "" | $scope.txtDyeingEntryTlRatePrecost === undefined) {
            $("#divErrorTlRatePrecost").css("display", "block");
            $("#txtDyeingEntryTlRatePrecost").focus();
            return false;
        }
        else {
            $("#divErrorTlRatePrecost").css("display", "none");
        }
        if ($scope.txtDyeingEntryTlRateActual === "" | $scope.txtDyeingEntryTlRateActual === undefined) {
            $("#divErrorTlRateActual").css("display", "block");
            $("#txtDyeingEntryTlRateActual").focus();
            return false;
        }
        else {
            $("#divErrorTlRateActual").css("display", "none");
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