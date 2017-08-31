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

   $('#login').click(function(){
    var loggedin = false;
    var userInputs = {
       fb_id: '',
     };
    var access_token;
    var user_id;
    var loginResponse;

      checkLoginState();
    function checkLoginState() {
      FB.getLoginStatus(function(response) {
          if (response.status == "connected" && response.status != undefined){
            access_token = response.authResponse.accessToken;
            loginResponse = response.authResponse.userID;
            userInputs.fb_id = loginResponse;
            user_id = loginResponse;
            loggedin = true;
            runRouteAfterLogin(userInputs, loginResponse);
            console.log('logged in right away');
            return userInputs.fb_id;
          } else {
            FB.login(function(inResponse){
                console.log('logged in after process');
                runRouteAfterLogin(userInputs, loginResponse)
              },{scope: 'public_profile , publish_actions'})
          }
      });
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
          var locationContainer = $('<div>').addClass('locationContainer');
          result.data.forEach((el)=>{
            let temp = $('<div>').addClass('locationBox').text(el.name).attr('element-id',el.id).attr('place-text',el.name);
            locationContainer.append(temp);
          })
          $('.locationList').append(locationContainer);

          $('.locationList').children().on('click',function(event){
            var $target = $(event.target);
            console.log($target.attr('element-id'));
            var place = ($target.attr('element-id'));
            var placeText = ($target.attr('place-text'));
            var route = 'states';
            var message = 'testing: from my website';
            postToFb(message, user_id, place);
            postCheckin(placeText, route);
          })
        })
      }
    });
  });

});

function runRouteAfterLogin(userInputs, loginResponse){
  // console.log(loginResponse);
    $.ajax({
      contentType: 'application/json',
      type: "POST",
      url: '/login',
      data: JSON.stringify(userInputs),
      dataType: 'json',
      // complete: function(){
      //   $.ajax({
      //     contentType: 'application/json',
      //     type: "GET",
      //     url: '/login/'+loginResponse,
      //     dataType: 'json'
      //   })
      //   .done((data) => {
      //     console.log(data);
      //   })
      //   .fail(() => {
      //     console.log('/GET not working');
      //   });
      // }
    })
    .done((data)=>{
      console.log(data);
    })
    .fail(() => {
      console.log('post not working');
      // console.log(loginResponse);
      $.ajax({
          contentType: 'application/json',
          type: "GET",
          url: '/login/'+loginResponse,
          dataType: 'json'
        })
        .done((data) => {
          console.log(data);
        })
        .fail(() => {
          console.log('/GET not working');
        });
    });
}

function postToFb(message, user_id, place){
    FB.api(
      '/'+user_id+'/feed',
      'POST',
      {
        "message" : message,
        "tags" : user_id,
        "place": place
      }, function(response){
        console.log(response);
      });
}

function postCheckin(placeText, route){
  let locationInput = {
    'name': placeText
  };
  $.ajax({
    contentType: 'application/json',
    type: "POST",
    url: `/${route}`,
    data: JSON.stringify(locationInput),
    dataType: 'json'
  })
  .done((data) => {
    console.log(data);
  })
  .fail((err) => {
    console.log(err);
  });
}
