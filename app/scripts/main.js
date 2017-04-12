console.log('\'Allo \'Allo!');

var mediaPlayer;

document.addEventListener("DOMContentLoaded", function() { initialiseMediaPlayer(); }, false);

function initialiseMediaPlayer() {
   mediaPlayer = document.getElementById('media-video');
   mediaPlayer.controls = true;

   mediaPlayer.addEventListener('timeupdate', updateProgressBar, false);
}

function updateProgressBar() {
  //  var progressBar = document.getElementById('progress-bar');
   var percentage = Math.floor((100 / mediaPlayer.duration) *
                                      mediaPlayer.currentTime);
  //  progressBar.value = percentage;
  //  console.log(percentage + '% played');
   console.log(mediaPlayer.currentTime);
}
