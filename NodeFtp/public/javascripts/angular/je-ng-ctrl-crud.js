/// <reference path='"../angular.js"'>
/// <reference path='"je-ng-app.js"'>
/// <reference path='"je-ng-srvc-crud.js"'>

//The controller is having 'srvcCRUD' dependency.
//This controller makes call to methods from the service 
ngApp.controller('ctrlCRUD', function ($scope, srvcCRUD) {

    $scope.IsNewRecord = 1; //The flag for the new record


        loadRecords();

    //Function to load all Employee records
    function loadRecords() {
        var promiseGet = srvcCRUD.getAll(); //The MEthod Call from service

        promiseGet.then(function (pl) { $scope.myData = pl.data },
              function (errorPl) {
                  $log.error('failure loading data', errorPl);
              });
    }

    //The Save scope method use to define the Data object.
    //In this method if IsNewRecord is not zero then Update Data else 
    //Create the Data information to the server
    $scope.save = function () {
        var Data = {
            FirstName: "Edward",
            LastName: "Scissorhand"
        };

        //If the flag is 1 the it si new record
        if ($scope.IsNewRecord === 1) {
            var promisePost = srvcCRUD.post(Data);
            promisePost.then(function (pl) {
                $scope.FirstName = pl.data.FirstName;
                loadRecords();
            }, function (err) {
                console.log("Err" + err);
            });
        } else { //Else Edit the record
            var promisePut = srvcCRUD.put($scope.Id, Data);
            promisePut.then(function (pl) {
                $scope.Message = "Updated Successfuly";
                loadRecords();
            }, function (err) {
                console.log("Err" + err);
            });
        }



    };

    //Method to Delete
    $scope.delete = function () {
        var promiseDelete = srvcCRUD.delete($scope.Id);
        promiseDelete.then(function (pl) {
            //$scope.Message = "Deleted Successfuly";
            //$scope.EmpNo = 0;
            //$scope.EmpName = "";
            //$scope.Salary = 0;
            //$scope.DeptName = "";
            //$scope.Designation = "";
            loadRecords();
        }, function (err) {
            console.log("Err" + err);
        });
    }

    //Method to Get Single data
    $scope.get = function (id) {
        var promiseGetSingle = srvcCRUD.get(id);

        promiseGetSingle.then(function (pl) {
            //var res = pl.data;
            //$scope.EmpNo = res.EmpNo;
            //$scope.EmpName = res.EmpName;
            //$scope.Salary = res.Salary;
            //$scope.DeptName = res.DeptName;
            //$scope.Designation = res.Designation;
            $scope.IsNewRecord = 0;
        },
                  function (errorPl) {
                      console.log('failure loading data', errorPl);
                  });
    }
    //Clear the Scopr models
    $scope.clear = function () {
        //$scope.IsNewRecord = 1;
        //$scope.EmpNo = 0;
        //$scope.EmpName = "";
        //$scope.Salary = 0;
        //$scope.DeptName = "";
        //$scope.Designation = "";
    }
});

/// </reference> </reference></reference>