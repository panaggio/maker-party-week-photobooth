(function(){

  var streaming = false,
      video        = document.querySelector('#video'),
      cover        = document.querySelector('#cover'),
      canvas       = document.querySelector('#canvas'),
      urlfield     = document.querySelector('#uploaded input'),
      urllink      = document.querySelector('#uploaded a'),
      resetbutton  = document.querySelector('#resetbutton'),
      uploadbutton = document.querySelector('#uploadbutton'),
      width = 600,
      height = 0,
      finalheight = 0,
      state = '';

  function init() {
    setstate('testing');
    navigator.getMedia = ( navigator.getUserMedia || 
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia ||
                           navigator.msGetUserMedia);

    navigator.getMedia(
      { 
        video: true, 
        audio: false 
      },
      function(stream) {
        if (navigator.mozGetUserMedia) { 
          video.mozSrcObject = stream;
        } else {
          var vendorURL = window.URL || window.webkitURL;
          video.src = vendorURL ? vendorURL.createObjectURL(stream) : stream;
        }
        video.play();
      },
      function(err) {
        console.log("An error occured! " + err);
      }
    );
  }

  function takepicture() {
    canvas.width = width;
    canvas.height = finalheight;
    canvas.getContext('2d').drawImage(video, 0, 0, width, finalheight);
    setstate('reviewing');
  }

  function reshoot() {
    if (state === 'reviewing') {
      setstate('playing');
    }
  }

  function initiateupload() {
    if (state === 'reviewing') {
      setstate('uploading');
      upload();
    }
  }

  function upload() {
    var head = /^data:image\/(png|jpg);base64,/,
        fd = new FormData(),toSend,
        xhr = new XMLHttpRequest(),
        links = '',
        data = '';

    setstate('uploading');
    data = 'mozGetAsFile' in canvas ? 
           canvas.mozGetAsFile('webcam.png')
           data = canvas.toDataURL('image/png').replace(head, '');
    fd.append('image', toSend);
    fd.append('key', '6528448c258cff474ca9701c5bab6927');
    xhr.open('POST', 'http://api.imgur.com/2/upload.json');
    xhr.addEventListener('error', function(ev) {
      console.log('Upload Error :');
    }, false);
    xhr.addEventListener('load', function(ev) {
      try {
        var links = JSON.parse(xhr.responseText).upload.links;
        urlfield.value = links.imgur_page;
        urllink.href = links.imgur_page;
        setstate('uploaded');
      } catch(e) {
        console.log('Upload Error :' + e);
      }
    }, false);
    xhr.send(fd);
  }

  function setstate(newstate) {
    state = newstate;
    document.body.className = newstate;    
  }    

  /* Event Handlers */

  video.addEventListener('canplay', function(ev){
    if (!streaming) {
      finalheight = video.videoHeight / (video.videoWidth/width);
      video.setAttribute('width', width);
      video.setAttribute('height', finalheight);
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', finalheight);
      streaming = true;
      setstate('playing');
    }
  }, false);

  document.addEventListener('keydown', function(ev) {
    if (ev.which === 32 || ev.which === 37 || ev.which === 39) {
      ev.preventDefault();
    }
    if (ev.which === 32) { takepicture(); }
    if (ev.which === 37) { reshoot(); }
    if (ev.which === 39) { initiateupload(); }
  },false);

  video.addEventListener('click', function(ev){
    takepicture();
  }, false);

  resetbutton.addEventListener('click', function(ev){
    if (state === 'reviewing') {
      setstate('playing');
    }
    ev.preventDefault();
  }, false);

  uploadbutton.addEventListener('click', function(ev){
    if (state === 'reviewing') {
      setstate('uploading');
      upload();
    }
    ev.preventDefault();
  }, false);

  init();

})();