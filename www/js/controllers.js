angular.module('app.controllers', [])
  
.controller('AceptarCtrl', ['$scope', '$stateParams','User', '$state','$timeout','User','Direcciones', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,User,$state, $timeout,User,Direcciones) {

		$scope.solicitudes=[];
			var messagesRef=new Firebase(Direcciones.firebaseSolicitud);
			var c=0;
			messagesRef.on('child_added', function (snapshot) {
		    //GET DATA
		    var solicitud=snapshot.val();
		    	if (solicitud.estado=="activo") 
		    		{
		    			c=c+1;
					    console.log("Estoy en el if");
					    var obj=new Object();
					    obj.fila=solicitud.fila;
					    obj.email=solicitud.email;
					    obj.monto=solicitud.monto;
					    obj.objeto="solicitud"+c;
				   		//$scope.juegos=data;
				   		$scope.solicitudes.push(obj);
				   		console.log($scope.solicitudes);
				   		$state.reload(true);
		    		}
		    	
		   		//$("#juegos").append('<ion-item><ion-label>'+data.nombre+'</ion-label><ion-radio  value="'+data.email+'"></ion-radio></ion-item>');
		   
		  });
			$scope.Aceptar=function()
			{
				var aleatorio = Math.round(Math.random()*100000);
				$("#msg").val(aleatorio);
				update_qrcode();
				
				$("input[name=cuadro]").each(function (index) { 
						 if($(this).is(':checked'))
						  {
								var valordelradio=$(this).val();

								var adaNameRef = firebase.database().ref('final/solicitud/'+valordelradio);
								adaNameRef.update({estado:"aprobado",numeroaleatorio:aleatorio});
								console.log("proceso terminado");
						   }
				});
			}
			$scope.Rechazar=function()
			{
					document.getElementById("form1").submit();
			}



				
	
}])
 .controller('CargarCtrl', ['$scope', '$stateParams','User', '$state','$cordovaBarcodeScanner','$timeout','User', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,User,$state, $cordovaBarcodeScanner,$timeout,User) {

	try{
		document.addEventListener("deviceready",function(){

			    $cordovaBarcodeScanner
			      .scan()
			      //.encode(BarcodeScanner.Encode.TEXT_TYPE, "http://www.nytimes.com")
			      .then(function(barcodeData) {
			        // Success! Barcode data is here
			         //alert("We got a barcode\n" + "Result: " + result.text + "\n" + "Format: " + result.format + "\n" + "Cancelled: " + result.cancelled);
			        $("#email").val(barcodeData.text);
			        
			       

			      }, function(error) {
			        // An error occurred
			        alert(error);
			      });
	
	    });  
	}
	catch(e)
	{
		alert(e);
	}
	
	$scope.cargar=function()
	{
		
		
	};
	
}])
.controller('SolicitarCtrl', ['$scope', '$stateParams','User', '$state','$cordovaBarcodeScanner','$timeout','User', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
	function ($scope, $stateParams,User,$state, $cordovaBarcodeScanner,$timeout,User) {

// 		user.updateProfile({
//   displayName: "Jane Q. User",
//   photoURL: "https://example.com/jane-q-user/profile.jpg"
// }).then(function() {
//   // Update successful.
// }, function(error) {
//   // An error happened.
// });
		$scope.solicitud=function()
		{	
			var hoy = new Date();
			var dd = hoy.getDate();
			var mm = hoy.getMonth()+1; //hoy es 0!
			var yyyy = hoy.getFullYear();
			fecha = dd+'/'+mm+'/'+yyyy;

			var user=User.TraerDatosUsuario();
			var fila=user.uid+hoy;
			
			// firebase.database().ref('final/solicitud/' + user.uid).set({
			//     username: name,
			//     email: email,
			//     profile_picture : imageUrl
			//   });
			var adaNameRef = firebase.database().ref('final/solicitud/'+fila);
			adaNameRef.update({fila:fila, idusuario:user.uid,numerotarjeta:$("#numero").val(),monto:$("#monto").val(),email:user.email,estado:"activo",numeroaleatorio:"vacio",fecha:fecha,hoy:hoy});
			window.location.href="#/menu";
		}
		


}]) 

