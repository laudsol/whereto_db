$(document).ready(()=>{

  $('.checkinBtn').on('click',(event)=>{
    event.preventDefault();
    let place = $('#checkin_location').val()
    console.log(place);
  });

  var message = 'test: posting from my website';
  var id = '10214154060225438'


  function post(message, id){
  FB.api(
    '/'+id+'/feed',
    'POST',
    {
      "message" : message,
      "tags" : id
    });
  };

  post(message,id);

  





});
