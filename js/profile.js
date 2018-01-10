/* Posteo */ 
window.addEventListener('load', function() {
  var publicationsArea = document.getElementById('publications-area');
  var postBtn = document.getElementById('post-btn');
  var messages = document.getElementById('message');
  var countNumber = document.getElementById('count');
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
        countNumber.style.color = 'red';
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
});