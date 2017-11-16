$.ajax('/favourites', {
    method: 'GET',
    success: function(data){
        var sourcesData = data;

        var sourcesCard = [];

        for (var j = 0; j < sourcesData.length; j++) {
            sourcesCard += '<div class="articleImage"><img src="http://via.placeholder.com/350x250"></div>';

            sourcesCard += '<a class="newslink" data-source="'+ sourcesData[j].name_id +'" href="#"><h4>' + sourcesData[j].title + '</h4></a>';
            sourcesCard += '<p>' + sourcesData[j].description + '</p>';
            sourcesCard += '<a class="website" href="'+ sourcesData[j].link +'">' + 'Go to website </a>';

        }
        $('#sourceContainer').append(sourcesCard)
    },
    error: function(error){
        console.log("error: " + error);
    }
});

$('body').on('click', '.newslink', function() {
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