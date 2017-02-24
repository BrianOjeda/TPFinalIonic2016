angular.module('app.controllers',['ionic.cloud'])
  
.controller('AceptarCtrl', ['$scope', '$stateParams','User', '$state','$timeout','User','Direcciones','$cordovaEmailComposer',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,User,$state, $timeout,User,Direcciones,$cordovaEmailComposer) {

		$scope.emailAprobado= function(email) {
			try
			{
				alert("Estoy en sendFeedback");

				var email = {
					to: email, 
					subject:'Solicitud de Monedas',
					body: '<h1>Su Solicitud a sido aprobada, Scanne el qr adjunto para adquirir las monedas solicitadas</h1></br><img src="'+$("#src").val()+'">',
					attachments:[
				      'base64:qr.gif//'+$("#src").val()
				   
				    ],
					isHtml: 'true'
					}; 
					$cordovaEmailComposer.isAvailable().then(function() {
						
					//$cordovaEmailComposer.addAlias('gmail', 'com.google.android.gm');
					$cordovaEmailComposer.open(email).then(null, function () {
					// user cancelled email
					
					});
					}, function () {
					// not available
					alert("Error, Configure la aplicacion de su dispositivo");
					});
			
			}
			catch(e)
			{
				alert(e);
			}
		        
   		 }
   		 $scope.emailDesaprobado= function(email) {
			try
			{
				alert("Estoy en sendFeedback");

				var email = {
					to: email, 
					subject:'Solicitud de Monedas',
					body: '<h1>Su Solicitud a no a sido aprobada</h1>',
					isHtml: 'true'
					}; 
					$cordovaEmailComposer.isAvailable().then(function() {
						
					//$cordovaEmailComposer.addAlias('gmail', 'com.google.android.gm');
					$cordovaEmailComposer.open(email).then(null, function () {
					// user cancelled email
					
					});
					}, function () {
					// not available
					alert("Error, Configure la aplicacion de su dispositivo");
					});
			
			}
			catch(e)
			{
				alert(e);
			}
		        
   		 }
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
		   
		 });
			$scope.Aceptar=function()
			{
				var aleatorio = Math.round(Math.random()*100000);
				$("#msg").val(aleatorio);
				update_qrcode();
				var messagesRef=new Firebase(Direcciones.firebaseSolicitud);
			
				messagesRef.on('child_added', function (snapshot) {
				 //GET DATA
						var data=snapshot.val();
						$("input[name=cuadro]").each(function (index) {  
						
							  if($(this).is(':checked'))
							  {
							  		if ($(this).val()==data.fila)
									 {
									 	//$scope.sendFeedback("brian_ezequiel_ojeda@hotmail.com");
									 	$scope.emailAprobado(data.email);
									 	var adaNameRef = firebase.database().ref('final/solicitud/'+data.fila);
										adaNameRef.update({estado:"aprobado",numeroaleatorio:$("#msg").val()});
										alert("Aprobado correctamente");
									 };
							  		
							  		
						      }
						});
						

					    	
				});
				
				
			}
			$scope.Rechazar=function()
			{
					
					var messagesRef=new Firebase(Direcciones.firebaseSolicitud);
				
					messagesRef.on('child_added', function (snapshot) {
					 //GET DATA
							var data=snapshot.val();
							$("input[name=cuadro]").each(function (index) {  
							
								  if($(this).is(':checked'))
								  {
								  		if ($(this).val()==data.fila)
										 {
										 	$scope.emailDesaprobado(data.email);
										 	var adaNameRef = firebase.database().ref('final/solicitud/'+data.fila);
											adaNameRef.update({estado:"No Aprobado"});
											alert("rechazado correctamente");

										 } 		
								  		
							      }
							});
 	
						});
			}



				
	
}])
 .controller('CargarCtrl', ['$scope', '$stateParams','User', '$state','$cordovaBarcodeScanner','$timeout','User','Direcciones', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,User,$state, $cordovaBarcodeScanner,$timeout,User,Direcciones) {

	try{
		document.addEventListener("deviceready",function(){

			    $cordovaBarcodeScanner
			      .scan()
			      //.encode(BarcodeScanner.Encode.TEXT_TYPE, "http://www.nytimes.com")
			      .then(function(barcodeData) {
			        // Success! Barcode data is here
			         //alert("We got a barcode\n" + "Result: " + result.text + "\n" + "Format: " + result.format + "\n" + "Cancelled: " + result.cancelled);
			        $("#codigo").val(barcodeData.text);
			        
			       

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
		var user=User.TraerDatosUsuario();
		var messagesRef=new Firebase(Direcciones.firebaseSolicitud);
		messagesRef.on('child_added', function (snapshot) {
		
				var solicitud=snapshot.val();
				
				if(solicitud.email==user.email && solicitud.numeroaleatorio==$("#codigo").val() && solicitud.estado=="aprobado")
				{
					var adaNameRef = firebase.database().ref('final/solicitud/'+solicitud.fila);
					adaNameRef.update({estado:"pagado"});
					var messagesRef=new Firebase(Direcciones.firebaseUser);
					messagesRef.on('child_added', function (snapshot) {
						var usuarios=snapshot.val();
						if (usuarios.email==user.email)
							{
								var adaNameRef = firebase.database().ref('final/user/'+solicitud.idusuario);
								adaNameRef.update({monedas:parseInt(usuarios.monedas)+parseInt(solicitud.monto)});
								alert("Dinero depositado");
								window.location.href="#/menu";
							}
					 });
					
				}	
		  		
		 });

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

.controller('loginCtrl', ['$scope', '$stateParams','User', '$state','$cordovaBarcodeScanner','$timeout','User','$ionicPush', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,User,$state, $cordovaBarcodeScanner,$timeout,User,$ionicPush) {


	 $ionicPush.register().then(function(t) {
              return $ionicPush.saveToken(t);
              }).then(function(t) {
                console.log('Token saved:', t.token);
                    $scope.$on('cloud:push:notification', function(event, data) {
                      var msg = data.message;
                      alert(msg.title + ': ' + msg.text);
                    });
              });

	$scope.usuariouno=function()
	{
		$("#email").val("brian_ezequiel_ojeda@hotmail.com");
		$("#pass").val("123456");
	}
	$scope.usuariodos=function()
	{
		$("#email").val("otro@hotmail.com");
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
			    if (objs.estado=="activo") 
			    	{
			    		juego=new Object();
					    juego.nombre=objs.nombre;
					    juego.fila=objs.fila;
					    juego.apuesta=objs.apuesta;
					    juego.objeto="juego"+c;
				   		//$scope.juegos=data;
				   		$scope.juegos.push(juego);
				   		console.log($scope.juegos);
				   		$state.reload(true);
			    	}
			    
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
							  		var adaNameRef = firebase.database().ref('final/juego/'+$(this).val());
									adaNameRef.update({ iduser:user.uid,estado:"pendiente",emailuser:user.email});
									alert("Comencemos a jugar");
									window.location.href="#/juego";
						      }
						});
				  
			}
		   
}])
   
.controller('menuCtrl', ['$scope', '$stateParams','User','Direcciones','$timeout', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,User,Direcciones,$timeout,$state) {
	$state.reload(true);
		
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
			{	var hoy = new Date();
				var dd = hoy.getDate();
				var mm = hoy.getMonth()+1; //hoy es 0!
				var yyyy = hoy.getFullYear();
				fecha = dd+'/'+mm+'/'+yyyy;

				var user=User.TraerDatosUsuario();
				var fila=user.uid+hoy;
				
		      	var adaNameRef = firebase.database().ref('final/juego/'+fila);
				adaNameRef.update({ iduser:"vacio",idadmin:user.uid,fecha:fecha,fila:fila,ganador:"",estado:"activo",apuesta:$("#apuesta").val(),emailadmin:user.email,emailuser:'vacio',nombre:$("#nombre").val(),estrategiaadmin:"vacio"});
				alert("Juego Creado");	
				 window.location.href="#/juego";

		       
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

				    var adminfirebase=new Firebase(Direcciones.firebaseJuego);
				    var userfirebase=new Firebase(Direcciones.firebaseJuego);
				    var datosuserfirebase=new Firebase(Direcciones.firebaseUser);
			
				    adminfirebase.on('child_added', function (snapshot) {
				    	console.log("Firebase admin");
							var juego=snapshot.val();
							//console.log(lala);
							if(juego.emailadmin==user.email && juego.estado=="activo")
							{
								$("input[name=cuadro]").each(function (index) {  
							       if($(this).is(':checked')){
							       		var estrategia=$(this).val();
							       		var adaNameRef = firebase.database().ref('final/juego/'+juego.fila);
										adaNameRef.update({estrategiaadmin:estrategia});
										alert("Estrategia jugada");
										window.location.href="#/menu";
									  }
					   		 	});
							
							}
					 });
			 		userfirebase.on('child_added', function (snapshot) {
							var juego=snapshot.val();
							console.log("Firebase user");
							if(juego.emailuser==user.email && juego.estado=="pendiente")
							{
									$("input[name=cuadro]").each(function (index) {  
								       if($(this).is(':checked')){
								       		if(juego.estrategiaadmin==$(this).val())
								       		{
									       			alert("Gano el jugador"+user.email);
									       			var adaNameRef = firebase.database().ref('final/juego/'+juego.fila);
													adaNameRef.update({estado:"terminado",ganador:user.email});
													datosuserfirebase.on('child_added', function (snapshot) {
													var datos=snapshot.val();
													if(datos.email==user.email)
													{
														var adaNameRef = firebase.database().ref('final/user/'+datos.fila);
														var monedas=parseInt(datos.monedas)+parseInt(juego.apuesta);
														adaNameRef.update({monedas:monedas});
													}
													if(datos.email==juego.emailadmin)
													{
														var adaNameRef = firebase.database().ref('final/user/'+datos.fila);
														var monedas=parseInt(datos.monedas)-parseInt(juego.apuesta);
														adaNameRef.update({monedas:monedas});
													}
													 });	
													window.location.href="#/menu";
							       			}
							       			else
							       			{
								       			var adaNameRef = firebase.database().ref('final/juego/'+juego.fila);
												adaNameRef.update({estado:"terminado",ganador:juego.emailadmin});
												datosuserfirebase.on('child_added', function (snapshot) {
													var datos=snapshot.val();
													if(datos.email==user.email)
													{
														var adaNameRef = firebase.database().ref('final/user/'+datos.fila);
														var monedas=parseInt(datos.monedas)-parseInt(juego.apuesta);
														adaNameRef.update({monedas:monedas});
													}
													if(datos.email==juego.emailadmin)
													{
														var adaNameRef = firebase.database().ref('final/user/'+datos.fila);
														var monedas=parseInt(datos.monedas)+parseInt(juego.apuesta);
														adaNameRef.update({monedas:monedas});
													}
												 });	
								       			alert("Gano el jugador"+juego.emailadmin);
								       			window.location.href="#/menu";
								       		}
							       																				
									  	}
					   		 		});
							}
					 });
	}	
}])
 