$('#submit-button').click(function(event) {
  var phoneNumber = $('#phone-number-input').val();
  var phoneNumberJSON = {
    phoneNumber: phoneNumber
  };
  console.log(phoneNumberJSON);
  $.ajax({
    type: 'POST',
    url: '/beginquiz',
    data: phoneNumberJSON
  });
});