window.fbAsyncInit = function() {
  FB.init({
    appId: '140705646531453',
    xfbml: true,
    version: 'v2.9'
  });
  FB.AppEvents.logPageView();
  

  var message = 'test: posting from my website';
  var id = '10214154060225438'


  function post(message, id){
  FB.api(
    '/'+id+'/feed',
    'POST',
    {
      "message" : message,
      "tags" : id
    });
  };

  post(message,id);

}

// (function(d, s, id) {
//   var js, fjs = d.getElementsByTagName(s)[0];
//   if (d.getElementById(id)) {
//     return;
//   }
//   js = d.createElement(s);
//   js.id = id;
//     js.src = "http://connect.facebook.net/en_US/sdk.js";
//   fjs.parentNode.insertBefore(js, fjs);
// }(document, 'script', 'facebook-jssdk'));



// $(document).ready(()=>{
//
//   $('.checkinBtn').on('click',(event)=>{
//     event.preventDefault();
//     let place = $('#checkin_location').val()
//     console.log(place);
//   });
//
//   var message = 'test: posting from my website';
//   var id = '10214154060225438'
//
//   //
//   // function post(message, id){
//   // FB.api(
//   //   '/'+id+'/feed',
//   //   'POST',
//   //   {
//   //     "message" : message,
//   //     "tags" : id
//   //   });
//   // };
//   //
//   // post(message,id);
//
//
//
// });
