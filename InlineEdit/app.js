var myApp = angular.module('myApp', []);    

//myApp.config(['$compileProvider', function ($compileProvider) {
//    $compileProvider.debugInfoEnabled(false);
//}]);

myApp.controller('my', ['$scope', function ($scope) {
    $scope.selected = {};
    $scope.employees = [{ empID: 1000, empName: 'Kunal0', empEmail: 'kunal0@xyz', empSalary: 63723, active: true },
                        { empID: 1001, empName: 'Kunal1', empEmail: 'kunal1@xyz', empSalary: 63723, active: true },
                        { empID: 1002, empName: 'Kunal2', empEmail: 'kunal2@xyz', empSalary: 63723, active: true },
                        { empID: 1003, empName: 'Kunal3', empEmail: 'kunal3@xyz', empSalary: 63723, active: true },
                        { empID: 1004, empName: 'Kunal4', empEmail: 'kunal4@xyz', empSalary: 63723, active: true },
                        { empID: 1005, empName: 'Kunal5', empEmail: 'kunal5@xyz', empSalary: 63723, active: true }];
    $scope.getTemplate = function (employee) {  
        if (employee.empID === $scope.selected.empID){  
            return "edit.html";  
        }  
        else return "display.html";  
    }
    $scope.editEmployee = function (employee) {  
        $scope.selected = angular.copy(employee);  
    }
    $scope.reset = function () {  
        $scope.selected = {};  
    }

    $scope.delete = function (employeeID) {
        for(var index = 0; index< $scope.employees.length; index++)
        {
            if ($scope.employees[index].empID == employeeID)
            {
                $scope.employees.splice(index, 1);
                break;
            }
        }
    }

    $scope.confirmObject = {
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this Record?',
        confirmText: 'Confirm',
        cancelText: 'Cancel',
        confirmButtonType: 'danger',
        cancelButtonType: 'default',
        placement: 'left',
        hideConfirmButton: false,
        hideCancelButton: false,
        animation: false
    }

}]);


myApp.directive('confirmDelete', function () {
    return {
        restrict: 'A',
        controller: ['$scope', '$compile', '$element', function ($scope, $compile, $element) {
            var html = '<div id="confirmdelete" class="popover {{confirmObject.placement}}">\
                        <div class="popover-arrow arrow"></div>\
                        <h3 class="popover-title">{{confirmObject.title}}</h3>\
                        <div class="popover-content">\
                            <p>{{confirmObject.message}}</p>\
                            <div class="row">\
                                <div class="col-xs-6">\
                                    <button class="btn btn-block confirm-button btn-{{confirmObject.confirmButtonType}}" ng-click="onConfirm()">{{confirmObject.confirmText}}</button>\
                                </div>\
                                <div class="col-xs-6">\
                                    <button class="btn btn-block cancel-button btn-{{confirmObject.cancelButtonType}}" ng-click="onCancel()">{{confirmObject.cancelText}}</button>\
                                </div>\
                            </div>\
                        </div>\
                    </div>';
            var isVissibel = false;
            var confirmDialog;
            var employeeID;
            $scope.onDelete = function (employeeId) {
                if (!isVissibel) {
                    employeeID = employeeId;
                    confirmDialog = $compile(html)($scope);                    
                    $('body').append(confirmDialog);                    
                    isVissibel = true;
                    $('.popover').show();
                    confirmDialogPosition();
                } else
                    $scope.hidePopover();
            }

            $scope.hidePopover = function () {
                console.log('we are in hide ');
                isVissibel = false;
                $('.popover').remove();
            }

            $scope.onConfirm = function () {
                console.log('we are in onConfirm ' + employeeID);
                $scope.delete(employeeID);
                $scope.hidePopover();
            }

            $scope.onCancel = function () {
                console.log('we are in oncancel ' + employeeID);
                $scope.hidePopover();
            }

            var confirmDialogPosition = function () {
                var elemtop = $element.offset().top;
                var elemleft = $element.offset().left;
                var elemheight = $element.height();

                var top = ((elemheight / 2) + elemtop) - ($('#confirmdelete').height() / 2);
                var left = elemleft - $('#confirmdelete').width();

                top += 'px';
                left += 'px';                
                confirmDialog.css("top", top);
                confirmDialog.css("left", left);
            }
        }]
    }
});
