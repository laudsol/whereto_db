$(document).ready(()=>{

  // var loggedin = false;
  var userInputs = {
     fb_id: '',
   };
  var access_token;
  var fb_id;
  var loginResponse;
$('#login').click(function(){
  checkLoginState();
  function checkLoginState() {
    FB.getLoginStatus(function(response) {

        if (response.status == "connected" && response.status != undefined){
          access_token = response.authResponse.accessToken;
          loginResponse = response.authResponse.userID;
          userInputs.fb_id = loginResponse;
          fb_id = loginResponse;
          loggedin = true;
          console.log(response);
          // runRouteAfterLogin(userInputs, loginResponse);
          return userInputs.fb_id;
        } else {

          FB.login(function(response){
              access_token = response.authResponse.accessToken;
              loginResponse = response.authResponse.userID;
              userInputs.fb_id = loginResponse;
              fb_id = loginResponse;
              // runRouteAfterLogin(userInputs, loginResponse)
              console.log(response);
            },{scope: 'public_profile , publish_actions'})
        }
    });
  }
});
})
