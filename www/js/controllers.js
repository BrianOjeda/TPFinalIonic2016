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
 .controller('perfilCtrl', ['$scope', '$stateParams','User','Direcciones',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,User,Direcciones) {

			var messagesRef=new Firebase(Direcciones.firebaseUser);
			var c=0;
			var user=User.TraerDatosUsuario();
			messagesRef.on('child_added', function (snapshot) {
		    //GET DATA
		    var data=snapshot.val();
		    	if (user.email=data.email)
		    		{
		    			$scope.Apellido=data.apellido;
		    			$scope.Dni=data.dni;
		    			$scope.Email=data.email;
		    			$scope.Telefono=data.telefono;
		    			$scope.Nombre=data.nombre;
		    			$scope.Monedas=data.monedas; 
		    		}
		   		//$("#juegos").append('<ion-item><ion-label>'+data.nombre+'</ion-label><ion-radio  value="'+data.email+'"></ion-radio></ion-item>');
		   
			 });
	
	
}])  

.controller('salaCtrl', ['$scope', '$stateParams','Direcciones','User', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,Direcciones,User) {


	
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
			    juego.apuesta=objs.apuesta;
			    juego.objeto="juego"+c;
		   		//$scope.juegos=data;
		   		$scope.juegos.push(juego);
		   		console.log($scope.juegos);
		   		//$("#juegos").append('<ion-item><ion-label>'+data.nombre+'</ion-label><ion-radio  value="'+data.email+'"></ion-radio></ion-item>');
		   
		  });

			$scope.Comenzar=function()
			{		
					
					var c=0;
					var user=User.TraerDatosUsuario();
						$("input[name=cuadro]").each(function (index) {  
							console.log("Estoy en el each");
							  if($(this).is(':checked'))
							  {
							  	var valordelradio=$(this).val();
							  	console.log("Estoy en el if");
								  	var datosdeusuarios=new Firebase(Direcciones.firebaseUser);

									datosdeusuarios.on('child_added', function (snapshot) {
					   				 //GET DATA	 
					   				 console.log("Estoy en traer datos");
					   				 		var data=snapshot.val();

					   				 		if (valordelradio==data.email)
					   				 		 {
					   				 		 	console.log("Estoy comparando");
					   				 		 	var updatepartida = firebase.database().ref('final/partida/'+data.dni);
					   				 		 	updatepartida.update({ emailuser:user.email});
					   				 		 	console.log("Datos Actualizados");
					   				 		 	var deletejuego = firebase.database().ref('final/juego/'+data.dni);
												deletejuego.remove()
												  .then(function() {
												    console.log("Remove succeeded.");
												    window.location.href="#/juego";
												  })
												  .catch(function(error) {
												    console.log("Remove failed: " + error.message);
												  });
					   				 		 }        
						 		         
								         	console.log("Datos almacenados");
							         });
						       }
						});
				  
			}
		   
}])
   
.controller('menuCtrl', ['$scope', '$stateParams','User','Direcciones','$timeout', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,User,Direcciones,$timeout) {
			$timeout(function () {
						var user=User.TraerDatosUsuario();
						$scope.visibilidad=true;
						var messagesRef=new Firebase(Direcciones.firebaseJuego);
								
						messagesRef.on('child_added', function (snapshot) {
							var dato=snapshot.val();
							if (dato.email==user.email)
								{
									$scope.visibilidad=false;
								}
				              	
				        });
			}, 5000);
		 
}])
   
.controller('crearjuegoCtrl', ['$scope', '$stateParams','User','Direcciones', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,User,Direcciones) {

			$scope.guardarjuego=function()
			{
				var user=User.TraerDatosUsuario();
	
             	var messagesRef=new Firebase(Direcciones.firebaseUser);
		
				messagesRef.on('child_added', function (snapshot) {

						var dato=snapshot.val();
		           		if(user.email==dato.email){

		           				var adaNameRef = firebase.database().ref('final/juego/'+dato.dni);
								adaNameRef.update({ nombre:$("#nombre").val(),apuesta:$("#apuesta").val(),email:user.email});
								//console.log("todo bien");
				             	console.log("Datos almacenados");	
				             	window.location.href="#/juego";

		           		}
		              	
		        });
			}
	
}])
   
.controller('crearusuarioCtrl', ['$scope', '$stateParams','User', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,User) {

	$scope.CrearUsuario=function(){
		//alert($("#email").val());
		User.CrearUsuario($("#email").val(),$("#password").val(),$("#nombre").val(),$("#apellido").val(),$("#telefono").val(),$("#dni").val(),"100");
	};
	
}])
   
.controller('juegoCtrl', ['$scope', '$stateParams','User','Direcciones','$timeout',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,User,Direcciones,$timeout) {

	$scope.partida=function()
	{
		
		
		var user=User.TraerDatosUsuario();
	    var messagesRef=new Firebase(Direcciones.firebaseJuego);
		var auxiliar=0;
		var nombrejuego="";	
			
				    messagesRef.on('child_added', function (snapshot) {
							var lala=snapshot.val();
							//console.log(lala);
							if(lala.email==user.email)
							{
								auxiliar=1;
								console.log("Entre en el uno");
								nombrejuego=lala.nombre;
							}
							else
							{
								auxiliar=2;
								console.log("Entre en el dos");
							}	
					 });
		
			$timeout(function () {
			if (auxiliar==1)
				{
					//admin
					var messagesRef=new Firebase(Direcciones.firebaseUser);
					messagesRef.on('child_added', function (snapshot) {
						var dato=snapshot.val();
						if(dato.email==user.email)
						{
							var adaNameRef = firebase.database().ref('final/partida/'+dato.dni);
							$("input[name=cuadro]").each(function (index) {  
							       if($(this).is(':checked')){
							          
							         adaNameRef.update({ emailadmin:user.email,emailuser:'vacio',nombrejuego:nombrejuego,estrategiaadmin:$(this).val()});
							         console.log("Datos almacenados");
							         window.location.href="#/menu";
							       }
					   		 });
						}
						
					});
					
				}
				else
				{
					//user
					
									$("input[name=cuadro]").each(function (index) {  

							       		if($(this).is(':checked'))
							       		{
							       			var radiocheck=$(this).val();
							       			 var messagesRef=new Firebase(Direcciones.firebasePartida);
												messagesRef.on('child_added', function (snapshot) {
														var lala=snapshot.val();
														//console.log(lala);
														if (lala.emailuser==user.email) 
															{
																var auxiliaremail=lala.emailadmin;
																if(lala.estrategiaadmin==radiocheck)
																{
																	alert("Gano el jugador:"+user.email);
																}
																else
																{
																	alert("Gano el jugador:"+lala.emailadmin);
																}


																 	var messagesRef=new Firebase(Direcciones.firebaseUser);
																	messagesRef.on('child_added', function (snapshot) {	
																			var data=snapshot.val();
																			if (data.email==auxiliaremail) 
																				{
																					var deletepartida = firebase.database().ref('final/partida/'+data.dni);
																					deletepartida.remove()
																					  .then(function() {
																					    console.log("Remove succeeded.");
																					    window.location.href="#/menu";
																					  })
																					  .catch(function(error) {
																					    console.log("Remove failed: " + error.message);
																					  });
																				}
															       			
																	});		  	


													  	 	}

			   									 });
										}
									});
				
					
					
				}
	        console.log("Valor del auxiliar es: "+auxiliar);	
	    }, 10000);
		 	

	};
}])
 