var posts = {};

//gets the data from the datapage /newsSources created by the router.get in index.js
$.ajax('/newsSources', {
  method: "GET",

  success: function(data){
    var myData = JSON.parse(data);

    var textTitle = '<ul class="">'; //creates a variable defined as an unordered list

    for (var i = 0; i < myData.sources.length; i++) { //loops through the json data retrieved with the AJAX function

        //adds a list item to the ul, with a link, paragraph and button. <li> is automatically closed in the loop.
      textTitle += '<li class="newslink" identifier="' + myData.sources[i].id + '"><a href="#" data-source="'+ myData.sources[i].id +'">' + myData.sources[i].name + '</a>';
      textTitle += '<p>' + myData.sources[i].description + '</p>';
      textTitle += '<button type = "button" id="favourites"> Add to favourites </button>';

      //adds a property to the global posts variable for the 'current' news page in the loop
        posts[myData.sources[i].id] = {
          name_id: myData.sources[i].id,
          title: myData.sources[i].name,
          description: myData.sources[i].description,
          link: myData.sources[i].url
        };
    }

    textTitle += '</ul>'; //adds a closing tag to the textTitle variable
    $('#sourceContainer').append(textTitle); //appends the data to the div in index.html

    },
  error:function(error){
      console.log('error: ' + error)
  }
});

//when clicking the 'Add to favourites' button, the ajax post request sends the specific news source object (within
// the posts variable) to the favourites.js file, which then saves it to the favourites database.

$('body').on('click', '#favourites', function(){
    var id = $(this).parent().attr("identifier"); //gets the specific news source property by means of the identifier
   $.ajax('/favourites', {
       method: "POST",
       data: posts[id], //posts the specific news source property by means of the id defined above
       success: function(data){
           console.log(data);
       },
       error: function(error){
           console.log('error: ' + error)
       }
   })
});

//When clicking on the news name link, the below ajax request gets the top stories data from the news1 page created
// by the router.get in news1.js.

$('body').on('click', '.newslink a', function() {
    $.ajax('/news1/' + $(this).attr('data-source'), { //gets the top stories from the specific news source
        method: "GET",

        success: function(data){
            var articleData = JSON.parse(data);

            var articleTitle = '<h1>'+ articleData.source +' Top Stories</h1>';

            for (var j = 0; j < articleData.articles.length; j++) {
                articleTitle += '<div class="articleImage" style=\"background-image: url(\''+articleData.articles[j].urlToImage +'\');\"></div>';

                articleTitle += '<a href="' + articleData.articles[j].url + '" target="_blank"><h4>' + articleData.articles[j].title + '</h4></a>';
                articleTitle += '<p>' + articleData.articles[j].description + '</p>';
                articleTitle += '<p class="published">' + '<strong>Published:</strong> ' + articleData.articles[j].publishedAt + '</p>';

            }
            $('#articlesContainer').empty().append(articleTitle);
        },
        error: function(error){
            console.log('error: ' + error)
        }
    });

});
