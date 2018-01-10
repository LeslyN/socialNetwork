/* Firebase */
var config = {
  apiKey: 'AIzaSyCW8WTybFHHjgmKghBA-lmBiCoXyJEAGnM',
  authDomain: 'usuario-5f52b.firebaseapp.com',
  databaseURL: 'https://usuario-5f52b.firebaseio.com',
  projectId: 'usuario-5f52b',
  storageBucket: 'usuario-5f52b.appspot.com',
  messagingSenderId: '345830470861'
};
firebase.initializeApp(config);

/* *******************************CREAR***************************************** */
function crear() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  
  firebase.auth().createUserWithEmailAndPassword(email, password)

    .then(function() {
      verificar();
    })

    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
}

function verificar() {
  var user = firebase.auth().currentUser;
  user.sendEmailVerification().then(function() {
  }).catch(function(error) {
  });  
}
  
/* **********************************EMAIL***************************************** */
function email() {
  var email1 = document.getElementById('email1').value;
  var password1 = document.getElementById('password1').value;
  
  firebase.auth().signInWithEmailAndPassword(email1, password1).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
}
  
function emailLook() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      /* El usuario a iniciado sesion */
      console.log('existe usuario activo');
      /* entrar();*/
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

  
/* **********************************GOOGLE***************************************** */
/* **********************************FACEBOOK*************************************** */

/* PROFILE */
/* function entrar() {
  $(document).ready(function() {
    setTimeout(function() { 
      window.location.href = '../views/profile.html';
    }, 4000);
  });
}*/
function cerrar() {
  firebase.auth().signOut()
    .then(function() {
      console.log('saliendo ..');
      $(document).ready(function() {
        setTimeout(function() { 
          window.location.href = '../views/sesion.html';
        }, 1000);
      });
    })
    .catch(function(error) {
      console.log(error);
    });
}