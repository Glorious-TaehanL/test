// const Vimeo = require('@vimeo/player'); //for vimeo
var player; // for youtube player

function printVideo() {
  // video example url
  // https://youtu.be/K5J88rudNeY
  //check video category
  var videoOption;

  // get video url
  const urlInput = document.getElementById('subcourse_link');
  const urlStr = urlInput.value.toString();

  $("input[name='video_option']:checked").each(function () {
    //checked 된 라디오버튼 값
    videoOption = $(this).val();
  });

  console.log(videoOption);
  validationVideoVendor(videoOption, urlStr);
}

function validationVideoVendor(videoOption, urlStr) {
  if (videoOption == 'youtube') {
    // select youtube
    if (urlStr.indexOf('youtu') !== -1) {
      /*
       *  youtube vendor (o)
       *  youtube url (o)
       */
      const videoYoutubeId = urlStr.replace('https://youtu.be/', ''); // 패턴 문자열을 제거
      //call load video player
      initVideoPlayer();
      playYoutubePlayer(videoYoutubeId);
    } else {
      $('.alert').toggle();
      setTimeout(() => {
        $('.alert').toggle();
      }, 3000);
    }
  } else {
    if (urlStr.indexOf('vimeo') !== -1) {
      const videoVimeoId = urlStr.replace('https://vimeo.com/', ''); // 패턴 문자열을 제거
      const options = {
        id: videoVimeoId,
        autoplay: true,
      };
      initVideoPlayer();
      const player = new Vimeo.Player('player', options);
    } else {
      $('.alert').toggle();
      setTimeout(() => {
        $('.alert').toggle();
      }, 3000);
    }

    //select vimeo
    // https://vimeo.com/552011180
  }
}

function initVideoPlayer() {
  // 생성된 플레이어가 있다면, 플레이어를 삭제합니다.
  if (player) {
    player.destroy();
  }
}

function playYoutubePlayer(videoId) {
  player = createYoutubePlayer(videoId);
}

function createYoutubePlayer(videoId) {
  var playerVars = {
    controls: 1,
    autoplay: 0,
    rel: 0,
    modestbranding: 1,
    enablejsapi: 1,
    origin: 'https://youtu.be/' + videoId,
  };

  // 플레이어 생성
  var player = new YT.Player('player', {
    height: '100%',
    width: '100%',
    videoId: videoId, // 여기에 동영상 ID 입력
    playerVars: playerVars,
    events: {
      onReady: onYoutubePlayerReady,
      onStateChange: onYoutubePlayerStateChange,
    },
  });
  return player;
}

function onYoutubePlayerReady(event) {
  event.target.playVideo();
}

function onYoutubePlayerStateChange(event) {
  // 동영상 상태 변경 시, 이벤트 처리
}
