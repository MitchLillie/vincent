/* globals jQuery */

// var clientId = 'client_id=3d0042e6d7d635ce0705c9c2d5919c6a'
// var secretToken = 'secret_token=s-3TJdo'
// var trackUri = 'https://api.soundcloud.com/tracks/261024423.json?' +
//          secretToken + '&' + clientId
// var audio = jQuery('audio')
//
// jQuery
//   .get(trackUri)
//   .then(function (result) {
//   // do not forget to supply client_id also when querying for stream url
//     jQuery('#track').attr('src', result.stream_url + '&' + clientId)
//   })

// http://stackoverflow.com/questions/26519796/how-play-a-private-track-with-soundcloud-javascript-sdk

// https://soundcloud.com/michel-st-michel/elk-sounds/s-3TJdo

// html5media enables <video> and <audio> tags in all major browsers
// External File: http://api.html5media.info/1.1.8/html5media.min.js

// Add user agent as an attribute on the <html> tag...
// Inspiration: http://css-tricks.com/ie-10-specific-styles/
var b = document.documentElement
b.setAttribute('data-useragent', navigator.userAgent)
b.setAttribute('data-platform', navigator.platform)

// HTML5 audio player + playlist controls...
// Inspiration: http://jonhall.info/how_to/create_a_playlist_for_html5_audio
// Mythium Archive: https://archive.org/details/mythium/
jQuery(function ($) {
  var supportsAudio = !!document.createElement('audio').canPlayType
  if (supportsAudio) {
    var clientId = 'client_id=3d0042e6d7d635ce0705c9c2d5919c6a'
    var secretToken = 'secret_token=s-ZxUfM'
    var mediaPath = 'https://api.soundcloud.com/tracks/'
    var index = 0
    var playing = false
    // var mediaPath = 'http://archive.org/download/mythium/'
    var extension = ''
    var tracks = [{
      'track': 1,
      'name': 'I Am Only A Man',
      'length': '04:09',
      'id': '264831978'
    }, {
      'track': 2,
      'name': 'You Like The Pain Too',
      'length': '02:43',
      'id': '264834549'
    }, {
      'track': 3,
      'name': 'Say You Will',
      'length': '03:16',
      'id': '264831996'
    }, {
      'track': 4,
      'name': 'Time (Hell Won\'t Wait For Us)',
      'length': '03:09',
      'id': '264831971'
    }, {
      'track': 5,
      'name': 'Watercolor Dreams',
      'length': '03:33',
      'id': '264832008'
    }, {
      'track': 6,
      'name': 'What If I Can',
      'length': '03:24',
      'id': '264832013'
    }, {
      'track': 7,
      'name': 'Trivial Motion',
      'length': '03:45',
      'id': '264836186'
    }, {
      'track': 8,
      'name': 'Run Back Home',
      'length': '05:27',
      'id': '264831989'
    }]
    var trackCount = tracks.length
    var npAction = $('#npAction')
    var npTitle = $('#npTitle')
    var audio = $('#audio1').bind('play', function () {
      playing = true
      npAction.text('Now Playing...')
    }).bind('pause', function () {
      playing = false
      npAction.text('Paused...')
    }).bind('ended', function () {
      npAction.text('Paused...')
      if ((index + 1) < trackCount) {
        index++
        loadTrack(index)
        audio.play()
      } else {
        audio.pause()
        index = 0
        loadTrack(index)
      }
    }).get(0)
    var btnPrev = $('#btnPrev').click(function () {
      if ((index - 1) > -1) {
        index--
        loadTrack(index)
        if (playing) {
          audio.play()
        }
      } else {
        audio.pause()
        index = 0
        loadTrack(index)
      }
    })
    var btnNext = $('#btnNext').click(function () {
      if ((index + 1) < trackCount) {
        index++
        loadTrack(index)
        if (playing) {
          audio.play()
        }
      } else {
        audio.pause()
        index = 0
        loadTrack(index)
      }
    })
    var li = $('#plList li').click(function () {
      var id = parseInt($(this).index(), 10)
      if (id !== index) {
        playTrack(id)
      }
    })
    var loadTrack = function (id) {
      $('.plSel').removeClass('plSel')
      $('#plList li:eq(' + id + ')').addClass('plSel')
      npTitle.text(tracks[id].name)
      index = id
      // var trackUri = 'https://api.soundcloud.com/tracks/261024423.json?' +
      //          secretToken + '&' + clientId
      // var audio = jQuery('audio')
      //
      jQuery
        .get(mediaPath + tracks[id].id + '.json?' + secretToken + '&' + clientId)
        .then(function (result) {
        // do not forget to supply client_id also when querying for stream url
          audio.src = result.stream_url + '&' + clientId
        })
    }
    var playTrack = function (id) {
      loadTrack(id)
      audio.play()
    }
    extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : ''
    loadTrack(index)
  }
})
