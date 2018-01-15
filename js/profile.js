/* Posteo */ 
window.addEventListener('load', function() {
  var publicationsArea = document.getElementById('publications-area');
  var postBtn = document.getElementById('post-btn');
  var messages = document.getElementById('message');
  var countNumber = document.getElementById('count');
  var file = document.getElementById('file');
  // Referencia(storage) de las imágenes al nodo raíz
  var storageRef = firebase.storage().ref();
  // Accediendo al nodo Images de la DB en Firebase 
  var imageFRef = firebase.database().ref().child('Images');
  var MAXCHARACTERS = 140;

  publicationsArea.addEventListener('keyup', function(event) {
    if (event.target.value.trim().length) {
      var total = MAXCHARACTERS - event.target.value.trim().length;
      postBtn.disabled = false;
      countNumber.textContent = MAXCHARACTERS - event.target.value.trim().length;
      if (event.target.value.trim().length > MAXCHARACTERS) {
        postBtn.disabled = true;
      }
      if (countNumber > 0 && countNumber < 119) {
        countNumber.style.color = '#50b6f5';
      } else if (countNumber >= 120 && countNumber <= 130) {
        countNumber.style.color = '#f5b40d';
      } else if (countNumber > 130 && countNumber <= 140) {
        countNumber.style.color = '#F00';
      }
    } else {
      postBtn.disabled = true;
      countNumber.textContent = MAXCHARACTERS;
    }
    var text = event.target.value.split('');
    var acum = 0;
    for (var i = 0; i < text.length; i++) {
      if (text[i] === '\n') {
        acum++;
      }
      if (acum) {
        event.target.rows = acum + 2;
      }
    }
    if ((event.target.value.trim().length / event.target.cols) < event.target.rows) {
      event.target.rows = (event.target.value.trim().length / event.target.cols) + 2;
    }
  });
  
  publicationsArea.addEventListener('keydown', function(event) {
    countNumber.textContent = MAXCHARACTERS - publicationsArea.value.length;
  });

  postBtn.addEventListener('click', function(event) {
    event.preventDefault();
    var div = document.createElement('div');
    var post = document.createElement('span');
    var postText = document.createTextNode(publicationsArea.value);
    
    post.appendChild(postText);
    div.appendChild(post);
    div.classList.add('new-message');
    messages.insertBefore(div, messages.firstElementChild);

    publicationsArea.value = '';
    publicationsArea.focus();
    postBtn.disabled = true;
    countNumber.textContent = MAXCHARACTERS;
  });

  file.addEventListener('change', uploadImages, false);
  function uploadImages() {
    // alert('Subir imagen');
    showImagesFB();
    
    // Nombre de la imagen a subir
    var imageUpload = file.files[0];
    var uploadTask = storageRef.child('images-submit/' + imageUpload.name).put(imageUpload);

    uploadTask.on('state_change', 
      function(snapshot) {
        // Muestra el progreso de subida de la imagen
    
      }, function(error) {
      // Gestionar el error
        alert('hubo error al subir la imagen');
      }, function() {
      // Subida de imagen exitosa
        var downloadURL = uploadTask.snapshot.downloadURL;
        // alert('Se ha subido exitosamente');
        createNodeBDF(imageUpload.name, downloadURL);
      });
  };

  function showImagesFB() {
    imageFRef.on('value', function(snapshot) {
      var dataDBF = snapshot.val();
      var result = '';
      for (var key in dataDBF) {
        result += '<img width="200" class="img-thumbnail" src="' + dataDBF[key].url + '"/>';
      }
      document.getElementById('message').innerHTML = result;
    });
  }

  function createNodeBDF(nameImage, downloadURL) {
    imageFRef.push({name: nameImage, 
      url: downloadURL});
  }
});
