/* globals jQuery */

// SC.initialize({
//   client_id: 'YOUR_CLIENT_ID',
//   redirect_uri: 'http://example.com/callback'
// });
//
// var commentOnTrack = function(tracks) {
//   SC.post('/tracks/' + tracks[0].id + '/comments', {
//     comment: { body: 'This is a timed comment', timestamp: 1500 }
//   });
// };
//
// SC.connect().then(function() {
//   SC.get('/me/tracks', { limit: 1 }).then(commentOnTrack);
// });

var clientId = 'client_id=3d0042e6d7d635ce0705c9c2d5919c6a'
var secretToken = 'secret_token=s-3TJdo'
var trackUri = 'https://api.soundcloud.com/tracks/261024423.json?' +
         secretToken + '&' + clientId
var audio = jQuery('audio')

jQuery
  .get(trackUri)
  .then(function (result) {
  // do not forget to supply client_id also when querying for stream url
    jQuery('#track').attr('src', result.stream_url + '&' + clientId)
  })

// http://stackoverflow.com/questions/26519796/how-play-a-private-track-with-soundcloud-javascript-sdk

// https://soundcloud.com/michel-st-michel/elk-sounds/s-3TJdo
