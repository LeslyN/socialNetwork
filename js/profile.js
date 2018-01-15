function fileUpload() {
  function Init() {
    var fileSelect = document.getElementById('file-upload');
    var fileDrag = document.getElementById('file-drag');
    var submitButton = document.getElementById('submit-button');
  
    fileSelect.addEventListener('change', fileSelectHandler, false);
  
    // Is XHR2 available?
    var xhr = new XMLHttpRequest();
    if (xhr.upload) {
      // Donde colocas el archivo
      fileDrag.addEventListener('dragover', fileDragHover, false);
      fileDrag.addEventListener('dragleave', fileDragHover, false);
      fileDrag.addEventListener('drop', fileSelectHandler, false);
    }
  }
  
  function fileDragHover(e) {
    var fileDrag = document.getElementById('file-drag');
  
    e.stopPropagation();
    e.preventDefault();
  
    fileDrag.className = (e.type === 'dragover' ? 'hover' : 'modal-body file-upload');
  }
  
  function fileSelectHandler(e) {
    // Fetch FileList object
    var files = e.target.files || e.dataTransfer.files;
  
    // Cancel event and hover styling
    fileDragHover(e);
  
    // Process all File objects
    for (var i = 0, f; f = files[i]; i++) {
      parseFile(f);
      uploadFile(f);
    }
  }
  
  
  function parseFile(file) {
    var imageName = file.name;
  
    var isGood = (/\.(?=gif|jpg|png|jpeg)/gi).test(imageName);
    if (isGood) {
      document.getElementById('start').classList.add('hidden');
        
      document.getElementById('notimage').classList.add('hidden');
      // Thumbnail Preview
      document.getElementById('file-image').classList.remove('hidden');
      document.getElementById('file-image').src = URL.createObjectURL(file);
    } else {
      document.getElementById('file-image').classList.add('hidden');
      document.getElementById('notimage').classList.remove('hidden');
      document.getElementById('start').classList.remove('hidden');
        
      document.getElementById('file-upload-form').reset();
    }
  }
  
  function uploadFile(file) {
    var xhr = new XMLHttpRequest(),
      fileInput = document.getElementById('class-roster-file'),
      fileSizeLimit = 1024; // In MB
    if (xhr.upload) {
      // Check if file is less than x MB
      if (file.size <= fileSizeLimit * 1024 * 1024) {
        // Start upload
        xhr.open('POST', document.getElementById('file-upload-form').action, true);
        xhr.setRequestHeader('X-File-Name', file.name);
        xhr.setRequestHeader('X-File-Size', file.size);
        xhr.setRequestHeader('Content-Type', 'multipart/form-data');
        xhr.send(file);
      }
    }
  }
  
  // Check for the various File API support.
  if (window.File && window.FileList && window.FileReader) {
    Init();
  } else {
    document.getElementById('file-drag').style.display = 'none';
  }
}
fileUpload();