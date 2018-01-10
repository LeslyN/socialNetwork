function email() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
}

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
      alert('no existe usuario activo');
    }
  });
}
emailLook();