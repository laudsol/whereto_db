window.fbAsyncInit = function() {

    FB.init({
      appId      : '140705646531453',
      status     : true,
      cookie     : true,
      xfbml      : true,
      version    : 'v2.8'
    });
    FB.AppEvents.logPageView();

    FB.login(function(inResponse){
      console.log('hello',inResponse);
    },{scope: 'user_friends,public_profile,manage_pages,publish_pages,publish_actions,user_posts'});



    var message = 'test: posting from my website';
    var id = '10214154060225438'


    function post(message, id){
      console.log(message, id);
      FB.api(
        '/'+id+'/feed',
        'POST',
        {
          "message" : message,
          "tags" : id
        });
      };

      post(message,id);
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {
     return;
   }
   js = d.createElement(s);
   js.id = id;
   js.src = "https://connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));
