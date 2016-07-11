angular.module('app', [
  'app.auth',
  'ngRoute'
])
.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'index.html',
      controller: 'AuthController'
    })
    .when('/signup', {
	  templateUrl: 'app/auth/signup.html',
	  controller: 'AuthController'
    })
    .when('/login', {
      templateUrl: 'app/auth/login.html'
      controller: 'AuthController'
    })
    .otherwise({
      redirectTo:'/'
    });
})
 // here inside the run phase of angular, our services and controllers
 // have just been registered and our app is ready
 // however, we want to make sure the user is authorized
 // we listen for when angular is trying to change routes
 // when it does change routes, we then look for the token in localstorage
 // and send that token to the server to see if it is a real user or hasn't expired
 // if it's not valid, we then redirect back to signin/signup

.run(function($rootScope, $location, Auth) {
  $rootScope.$on('routeChangeStart', function(evt, next, current){
    if (next.$$route && next.$$route.authenticate && !Autho.isAuth(){
      $location.path('/login');
    }
  });
});
