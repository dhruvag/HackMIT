var phoneNumber = $('#phone-number-input').val();
var phoneNumberJSON = {
  phoneNumber: phoneNumber
};

$('#submit-button').click(function(event) {
  $.ajax({
    type: 'POST',
    url: '/beginquiz',
    data: phoneNumber
  });
});