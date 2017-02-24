angular
  .module('app.services')
  .factory('Direcciones', function(){
     	var objeto = {};
	    objeto.nombre = "Factory de Rutas";
	    objeto.firebaseUser= "https://final-138aa.firebaseio.com/final/user";
	    objeto.firebaseJuego= "https://final-138aa.firebaseio.com/final/juego";
	    objeto.firebasePartida= "https://final-138aa.firebaseio.com/final/partida";
	     objeto.firebaseSolicitud= "https://final-138aa.firebaseio.com/final/solicitud";
	    return objeto;
  })//Cierra factory