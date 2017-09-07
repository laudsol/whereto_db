$(document).ready(()=>{
  $.ajax({
    type: "GET",
    url: '/everyaward'
    })
    .done((data)=>{
      data.forEach((el)=>{
        let awardText = $('<div>').addClass('awardText').text(el.type)
        let awardContainer = $('<div>').addClass('award')
        awardContainer.append(awardText)
        $('.awardBoxAll').append(awardContainer)
      });
  }).fail((err)=>{
  })
})
