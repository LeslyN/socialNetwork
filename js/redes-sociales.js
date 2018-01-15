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

/* EMAIL */
/* FACEBOOK */
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
});
/* GOOGLE */
$('#log-google').on('click', function(event) {
  var provider = new firebase.auth.GoogleAuthProvider();
  
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
});
  