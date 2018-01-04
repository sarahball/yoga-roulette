
    /* Replace This Code - get Value from playlist page and place it here */
    var playlistId = "PLgFfTrtdYUnE1gXI-QYadRKNoIlrffDxH";
    var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";

    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var player;

    function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
            height: '411',
            width: '548',
            playerVars: {
                modestbranding: 0,
                showinfo: 0,
                rel: 0
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }

        });
    }


    var playlistArray;
    var playListArrayLength;
    var maxNumber;

    var oldNumber = 0;
    var NewNumber = 0;

    function newRandomNumber() {
        oldNumber = NewNumber;
        NewNumber = Math.floor(Math.random() * maxNumber);
        if (NewNumber == oldNumber) {
            newRandomNumber();
        } else {
            return NewNumber;
        }
    }

function onPlayerReady(event) {
    player.loadPlaylist({
        'listType': 'playlist',
        'list': playlistId,
    });
}

var firstLoad = true;
function onPlayerStateChange(event) {
    console.log(event.data);
    if (event.data == YT.PlayerState.ENDED) {
        player.playVideoAt(newRandomNumber());   
    } else {
        if (firstLoad && event.data == YT.PlayerState.PLAYING) {
            firstLoad = false;
            playlistArray = player.getPlaylist();
            playListArrayLength = playlistArray.length;
            maxNumber = playListArrayLength;
            NewNumber = newRandomNumber();
            player.playVideoAt(newRandomNumber());
        }
    }
}    
