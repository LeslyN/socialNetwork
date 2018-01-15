//* ----------------------FIREBASE-------------------------- */
var config = {
  apiKey: 'AIzaSyCW8WTybFHHjgmKghBA-lmBiCoXyJEAGnM',
  authDomain: 'usuario-5f52b.firebaseapp.com',
  databaseURL: 'https://usuario-5f52b.firebaseio.com',
  projectId: 'usuario-5f52b',
  storageBucket: 'usuario-5f52b.appspot.com',
  messagingSenderId: '345830470861'
};
firebase.initializeApp(config);

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

/* GOOGLE */
var user = null;
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