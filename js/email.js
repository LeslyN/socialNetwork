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
function create() {
  /* almancena en una variable el email y password */
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
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
}

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
function email() {
  var email1 = document.getElementById('email1').value;
  var password1 = document.getElementById('password1').value;
  
  firebase.auth().signInWithEmailAndPassword(email1, password1)
    .then(function() {
      window.location.href = '../views/profile.html';
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
}
/* VINCULACION DE DATOS */
/* cuando un usuario accedio correctamente, se puede obtener informacion de el */
function emailLook() {
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
    } else {
      console.log('no existe usuario activo');
    }
  });
}
emailLook();

/* cerrar sesion */
function logOut() {
  firebase.auth().signOut()
    .then(function() {
      window.location.href = '../views/sesion.html';
    })
    .catch(function(error) {
      console.log(error);
    });
}
