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
    var access_token;

    var loginResponse;
      checkLoginState();
    function checkLoginState() {
      FB.getLoginStatus(function(response) {
          if (response.status == "connected" && response.status != undefined){
            console.log(response.authResponse);
            access_token = response.authResponse.accessToken;
            loginResponse = response.authResponse.userID;
            userInputs.fb_id = loginResponse;
            loggedin = true;

            return userInputs.fb_id;
          }
      });
    }
    if(!loggedin){
      FB.login(function(inResponse){
        checkLoginState();
        runRouteAfterLogin(userInputs, loginResponse)

      },{scope: 'public_profile , publish_actions'})
    }
    else if(loggedin){
      runRouteAfterLogin(userInputs, loginResponse);
    }

    $('#run_search_location').click(function(){
      fblocation = $('#search_location').val();
      runAPI(access_token, fblocation);
      function runAPI(access_token, fblocation){
        $.ajax({
          contentType: 'application/json',
          type: "GET",
          url: `https://graph.facebook.com/search?q=${fblocation}&type=page&access_token=${access_token}`
        }).done((result)=>{
          $('.locationList').empty();
          place = result.data[0].id;
          console.log(place, result);
          var locationContainer = $('<div>').addClass('locationContainer');
          result.data.forEach((el)=>{
            let temp = $('<div>').addClass('locationBox').text(el.name).attr('element-id',el.id);
            locationContainer.append(temp);
          })
          $('.locationList').append(locationContainer);


          $('.locationList').children().on('click',function(event){
            var $target = $(event.target);
            console.log($target.attr('element-id'));
            var place = ($target.attr('element-id'));
            var message = 'here';
            var id = '10214154060225438';
            postToFb(message, id, place);
          })

        })
      }
    });



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
          console.log('/GET not working');
        });
      }
    })
    .fail(() => {
      console.log('post not working');
    });
}

function postToFb(message, id, place){
    FB.api(
      '/'+id+'/feed',
      'POST',
      {
        "message" : message,
        "tags" : id,
        "place": place
      }, function(response){
        console.log(response);
      });
}
