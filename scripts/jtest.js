$('#search').click(function(){
  $.ajax({
    type: "GET",
    url: "http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=Jimi_Hendrix&callback=?",
    contentType: "application/json; charset=utf-8",
    async: false,
    dataType: "json",
    success: function (data, textStatus, jqXHR) {
      console.log(data);
    },
    error: function (errorMessage) {}
  });
});
