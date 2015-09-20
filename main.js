var phoneNumber = $('#phone-number-input').val();
var phoneNumberJSON = {
  phoneNumber: phoneNumber
};

$('#submit-button').click(function(event) {
  console.log(phoneNumberJSON);
  $.ajax({
    type: 'POST',
    url: '/beginquiz',
    data: phoneNumberJSON
  });
});