angular
  .module('app.services')
  .factory('Direcciones', function(){
     	var objeto = {};
	    objeto.nombre = "Factory de Rutas";
	    objeto.firebaseUser= "https://final-138aa.firebaseio.com/final/user";
	    objeto.firebaseJuego= "https://final-138aa.firebaseio.com/final/juego";
	    return objeto;
  })//Cierra factory