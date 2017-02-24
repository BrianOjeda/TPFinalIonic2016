angular.module('app.services', [])
.service('User', function (Direcciones){

   
   
	 this.CrearUsuario = CrearUsuario;
   this.Login=Login;
   this.TraerDatosUsuario=TraerDatosUsuario;
   this.CrearObjetofireBase=CrearObjetofireBase;
   this.Desloguear=Desloguear;
   this.Cargando=Cargando;


    function Cargando()
    {
              // progressbar.js@1.0.0 version is used
        // Docs: http://progressbarjs.readthedocs.org/en/1.0.0/

        var bar = new ProgressBar.Circle(container, {
          color: '#aaa',
          // This has to be the same size as the maximum width to
          // prevent clipping
          strokeWidth: 4,
          trailWidth: 1,
          easing: 'easeInOut',
          duration: 5000,
          text: {
            autoStyleContainer: false
          },
          from: { color: '#aaa', width: 1 },
          to: { color: '#333', width: 4 },
          // Set default step function for all animate calls
          step: function(state, circle) {
            circle.path.setAttribute('stroke', state.color);
            circle.path.setAttribute('stroke-width', state.width);

            var value = Math.round(circle.value() * 100);
            if (value === 0) {
              circle.setText('Cargando');
            } else {
              circle.setText(value);
            }

          }
        });
        bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
        bar.text.style.fontSize = '2rem';

        bar.animate(1.0);
    }

    function Desloguear()
    {
          firebase.auth().signOut().then(function() {
          // Sign-out successful.
          window.location.href="#/login";
        }, function(error) {
          // An error happened.
        });
    }
    	function CrearUsuario(email,contrasena,nombre,apellido,telefono,dni,monedas)
    	{
              //var promise = defered.promise;
             
          		firebase.auth().createUserWithEmailAndPassword(email, contrasena).then(function(result) {
                
                CrearPerfil(email,nombre,apellido,telefono,dni,monedas);
               
                }, function(error) {
                 
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        if (errorCode == 'auth/weak-password') {
                          alert('The password is too weak.');
                        } else {
                          if(errorCode=='auth/email-already-in-use')
                          {
                            alert('El usuario ya existe');
                          }
                          else
                          {
                             alert(errorMessage);
                          }
                        }
        
                });
      	}

        function CrearPerfil(email,nombre,apellido,telefono,dni,monedas)
        {
              var user = firebase.auth().currentUser;
              var adaNameRef = firebase.database().ref('final/user/'+user.uid);
       
               adaNameRef.update({fila:user.uid,email:email, nombre:nombre,apellido:apellido,telefono:telefono,tipo:"Admin",dni:dni,monedas:monedas});
              
              window.location.href="#/login";
             alert("Usuario creado");
        }
       
        function Login(email,contrasena)
        {
          //alert("Estoy en login funcion");
            firebase.auth().signInWithEmailAndPassword(email,contrasena).then(function(result) {
             // var uno = login.getLogueado();
              //login.setLogueado(true);
              //var dos=login.getLogueado();
                  /*if($("#email").val()=="admin@hotmail.com") 
                    window.location.href= "#/tab/estadisticaCalificacion";
                  else*/
                    alert("Me voy a menu");
                    window.location.href="#/menu";

                }, function(error) {
                        
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        if (errorCode == 'auth/wrong-password') {
                          alert('La contraseña es incorrecta');
                        } else {
                          if(errorCode=='auth/user-not-found')
                          {
                            alert('El usuario no existe');
                          }
                          else
                          {
                             alert(errorMessage);
                          }
                        }
                        alert(error);
        
                });
        }
          function CrearObjetofireBase()
        {
             var obj = new Firebase(Direcciones.firebaseUser);
             return obj;
        }
        function TraerDatosUsuario()
        {
            var user = firebase.auth().currentUser;
            console.log("Estoy en traer datos usuario: "+user);
           
            return user;
        }


})