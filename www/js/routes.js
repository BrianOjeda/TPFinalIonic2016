angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('sala', {
    url: '/sala',
    templateUrl: 'templates/sala.html',
    controller: 'salaCtrl'
  })

  .state('menu', {
    url: '/menu',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('crearjuego', {
    url: '/crearjuego',
    templateUrl: 'templates/crearjuego.html',
    controller: 'crearjuegoCtrl'
  })

  .state('crearusuario', {
    url: '/crearusuario',
    templateUrl: 'templates/crearusuario.html',
    controller: 'crearusuarioCtrl'
  })

  .state('juego', {
    url: '/juego',
    templateUrl: 'templates/juego.html',
    controller: 'juegoCtrl'
  })

$urlRouterProvider.otherwise('/login')

  

});