/**
 * Created by ryanhoyda on 5/31/17.
 */





var topics = ["Movies", "TV Shows", "Entertainment", "Politics", "Science", "Military",
    "Fashion", "Music", "Pop Culture", "Sports"];

var images = [];

var queryURL = "http://api.giphy.com/v1/gifs/search?rating(g,pg,pg-13,r)&limit=12&q="
var api_key = "&api_key=dc6zaTOxFJmzC"


//host api.giphy.com
//path v1/gifs/search  -  search endpoint
// q= any term or phrase https://api.giphy.com/v1/gifs/search?rating(g%20pg,%20pg-13,%20r)&limit=12&q=&api_key=dc6zaTOxFJmzC
// so within url after q=, you can select anything you would like to search for

$(document).ready(function () {
    renderButtons();

    $("#topicBtn").on("click", function (event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var topic = $("#topic-input").val().trim();

        // Adding topic from the textbox to our array
        topics.push(topic);

        // Calling renderButtons which handles the processing of our topics array
        renderButtons();
    });

});


    function updateClickListeners() {
        $(".topic").click(function () {
            var btn = $(this); //now we know what button they pressed
            var txt = $(this).text(); // Trying to get the button's text


            var query = queryURL + txt + api_key;
            console.log(query); //to test...
            //do ajax from this point...
            $.ajax({
                url: query,
                method: 'GET'
            }).done(function (response) {
                console.log('ajax finished');


                var length = response.data.length;
                console.log('Number of images retured was ' + length);


                //create a counter variable that starts at 1
                var counter = 1;


                //enter a for loop that ends at lenght or 12, which ever comes first
                for (var i = 0; i < response.data.length; i++) {
                    var img = $('#img-' + counter);
                    $( img ).removeClass( "hidden" );

                    // Storing the result item's rating
                    var rating = response.data[i].rating;


                    var label = $("#rating-" + counter).text("Rating: " + rating)  //TODO: Select the <p> tag that goes with this <img> tag
                    //TODO: Update the text of this label with the rating


                    counter++;
                    img.attr('src', response.data[i].images.fixed_height.url);
                    console.log('Image URL is ' + response.data[i].images.fixed_height.url);
                    images.append(img);
                }
            });
        });
    }

    function renderButtons() {

        // Deleting the topic buttons
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of movies
        for (var i = 0; i < topics.length; i++) {

            // Then dynamically generating buttons for each movie in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var a = $("<button>");
            // Adding a class of movie to our button
            a.addClass("topic btn");
            // Adding a data-attribute
            a.attr("data-name", topics[i]);
            // Providing the initial button text
            a.text(topics[i]);
            // Adding the button to the buttons-view div
            $("#buttons-view").append(a);
        }
        //Add this too!
        updateClickListeners();
    }

//
// $.ajax({
//     url: queryURL,
//     method: 'GET'
//     //.done(function(response) {
//     //console.log(response.data[0].embed_url);
//
// }).done(function(response) {
//     var images = $(".images");
//     var length = response.data.length;
//
//
//     for ( var i = 0; i < length; i++) {
//         var img = $('<img>');
//         img.attr('src', response.data[i].images.fixed_height.url);
//         images.append(img);
//     }
// });


// Adding a click event listener to all elements with a class of "movie"
//$(document).on("click", ".topics" );

