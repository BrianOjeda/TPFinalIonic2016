angular.module('app.services', [])
.service('User', function (Direcciones){

   
   
	 this.CrearUsuario = CrearUsuario;
   this.Login=Login;
   this.TraerDatosUsuario=TraerDatosUsuario;
   this.CrearObjetofireBase=CrearObjetofireBase;
   this.Desloguear=Desloguear;

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
                             console.log(errorMessage);
                          }
                        }
        
                });
      	}

        function CrearPerfil(email,nombre,apellido,telefono,dni,monedas)
        {
            var messagesRef = new Firebase(Direcciones.firebaseUser);

             messagesRef.push({email:email, nombre:nombre,apellido:apellido,telefono:telefono,tipo:"Admin",dni:dni,monedas:monedas});
              window.location.href="#/login";
             alert("Usuario creado");
        }
       
        function Login(email,contrasena)
        {
            firebase.auth().signInWithEmailAndPassword(email,contrasena).then(function(result) {
             // var uno = login.getLogueado();
              //login.setLogueado(true);
              //var dos=login.getLogueado();
                  /*if($("#email").val()=="admin@hotmail.com") 
                    window.location.href= "#/tab/estadisticaCalificacion";
                  else*/
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
                        console.log(error);
        
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
            console.log(user.dni);
            return user;
        }


})