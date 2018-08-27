(function(){
    angular.module('heepsApp',['ngRoute', 'ui.bootstrap'])
        .config(['$routeProvider',config])
        .run(['$http',run])

    function config($routeProvder){
        $routeProvder
        .when('/',{
            templateUrl: 'static/components/home/home.html',
            controller: 'homeController'
        })
        .when('/appointments',{
            templateUrl: 'static/components/appointments/appointments.html',
            controller: 'appointmentsController'
        })
        .when('/login',{
            templateUrl: 'static/components/login/login.html',
            controller: 'loginController'
        })
        .when('/admin',{
            templateUrl: 'static/components/admin/admin.html',
            controller: 'adminController'
        })
        .when('/availability',{
            templateUrl: 'static/components/appointments/availability.html',
            controller: 'availabilityController'
        })
        .when('/transactions',{
            templateUrl:'static/components/transactions/transactions.html',
            controller: 'transactionsController'
        })
        .when('/register',{
            templateUrl: 'static/components/login/new-user.html',
            controller: 'newUserController'
        })
        .when('/forgot_password',{
            templateUrl: 'static/components/login/forgot-password.html',
            controller: 'forgotPasswordController'
        })
        .when('/reset_password',{
            templateUrl: 'static/components/login/reset-password.html'
        })
        .otherwise('/');
    }

    function run($http){
        $http.defaults.xsrfHeaderName = 'X-CSRFToken';
        $http.defaults.xsrfCookieName = 'csrftoken';
    }

})()