/* ----------------------FIREBASE-------------------------- */
var config = {
  apiKey: 'AIzaSyCW8WTybFHHjgmKghBA-lmBiCoXyJEAGnM',
  authDomain: 'usuario-5f52b.firebaseapp.com',
  databaseURL: 'https://usuario-5f52b.firebaseio.com',
  projectId: 'usuario-5f52b',
  storageBucket: 'usuario-5f52b.appspot.com',
  messagingSenderId: '345830470861'
};
firebase.initializeApp(config);

/* CREAR CUENTA */
$('#signUp').on('click', function(event) {
  /* almancena en una variable el email y password */
  var email = $('#email').val();
  var password = $('#password').val();
  /* registrar nuevos usuarios */
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function() {
      checkEmail();
      appears();
    })  
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
});


function checkEmail() {
  var user = firebase.auth().currentUser;
  user.sendEmailVerification().then(function() {
  }).catch(function(error) {
  });  
}

function appears() {
  var content = document.getElementById('contenido');
  content.innerHTML = `
    <h4>Se envio un correo para validar tu cuenta</h4>
    <h4>Clickea el boton para dirigirte al inicio de sesión</h4>
    <button class="btn-login" type="button"><a href="../views/session.html"></a></button>
  `;
}

/* INGRESO CON EL EMAIL CREADO */
$('#logIn').on('click', function(event) {
  var logEmail = $('#logEmail').val();
  var LogPassword = $('#LogPassword').val();

  firebase.auth().signInWithEmailAndPassword(logEmail, logPassword)
  /* .then(function() {
    window.location.href = '../views/profile.html';
  }) */ 
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
});

/* VINCULACION DE DATOS */
/* cuando un usuario accedio correctamente, se puede obtener informacion de el */
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    /* El usuario a iniciado sesion */
    console.log('existe usuario activo');
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    $(location).attr('href', '../views/profile.html');
  } else {
    console.log('no existe usuario activo');
  }
});

/* FACEBOOK 
var user = null;

$('#log-facebook').on('click', function(event) {
  var provider = new firebase.auth.FacebookAuthProvider();

  firebase.auth().signInWithPopup(provider)
    .then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
}); */
/* GOOGLE 
$('#log-google').on('click', function(event) {
  var provider = new firebase.auth.GoogleAuthProvider();
  
  firebase.auth().signInWithPopup(provider)
    .then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
});
*/
/* cerrar sesion */
$('#logOut').on('click', function(event) {
  firebase.auth().signOut()
    .then(function() {
      window.location.href = '../views/sesion.html';
    })
    .catch(function(error) {
      console.log(error);
    });
});
