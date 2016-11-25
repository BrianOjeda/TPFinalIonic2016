angular.module('app.controllers', [])
  
.controller('loginCtrl', ['$scope', '$stateParams','User', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,User) {

	$scope.login=function()
	{
		User.Login($("#email").val(),$("#pass").val());
	};
	
}])
   
.controller('salaCtrl', ['$scope', '$stateParams','Direcciones', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,Direcciones) {
			$scope.juegos=[];
			var messagesRef=new Firebase(Direcciones.firebaseJuego);
			var c=0;
			messagesRef.on('child_added', function (snapshot) {
		    //GET DATA
		    	c=c+1;
			    var objs = snapshot.val();
			    juego=new Object();
			    juego.nombre=objs.nombre;
			    juego.email=objs.email;
			    juego.apuestas=objs.apuestas;
			    juego.objeto="juego"+c;
		   		//$scope.juegos=data;
		   		$scope.juegos.push(juego);
		   		console.log($scope.juegos);
		   		//$("#juegos").append('<ion-item><ion-label>'+data.nombre+'</ion-label><ion-radio  value="'+data.email+'"></ion-radio></ion-item>');
		   
		  });
			$scope.cambiar=function()
			{
				var adaNameRef = firebase.database().ref('final/juego/apuesta');
				// Modify the 'first' and 'last' properties, but leave other data at
				// adaNameRef unchanged.
				adaNameRef.update({ first: '23', last: '50' });
			}
		 
}])
   
.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('crearjuegoCtrl', ['$scope', '$stateParams','User','Direcciones', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,User,Direcciones) {

			$scope.guardarjuego=function()
			{
				var user=User.TraerDatosUsuario();
				console.log(user.email);
				var messagesRef = new Firebase(Direcciones.firebaseJuego);
             	messagesRef.push({nombre:$("#nombre").val(),apuesta:$("#apuesta").val(),email:user.email});
             	console.log("Datos almacenados");	
             	window.location.href="#/sala";
			}
	
}])
   
.controller('crearusuarioCtrl', ['$scope', '$stateParams','User', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,User) {

	$scope.CrearUsuario=function(){
		//alert($("#email").val());
		User.CrearUsuario($("#email").val(),$("#password").val(),$("#nombre").val(),$("#apellido").val(),$("#telefono").val());
	};
	
}])
   
.controller('juegoCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
 