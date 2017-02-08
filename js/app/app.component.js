(function (){
  angular.module('app')
  .component('app', {
    templateUrl: '/js/app/app.template.html',
    controller: AppController
    });

    AppController.inject = ['$state', '$stateParams', '$http', 'userService'];
    function AppController ($state, $stateParams, $http, userService){
      const vm = this;
      
    }
})();
