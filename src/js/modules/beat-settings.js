/************************************************
BEAT LIRBARY
************************************************/

// BEAT FILES
const beatFiles = [
  ['assets/sounds/BD0050.WAV', "Kick"],
  ['assets/sounds/SD0075.WAV', "Snare"],
  ['assets/sounds/CP.WAV', "Clap"],
  ['assets/sounds/OH00.WAV', "Hat"],
  ['assets/sounds/MC50.WAV', "Tom"],
  ['assets/sounds/CB.WAV', "Bell"]
];




// LOAD & PLAY BEAT FILES
function initBeats(id) {

  // Create a buffer for the incoming sound content
  let source = audioCtx.createBufferSource();;

  // CREATE XHR REQUEST FOR FILE
  let request = new XMLHttpRequest();
  request.open('GET', beatFiles[id][0], true);

  // Setting the responseType to arraybuffer sets up the audio decoding
  request.responseType = 'arraybuffer';

  request.onload = function() {
    // Decode the audio once the require is complete
    audioCtx.decodeAudioData(request.response, function(buffer) {
      source.buffer = buffer;
    });
  }

  // Send the request which kicks off
  request.send();

  // PLAY BEAT
  // Connect the audio to source (multiple audio buffers can be connected!)
  source.connect(audioCtx.destination);
  // Play the sound!
  source.start(0);
}
