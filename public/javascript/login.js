$(document).ready(function(){

// THIS CHANGES THE LOGIN BUTTON from login to continue if they aready have cookies (which they get from being logged in)---------------------------------------
  $.ajax({
    type: "GET",
    url: '/continue'
    })
    .done((data) => {
    if(data === "yes cookie"){
      $('#login').html('Continue');
    }
    else if (data === "no cookie"){
      $('#login').html('Login')
    }
    })
    .fail(() => {
    console.log('/GET not working');
  });
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  var loggedin = false;

  var userInputs = {
    fb_id: '',
   };

   $('#login').click(function(){
    var loginResponse;
      checkLoginState();
    function checkLoginState() {
      FB.getLoginStatus(function(response) {
          if (response.status == "connected" && response.status != undefined){
            loginResponse = response.authResponse.userID;
            userInputs.fb_id = loginResponse;
            loggedin = true;
            return userInputs.fb_id;
          }
      });
    }
    if(!loggedin){
      FB.login(function(inResponse){
        // window.location.replace("html/skillsManager.html");
        checkLoginState();
        runRouteAfterLogin(userInputs, loginResponse)

      },{scope: 'public_profile'})
    }
    else if(loggedin){
      runRouteAfterLogin(userInputs, loginResponse);
    }
    //  window.location.replace("html/skillsManager.html")
  });
});

function runRouteAfterLogin(userInputs, loginResponse){
    $.ajax({
      contentType: 'application/json',
      type: "POST",
      url: '/login',
      data: JSON.stringify(userInputs),
      dataType: 'json',
      complete: function(){
        $.ajax({
          contentType: 'application/json',
          type: "GET",
          url: '/login/' + loginResponse,
          dataType: 'json'
        })
        .done((data) => {
          // window.location.replace("html/checkin.html");
        })
        .fail(() => {
          console.log('/GET not working OR already exists');
        });
      }
    })
    .fail(() => {
      console.log('post not working OR already exists');
    });

}