.controller('loginCtrl', ['$scope', '$stateParams','User', '$state','$cordovaBarcodeScanner','$timeout','User', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,User,$state, $cordovaBarcodeScanner,$timeout,User) {

	//$state.reload(true);
	//User.Cargando();
	
	try{
		document.addEventListener("deviceready",function(){

			    $cordovaBarcodeScanner
			      .scan()
			      //.encode(BarcodeScanner.Encode.TEXT_TYPE, "http://www.nytimes.com")
			      .then(function(barcodeData) {
			        // Success! Barcode data is here
			         //alert("We got a barcode\n" + "Result: " + result.text + "\n" + "Format: " + result.format + "\n" + "Cancelled: " + result.cancelled);
			        $("#email").val(barcodeData.text);
			        
			       window.plugins.spinnerDialog.show("title","adas");

			      }, function(error) {
			        // An error occurred
			        alert(error);
			      });
				

				
				
	    });  
	}
	catch(e)
	{
		alert(e);
	}
	$scope.usuariouno=function()
	{
		$("#email").val("brian@hotmail.com");
		$("#pass").val("123456");
	}
	$scope.login=function()
	{
		
		User.Login($("#email").val(),$("#pass").val());
	};
	
}])
 .controller('perfilCtrl', ['$scope', '$stateParams','User','Direcciones','$timeout','$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,User,Direcciones,$timeout,$state) {
			$state.reload(true);
			var messagesRef=new Firebase(Direcciones.firebaseUser);
			var c=0;
			var user=User.TraerDatosUsuario();
			var objeto=new Object();
			messagesRef.on('child_added', function (snapshot) {
		    //GET DATA
		    var data=snapshot.val();
		    	if (user.email==data.email)
		    		{
		    			console.log(data.dni);
		    			objeto.Apellido=data.apellido;
		    			objeto.Dni=data.dni;
		    			objeto.Email=data.email;
		    			objeto.Telefono=data.telefono;
		    			objeto.Nombre=data.nombre;
		    			objeto.Monedas=data.monedas; 
		    		}
		   		//$("#juegos").append('<ion-item><ion-label>'+data.nombre+'</ion-label><ion-radio  value="'+data.email+'"></ion-radio></ion-item>');
		   
			 });

	$timeout(function () {
				$scope.perfil=objeto;
			}, 5000);
	
}])  

