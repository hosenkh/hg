(function (ng) {
  var
  ctrl = function ($scope) {
    
  },

  configurator = function ($routeProvider) {
    $routeProvider
      .when('/abcd', {
        controller: 'mainctrl'
      })
      .otherwise({
        redirectTo: '/abcd'
      });
  },
  
  init = function () {
    ng
      .module('runDemo', ['ngRoute'])
      .config(['$routeProvider', configurator])
      .controller('mainctrl', ['$scope', ctrl]);
  }
  ;
  return {init: init};
})(window.angular).init();