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
            showResult(title, description, link);
        },

        error: function (errorMessage) {}
    });
  });
}

function findArticle() {
  searchTitle = String(document.getElementById("field").value);
  let updateTitle = searchTitle.replace(/ /g, '%20');
  let request = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' +
    updateTitle + '&limit=1&format=json&callback=?';

  let reference = 'http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=Jimi_Hendrix&callback=?'
  let secondRef = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=bee&limit=1&format=json'
  console.log(`Your request is like: ${request}`);

  getJSON(request, false);
}

function showResult(title, description, link) {

  //Here we remove all that was here
  $('#container').empty();

  //And here we append all needed data
  $('#container').append(
    `
    <h1><b>${title}</b></h1>
    <br/><br/>
    <h1>${description}</h1>
    <br/>
    <a href='${link}'>
      <button id='wiki'>Wiki</button>
    </a>
    `
  );
}

function findRandom() {
  $(document).ready(function(){
    $.ajax({
        type: "GET",
        url: 'http://en.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&prop=extracts&exchars=500&format=json&grnlimit=1&callback=?',
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            let title = String(
              data.query.pages[Object.keys(data.query.pages)].title
            );

            let description = String(
              data.query.pages[Object.keys(data.query.pages)].extract
            );

            let linkFin = 'https://en.wikipedia.org/wiki/' + String(title.replace(/ /g, '_'));

            console.log(`
              title: ${title} \n
              description: ${description} \n
              link: ${linkFin}`);

            showResult(title, description, linkFin);
        },

        error: function (errorMessage) {}
    });
  });
}