.controller('salaCtrl', ['$scope', '$stateParams','Direcciones','User','$timeout','$ionicHistory','$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,Direcciones,User,$timeout,$ionicHistory,$state) {

	$state.reload(true);
	$ionicHistory.clearCache().then(function(){

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
	 });
			
$scope.Desloguear=function()
			{
				$timeout(function () {
						User.Desloguear();
				}, 2000);
				
			};
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
   
.controller('menuCtrl', ['$scope', '$stateParams','User','Direcciones','$timeout', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,User,Direcciones,$timeout,$state) {
	$state.reload(true);
			// $timeout(function () {
			// 			var user=User.TraerDatosUsuario();
			// 			$scope.visibilidad=true;
			// 			var messagesRef=new Firebase(Direcciones.firebaseJuego);
								
			// 			messagesRef.on('child_added', function (snapshot) {
			// 				var dato=snapshot.val();
			// 				if (dato.email==user.email)
			// 					{
			// 						$scope.visibilidad=false;
			// 					}
				              	
			// 	        });
			// }, 5000);

			$scope.Desloguear=function()
			{
				$timeout(function () {
						User.Desloguear();
				}, 2000);
				
			};
		 
}])
   
.controller('crearjuegoCtrl', ['$scope', '$stateParams','User','Direcciones','$state',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,User,Direcciones,$state) {

			$state.reload(true);
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
   
.controller('crearusuarioCtrl', ['$scope', '$stateParams','User', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,User,$state) {

	$state.reload(true);
	$scope.CrearUsuario=function(){
		//alert($("#email").val());
		User.CrearUsuario($("#email").val(),$("#password").val(),$("#nombre").val(),$("#apellido").val(),$("#telefono").val(),$("#dni").val(),"100");
	};
	
}])
   
.controller('juegoCtrl', ['$scope', '$stateParams','User','Direcciones','$timeout','$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,User,Direcciones,$timeout,$state) {

	$state.reload(true);
	$scope.partida=function()
	{
		
		
		var user=User.TraerDatosUsuario();
	    var messagesRef=new Firebase(Direcciones.firebaseJuego);
		var auxiliar=0;
		var nombrejuego="";	
		var monedasdeljuego=0;
		var auxiliarganador=0;
		var auxiliardni=0;
		var auxiliaremail=0;
				    messagesRef.on('child_added', function (snapshot) {
							var lala=snapshot.val();
							//console.log(lala);
							if(lala.email==user.email)
							{
								auxiliar=1;
								console.log("Entre en el uno");
								nombrejuego=lala.nombre;
								monedasdeljuego=lala.apuesta;
							}
							else
							{
								monedasdeljuego=lala.apuesta;
								auxiliar=2;
								console.log("Entre en el dos");
							}	
					 });
		
			$timeout(function () {
			if (auxiliar==1)
				{
					//admin
					var messagesRef=new Firebase(Direcciones.firebaseUser);
					auxiliarganador=2;
					messagesRef.on('child_added', function (snapshot) {
						var dato=snapshot.val();
						if(dato.email==user.email)
						{
							var adaNameRef = firebase.database().ref('final/partida/'+dato.dni);
							$("input[name=cuadro]").each(function (index) {  
							       if($(this).is(':checked')){
							          
							         adaNameRef.update({ monedas:monedasdeljuego,emailadmin:user.email,emailuser:'vacio',nombrejuego:nombrejuego,estrategiaadmin:$(this).val()});
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
														monedasdeljuego=lala.monedas;
														console.log("Entre en el metodo");
														if (lala.emailuser==user.email) 
															{
																auxiliaremail=lala.emailadmin;
																auxiliardni=lala.dni;
																if(lala.estrategiaadmin==radiocheck)
																{
																	auxiliarganador=1;
																	
																	//alert("Gano el jugador:"+user.email);
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
		$timeout(function () {
	    	

	    	if(auxiliarganador==1)
	    	{
	    		var messagesRef=new Firebase(Direcciones.firebaseUser);
				messagesRef.on('child_added', function (snapshot) {	
					var data=snapshot.val();
					if (data.email==user.email) 
							{
								 var adaNameRef = firebase.database().ref('final/user/'+data.dni);
       
               					 var mismonedas=parseInt(monedasdeljuego)+parseInt(data.monedas);
               					 adaNameRef.update({monedas:mismonedas});
							}
					if (data.email==auxiliaremail) 
							{
								var adaNameRef = firebase.database().ref('final/user/'+data.dni);
       							var mismonedas=parseInt(data.monedas)-parseInt(monedasdeljuego);
               					 adaNameRef.update({monedas:mismonedas});
							}
						console.log("Gano el usuario actual");									       			
				});	
	    	}
	    	if(auxiliarganador==0)
	    	{
	    		var messagesRef=new Firebase(Direcciones.firebaseUser);
	    		console.log("Valor de moneda es: "+monedasdeljuego);
				messagesRef.on('child_added', function (snapshot) {	
					var data=snapshot.val();
					if (data.email==auxiliaremail) 
							{
								var adaNameRef = firebase.database().ref('final/user/'+data.dni);
       							var mismonedas=parseInt(monedasdeljuego)+parseInt(data.monedas);
               					 adaNameRef.update({monedas:mismonedas});
							}
					if (data.email==user.email) 
							{
								 var adaNameRef = firebase.database().ref('final/user/'+data.dni);
       
               					 var mismonedas=parseInt(data.monedas)-parseInt(monedasdeljuego);
               					 adaNameRef.update({monedas:mismonedas});
							}
															       			
				});	
	    		console.log("Gano el creador del juego");
	    	}
	    }, 11000);		 	

	};
}])
 