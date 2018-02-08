var server = 'http://127.0.0.1:8080';

var send = function(query) {
  $.ajax({
    url: server,
    type: 'POST',
    data: query,
    dataType: 'application/json',
    success: function(data) {
      $('.input-field').val('');
    },
    error: function(error) {
      console.log(error);
      console.log('Web Historian: Failed To Send!');
    }
  });
};

$('.input-field').on('keyup', function(event) {
  if (event.which === 13) {
    event.preventDefault();
    send(JSON.stringify($('.input-field').val()));
  }
});