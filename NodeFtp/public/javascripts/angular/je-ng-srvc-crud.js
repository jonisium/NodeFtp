/// <reference path='"../angular.js"'>
/// <reference path='"je-ng-app.js"'>


ngApp.service('srvcCRUD', function ($http) {
    //Create new record
    this.post = function (myData) {
        var request = $http({
            method: "post",
            url: "/api",
            data: myData
        });
        return request;
    }
    //Get Single Records
    this.get = function (id) {
        return $http.get("/api/" + id);
    }

    //Get All Employees
    this.getAll = function () {
        return $http.get("/api");
    }


    //Update the Record
    this.put = function (id, myData) {
        var request = $http({
            method: "put",
            url: "/api/" + id,
            data: myData
        });
        return request;
    }
    //Delete the Record
    this.delete = function (id) {
        var request = $http({
            method: "delete",
            url: "/api/" + id
        });
        return request;
    }
});

/// </reference> </reference>
