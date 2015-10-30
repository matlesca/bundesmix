// API SETUP
// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player1,player2;
function onYouTubeIframeAPIReady() {
	player1 = createPlayer('6IfWFCwCUII');
	player2 = createPlayer('mSFV7gKmBlU');
}

var bmVids = [
	{type:'beats',url:'6IfWFCwCUII',volume:40,start:0},
	{type:'parliament',url:'mSFV7gKmBlU',volume:100,start:600}
];
function getVid(url) {
	for (var ii=0; ii<bmVids.length; ii++) {
	    if (bmVids[ii].url == url) return bmVids[ii];
  	}
}

function createPlayer(url) {
	var retObj = {}
	retObj.params = getVid(url);
	retObj.player = new YT.Player(retObj.params.type, {
	  height: '100%',
	  width: '100%',
	  videoId: url,
	  start:retObj.params.start,
	  events: {
	    'onReady': onPlayerReady,
	    'onStateChange': onPlayerStateChange
	  },
	  playerVars: {'autoplay':1, 'modestbranding':10, 'controls':0, 'showinfo':0}
	});
	return retObj;
}
function onPlayerReady(event) {
	var vidParams = getVid(event.target.getVideoUrl().slice(-11));
	// console.log(vidParams.volume);
	// console.log(event.target.getVideoUrl().slice(-11));
	event.target.setVolume(vidParams.volume);
	event.target.seekTo(vidParams.start);
	
	event.target.playVideo();
}



//toolbox

function onPlayerStateChange(event) {
	if (event.data == YT.PlayerState.PAUSED) {
		player1.player.pauseVideo();
		player2.player.pauseVideo();
	} else if (event.data == YT.PlayerState.PLAYING) {
		player1.player.playVideo();
		player2.player.playVideo();
	}
}
function changeVid(vidUrl){
	player.loadVideoByUrl('http://www.youtube.com/embed/' + vidUrl,0,60000);
}