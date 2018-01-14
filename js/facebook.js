// Initialize Firebase
var config = {
  apiKey: 'AIzaSyCW8WTybFHHjgmKghBA-lmBiCoXyJEAGnM',
  authDomain: 'usuario-5f52b.firebaseapp.com',
  databaseURL: 'https://usuario-5f52b.firebaseio.com',
  projectId: 'usuario-5f52b',
  storageBucket: 'usuario-5f52b.appspot.com',
  messagingSenderId: '345830470861'
};
firebase.initializeApp(config);
  
/* ******************************FACEBOOK**************************** */
var user = null;
var provider = new firebase.auth.FacebookAuthProvider();
  
function facebook() {
  firebase.auth().signInWithPopup(provider)

    .then(function(result) {
      /* Esto le da un token de acceso de Facebook. Puede usarlo para acceder a la API de Facebook.*/
      var token = result.credential.accessToken;
      /* Informacion del usuario registrado */
      var user = result.user;
      console.log('usuario activo');
      /* Direcciona a la vista profile */
      window.location.href = '../views/profile.html';
    })
    .catch(function(error) {
      /* Manejo de errores */
      var errorCode = error.code;
      var errorMessage = error.message;
      /* El correo electrónico de la cuenta del usuario ya esta siendo utilizada. */
      var email = error.email;
      /* El tipo firebase.auth.AuthCredential que se utilizó. */
      var credential = error.credential;
    });
}

