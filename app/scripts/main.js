console.log('\'Allo \'Allo!');

var mediaPlayer;
var ads = [];

document.addEventListener("DOMContentLoaded", function() { initialiseMediaPlayer(); }, false);

function initialiseMediaPlayer() {
   mediaPlayer = document.getElementById('media-video');
   mediaPlayer.controls = true;

   mediaPlayer.addEventListener('timeupdate', updateProgress, false);

   loadJSON(function(response) {
    // Parse JSON string into object
      var actual_JSON = JSON.parse(response);
      ads = actual_JSON;
      // console.log(JSON.stringify(ads));
      console.log(ads.length);

      for (var i = 0, len = ads.length; i < len; i++) {
        ads[i].start = convertStringToSeconds(ads[i].start);
        ads[i].end = convertStringToSeconds(ads[i].end);
      }
      // console.log(actual_JSON[1].start);
   });

}

function updateProgress() {
  //  var progressBar = document.getElementById('progress-bar');
   var percentage = Math.floor((100 / mediaPlayer.duration) *
                                      mediaPlayer.currentTime);
  //  progressBar.value = percentage;
  //  console.log(percentage + '% played');

  for (var i = 0, len = ads.length; i < len; i++) {
    if(mediaPlayer.currentTime > ads[i].start){
        console.log("item.title: " + ads[i].title);

        document.getElementById("demo").innerHTML = document.getElementById("demo").innerHTML + ads[i].title + "<br>";
    }
  };

  console.log(mediaPlayer.currentTime);


    // demoP.innerHTML = demoP.innerHTML + "index[" + index + "]: " + item + "<br>";

}

function convertStringToSeconds(value){
  var a = value.split(':'); // split it at the colons
  // minutes are worth 60 seconds. Hours are worth 60 minutes.
  return (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
}


function loadJSON(callback) {
  var url = 'scripts/ad-data.json';
   var xobj = new XMLHttpRequest();
       xobj.overrideMimeType("application/json");
   xobj.open('GET', url, true); // Replace 'my_data' with the path to your file
   xobj.onreadystatechange = function () {
         if (xobj.readyState == 4 && xobj.status == "200") {
           // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
           callback(xobj.responseText);
         }
   };
   xobj.send(null);
}
