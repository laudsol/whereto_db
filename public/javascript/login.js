var user_id;
var catetgoryType;
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
// // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


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
          // search fb api for matching locations
          $.ajax({
            contentType: 'application/json',
            type: "GET",
            url: `https://graph.facebook.com/search?q=${fblocation}&type=page&access_token=${access_token}`
          }).done((result)=>{
            $('.locationList').empty();
            var locationContainer = $('<div>').addClass('locationContainer');
            result.data.forEach((el)=>{
              let tempText = $('<div>').addClass('locationText').text(el.name).attr('place-text',el.name);
              let temp = $('<div>').addClass('locationBox').attr('element-id',el.id);
              temp.append(tempText);
              locationContainer.append(temp);
            })
            $('.locationList').append(locationContainer);

            $('.locationList').children().on('click',function(event){
              $('.locationList').empty();
              var $target = $(event.target);
              var place = ($target.attr('element-id'));
              var placeText = ($target.attr('place-text'));
              var route = 'states';
              var keyName = 'state_id'
              var message = 'testing: from my website';
              postToFb(message, fb_id, place);
              postCheckin(placeText, route, keyName);
            })
          })
        }
    });
  });
});

function runRouteAfterLogin(userInputs, loginResponse){
    // post user fb token to db
    $.ajax({
      contentType: 'application/json',
      type: "POST",
      url: '/login',
      data: JSON.stringify(userInputs),
      dataType: 'json',
    })
    .done((data)=>{
      user_id = data.id;
      getAllAwards(user_id)
    })
    .fail(() => {
      // if cannot post, get user id from db for matching fb token
      $.ajax({
          contentType: 'application/json',
          type: "GET",
          url: '/login/'+loginResponse,
          dataType: 'json'
        })
        .done((data) => {
           user_id = data.id;
           getAllAwards(user_id)
        })
        .fail(() => {
        });
    });
}


function postToFb(message, fb_id, place){
    //post location checking to fb
    FB.api(
      '/'+fb_id+'/feed',
      'POST',
      {
        "message" : message,
        "tags" : fb_id,
        "place": place
      }, function(response){
      });
}

function postCheckin(placeText){

  var catType = defineRoute(placeText);
  catetgoryType = catType;
  let catInput = {
    category : catType
  }
  //get the correct category id
  $.ajax({
    contentType: 'application/json',
    type: "POST",
    url: '/category',
    data: JSON.stringify(catInput),
    dataType: 'json',
  }).done((data)=>{
    let locationInput = {
      'place': placeText,
      'user_id' : user_id,
      'category_id' : data[0].id
    };
    // prevent duplicate postings of place by user
    let dupCheckInput = {
      user_id : user_id,
      place : placeText
    }
    $.ajax({
      contentType: 'application/json',
      type: "POST",
      url: '/preventduplicateplace',
      data: JSON.stringify(dupCheckInput),
      dataType: 'json'
    })
    .done((data) => {
      if(data.length == 0){
        // post the checkin location in db with category
        $.ajax({
          contentType: 'application/json',
          type: "POST",
          url: '/place',
          data: JSON.stringify(locationInput),
          dataType: 'json'
        })
        .done((data) => {
          getAward(data)// gets data for award table
        })
        .fail((err) => {
          console.log(err);
        });
      }
    })
    .fail((err) => {
      console.log(err);
    })
  }).fail((err)=>{
    console.log(err);
  })
}

function getAward(data){
  let assessInputs = {
    'category_id' : data[0].category_id,
    'user_id' : user_id
  }
  // get all data with matching user & category to assess awards
  $.ajax({
    contentType: 'application/json',
    type: "POST",
    url: '/assessawards',
    data: JSON.stringify(assessInputs),
    dataType: 'json'
  }).done((data)=>{
      var award = defineAward(data)
      let awardInput = {
        type : award
      }
      // get award type
      $.ajax({
        contentType: 'application/json',
        type: "POST",
        url: '/whichaward',
        data: JSON.stringify(awardInput),
        dataType: 'json'
      }).done((data)=>{
        let awardPost = {
          user_id : user_id,
          award_id : data[0].id
        }
        $.ajax({
          contentType: 'application/json',
          type: "POST",
          url: '/postaward',
          data: JSON.stringify(awardPost),
          dataType: 'json'
        }).done((data)=>{
          getAllAwards(user_id);
        }).fail((err)=>{
        })
      }).fail((err)=>{
      })
  }).fail((err)=>{
  })
}

function getAllAwards(user_id){
  let getAwards = {
    user_id : user_id
  }
  // get all users awards for display
  $.ajax({
    contentType: 'application/json',
    type: "POST",
    url: '/allawards',
    data: JSON.stringify(getAwards),
    dataType: 'json'
  }).done((data)=>{
    addAwardsToPage(data)
  }).fail((err)=>{
  })
}

function addAwardsToPage(data){
  $('.awardBox').empty();
  let tempObj = {};
  // place all types in object as keys and append keys to remove duplicates
  data.forEach((el)=>{
    tempObj[el.type] = 0;
  })

  for (var key in tempObj){
    let awardText = $('<div>').addClass('awardText').text(key)
    let awardContainer = $('<div>').addClass('award')
    awardContainer.append(awardText)
    $('.awardBox').append(awardContainer)
  }

}

