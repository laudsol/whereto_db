$(document).ready(()=>{

  $('.checkinBtn').on('click',(event)=>{
    event.preventDefault();
    let place = $('#checkin_location').val()
    console.log(place);

  });

});
