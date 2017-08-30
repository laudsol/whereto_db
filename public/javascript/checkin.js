$(document).ready(()=>{

  $('.checkinBtn').on('click',(event)=>{
    event.preventDefault();
    let place = $('#checkin_location').val()
    console.log(place);
  });

  $.ajax({
    type: "GET",
    url: '/checkin'
    })
    .done((data) => {
      console.log(data);
    })
    .fail(() => {
    console.log('failed');
  });


  // function post(message, id){
  // FB.api(
  //   '/'+id+'/feed',
  //   'POST',
  //   {
  //     "message" : message,
  //     "tags" : id
  //   },
  // );
  // }

});