function defineRoute(placeText){

  var stateArr = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

  if(placeText.includes('National Park')){
    return 'national_park'
  } else if(placeText.includes('State Park')){
      return 'state_park'
  } else if(placeText.includes('National Forest')){
      return 'national_forest'
  } else if(placeText.includes('State Forest')){
      return 'state_forest'
  } else if(placeText.includes('National Grassland')){
      return 'national_grasslands'
  } else if(placeText.includes('National Monument')){
      return 'national_monument'
  } else if(placeText.includes('National Preserve') || placeText.includes('Park & Preserve') || placeText.includes('Park and Preserve')){
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
    let tempVal = 'other'
    stateArr.forEach((el)=>{
      if(placeText.includes(el)){
        if(el === placeText){
          tempVal = 'state'
        } else if (placeText.includes(', '+el)){
          tempVal = 'city';
          let letObj = {};
          let vowels = ['a','e','i','o','u'];
          let cityText = placeText.split(',')[0];

          cityText.split('').forEach((el)=>{
            if(letObj[el]){
              letObj[el]+=1;
            } else {
              letObj[el]=1;
            }
          });

          for (var key in letObj){
            if(vowels.includes(key)){
              if(letObj[key] === 3){
                tempVal = 'city_3_vow';
              } else if (letObj[key] >= 4){
                tempVal = 'city_4_vow';
              }
            } else {
              if(letObj[key] === 3){
                tempVal = 'city_3_let';
              } else if(letObj[key] >= 4){
                tempVal = 'city_4_let';
              }
            }
          }
        }
      }
    });
    return tempVal
  }
}


function defineAward(data){

  if(catetgoryType === 'national_park'){
    if(data.length > 0 && data.length <= 4){
      return 'National Park Badge'
    } else if(data.length > 4 && data.length <= 9){
      return 'National Park Freqentor'
    } else if (data.length > 9){
      return 'National Park Buff'
    }
  } else if (catetgoryType === 'state_park'){
    if(data.length > 0 && data.length <= 4){
      return 'State Park Badge'
    } else if(data.length > 4 && data.length <= 9){
      return 'State Park Freqentor'
    } else if (data.length > 9){
      return 'State Park Buff'
    }
  } else if (catetgoryType === 'indian_reservation'){
    if(data.length > 0 && data.length <= 4){
      return 'Indian Reservation Badge'
    } else if(data.length > 4 && data.length <= 9){
      return 'Indian Reservation Freqentor'
    } else if (data.length > 9){
      return 'Indian Reservation Buff'
    }
  } else if (catetgoryType === 'national_grasslands'){
    if(data.length > 0 && data.length <=2){
      return 'National Grasslands Badge'
    } else if(data.length > 2 && data.length <= 5){
      return 'National Grasslands Freqentor'
    } else if (data.length > 5){
      return 'National Grasslands Buff'
    }
  } else if (catetgoryType === 'national_monument'){
    if(data.length > 0 && data.length <= 2){
      return 'National Monument Badge'
    } else if(data.length > 2 && data.length <= 5){
      return 'National Monument Freqentor'
    } else if (data.length > 5){
      return 'National Monument Buff'
    }
  } else if (catetgoryType === 'national_preserve'){
    if(data.length > 0 && data.length <= 2){
      return 'National Preserve Badge'
    } else if(data.length > 2 && data.length <= 5){
      return 'National Preserve Freqentor'
    } else if (data.length > 5){
      return 'National Preserve Buff'
    }
  } else if (catetgoryType === 'museum'){
    if(data.length > 0 && data.length <= 2){
      return 'Museum Badge'
    } else if(data.length > 2 && data.length <= 5){
      return 'Museum Freqentor'
    } else if (data.length > 5){
      return 'Museum Buff'
    }
  } else if (catetgoryType === 'library'){
  if(data.length > 0 && data.length <= 2){
    return 'Library Badge'
  } else if(data.length > 2 && data.length <= 5){
    return 'Book Worm'
  } else if(data.length > 5){
    return 'Nerd'
    }
  } else if (catetgoryType === 'beach'){
    if(data.length > 0 && data.length <= 2){
      return 'Beach Badge'
    } else if(data.length > 2){
      return 'Beach Bum'
    }
  } else if (catetgoryType === 'state'){
    if(data.length >= 2 && data.length < 10){
      return 'States: 2!'
    } else if(data.length >= 10 && data.length <= 20){
      return 'States: 10!'
    } else if(data.length >= 20 && data.length <= 30){
      return 'States: 20!'
    } else if(data.length >= 30 && data.length <= 40){
      return 'States: 30!'
    } else if(data.length >= 40 && data.length <= 50){
      return 'States: 40!'
    } else if(data.length === 50){
      return 'States: 50!'
    }
  } else if (catetgoryType === 'city'){
    let letterObj = {};
    let letterCount = 0;
    for (i = 0; i < data.length; i++){
      let temp = data[i]
      if(!letterObj[temp['place'][0]]){
        letterObj[temp['place'][0]] = 1;
        letterCount+=1;
      }
    }
    if(letterCount >=10 && letterCount <15){
      return '10 alphabetic cities!'
    } else if(letterCount >=15 && letterCount <20){
        return '15 alphabetic cities!'
    } else if(letterCount >=20 && letterCount <26){
        return '20 alphabetic cities!'
    } else if(letterCount === 26 ){
        return 'All alphabetic cities!'
    }
  } else if (catetgoryType === 'city_all_abc'){
    return 'All alphabetic cities!'
  } else if (catetgoryType === 'city_3_vow'){
    return 'city with 3 matching vowels'
  } else if (catetgoryType === 'city_4_vow'){
    return 'city with 3 matching vowels'
  } else if (catetgoryType === 'city_3_let'){
    return 'city with 3 matching letters'
  } else if (catetgoryType === 'city_4_let'){
    return 'city with 5 matching letters'
  }
}
