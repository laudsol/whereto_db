var user_id;
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
    var fb_id;
    var loginResponse;

    checkLoginState();
    function checkLoginState() {
      FB.getLoginStatus(function(response) {
          if (response.status == "connected" && response.status != undefined){
            access_token = response.authResponse.accessToken;
            loginResponse = response.authResponse.userID;
            userInputs.fb_id = loginResponse;
            fb_id = loginResponse;
            loggedin = true;
            runRouteAfterLogin(userInputs, loginResponse);
            return userInputs.fb_id;
          } else {
            FB.login(function(response){
                access_token = response.authResponse.accessToken;
                loginResponse = response.authResponse.userID;
                userInputs.fb_id = loginResponse;
                fb_id = loginResponse;
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
            var place = ($target.attr('element-id'));
            var placeText = ($target.attr('place-text'));
            var route = 'states';
            var keyName = 'state_id'
            var message = 'testing: from my website';
            // defineRoute(placeText);
            // postToFb(message, fb_id, place);
            postCheckin(placeText, route, user_id);
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
    })
    .done((data)=>{
      user_id = data.id;
    })
    .fail(() => {
      $.ajax({
          contentType: 'application/json',
          type: "GET",
          url: '/login/'+loginResponse,
          dataType: 'json'
        })
        .done((data) => {
           user_id = data.id;
        })
        .fail(() => {
        });
    });
}


function postToFb(message, fb_id, place){
    FB.api(
      '/'+fb_id+'/feed',
      'POST',
      {
        "message" : message,
        "tags" : fb_id,
        "place": place
      }, function(response){
        console.log(response);
      });
}

function postCheckin(placeText, route, keyName, user_id){
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
    let inputs = {
      user_id: user_id
    }
    inputs[keyName] = data[0].id;
    $.ajax({
      contentType: 'application/json',
      type: "POST",
      url: `/users_${route}`,
      data: JSON.stringify(inputs),
      dataType: 'json'
    })
    .done((data) => {
      console.log(data);
    })
    .fail((err) => {
      console.log(err);
    });
  })
  .fail((err) => {
    console.log(err);
  });
}

function defineRoute(placeText){

  var stateArr = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

  stateArr.forEach((el)=>{
    if(placeText.includes(el)){
      if(el === placeText){
        route = 'state';
        keyName = 'state_id'
      }
    }
  })

  if(placeText.includes('State Park')){
    route = 'stateParks';
    keyName = 'state_park_id';
  } else if(placeText.includes('National Park')){
    route = 'nationalParks';
    keyName = 'national_park_id';
  } else {
    route = 'cities';
    keyName = 'city_id';
  }
}
