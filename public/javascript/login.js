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
            postToFb(message, fb_id, place);
            // postCheckin(placeText, route, keyName);
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

function postCheckin(placeText, route, keyName){

var catType = defineRoute(placeText);

  let locationInput = {
    'place': placeText,
    'user_id' : ,
    'category_id' : ,
  };

  let categoryInput = {
    category = catType;
  }

  $.ajax({
    contentType: 'application/json',
    type: "GET",
    url: '/place',
    data: JSON.stringify(catType),
    dataType: 'json'
  })



    $.ajax({
      contentType: 'application/json',
      type: "POST",
      url: '/users_categories',
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

function defineRoute(placeText){

  var stateArr = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

  if(placeText.includes('National Park')){
    return 'national park'
  } else if(placeText.includes('State Park')){
      return 'state park'
  } else if(placeText.includes('National Forest')){
      return 'national forest'
  } else if(placeText.includes('State Forest')){
      return 'state forest'
  } else if(placeText.includes('National Grassland')){
      return 'national_grasslands'
  } else if(placeText.includes('National Monument')){
      return 'national_monument'
  } else if(placeText.includes('National Preserve')){
      return 'national_preserve'
  } else if(placeText.includes('Museum')){
      return 'museum'
  } else if(placeText.includes('National Recreation Area')){
      return 'national_recreaction_area'
  } else if(placeText.includes('Indian Reservation')){
      return 'indian_reservation'
  } else if(placeText.includes('building') || placeText.includes('tower')){
      return 'building'
  } else if(placeText.includes('Lake')){
      return 'lake'
  } else if(placeText.includes('Reservoir')){
      return 'reservoir'
  } else if(placeText.includes('River')){
      return 'river'
  } else if(placeText.includes('Dam')){
      return 'dam'
  } else if(placeText.includes('Wildlife Refuge')){
      return 'wildlife_refuge'
  } else if(placeText.includes('Farmers Market')){
      return 'farmers_market'
  } else if(placeText.includes('Mountian')){
      return 'mountain'
  } else if(placeText.includes('Canyon')){
      return 'canyon'
  } else if(placeText.includes('Coutrhouse')){
      return 'coutrhouse'
  } else if(placeText.includes('City Hall')){
      return 'city_hall'
  } else if(placeText.includes('Botanical Gardens')){
      return 'botanical_gardens'
  } else if(placeText.includes('monument')){
      return 'monument'
  } else if(placeText.includes('Antique Shop')){
      return 'antique_shop'
  } else if(placeText.includes('Lighthouse')){
      return 'lighthouse'
  } else if(placeText.includes('Tunnel')){
      return 'tunnel'
  } else if(placeText.includes('Bridge')){
      return 'bridge'
  } else if(placeText.includes('Desert')){
      return 'desert'
  } else if(placeText.includes('Island')){
      return 'island'
  } else if(placeText.includes('Beach')){
      return 'beach'
  } else if(placeText.includes('Zoo')){
      return 'zoo'
  } else if(placeText.includes('Fort')){
      return 'fort'
  } else if(placeText.includes('Library')){
      return 'library'
  } else {
    stateArr.forEach((el)=>{
      if(el === placeText){
        return 'state'
      } else if (el === ', '+placeText){
        let letObj = {};
        let vowels = ['a','e','i','o','u'];

        placeText.split('').forEach((el)=>{
          if(letObj[el]){
            letObj[el]+=1;
          } else {
            letObj[el]=1;
          }
        });

        for (var key in letObj){
          if(vowels.includes(key]){
            if(letObj[key] === 3){
              return town_3_vow
            } else if (letObj[key] >= 4){
              return town_4_vow
            }
          } else {
            if(letObj[key] === 4){
              return town_4_let
            } else if(letObj[key] >= 5){
              return town_5_let
            }
          }
        }
      } else {
        return 'other'
      }
    });
  }
}
