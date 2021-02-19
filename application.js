$(document).ready(function () {
  console.log('dom ready');

  $.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=1',
    datatype: 'json',
    success: function (response, textStatus) {
      console.log(response);
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
  
});