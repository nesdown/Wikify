'use strict'
let searchTitle = '';
let xhr = new XMLHttpRequest({mozSystem: true});

let title = '';
let description = '';
let link = '';

function getJSON(urlGot) {
  $(document).ready(function(){
    $.ajax({
        type: "GET",
        url: urlGot,
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            title = data[1];
            description = data[2];
            link = data[3];

            showResult(title, description);
        },

        error: function (errorMessage) {
        }
    });
  });
}

function findArticle() {
  searchTitle = String(document.getElementById("field").value);
  let updateTitle = searchTitle.replace(' ', '%20');
  let request = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' +
    updateTitle + '&limit=1&format=json&callback=?';

  let reference = 'http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=Jimi_Hendrix&callback=?'
  let secondRef = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=bee&limit=1&format=json'
  console.log(`Your request is like: ${request}`);

  getJSON(request);
}

function showResult(title, description, link) {

  //Here we remove all that was here
  document.getElementById('container').removeChild(
    document.getElementById('random')
  );

  document.getElementById('container').removeChild(
    document.getElementById('field')
  );

  document.getElementById('container').removeChild(
    document.getElementById('search')
  );

  let title1 = document.createElement('h1');
  let desc1 = document.createTextNode(title);
  title1.appendChild(desc1);
  document.getElementById('container').appendChild(title1);

  let title2 = document.createElement('h1');
  let desc2 = document.createTextNode(description);
  title2.appendChild(desc2);
  document.getElementById('container').appendChild(title2);

}
