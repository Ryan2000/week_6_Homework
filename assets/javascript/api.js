/**
 * Created by ryanhoyda on 5/31/17.
 */





var topics = ["Movies", "TV Shows", "Entertainment", "Politics", "Science", "Military",
    "Fashion", "Music", "Pop Culture", "Sports"];

var queryURL = "http://api.giphy.com/v1/gifs/search?rating(g pg, pg-13, r)&limit=12&q="
var api_key = "&api_key=dc6zaTOxFJmzC"

$(document).ready(function(){
    renderButtons();
    $("#topicBtn").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var topic = $("#topic-input").val().trim();

        // Adding topic from the textbox to our array
        topics.push(topic);

        // Calling renderButtons which handles the processing of our topics array
        renderButtons();
    });

    $(".topic").click(function(){
        var btn = $(this); //now we know what button they pressed
        var txt = $(this).text(); //I think? Trying to get the button's text

        var query = queryURL + txt + api_key;
        console.log(query); //to test...
        //do ajax from this point...
        $.ajax({
            url: query,
            method: 'GET'
        }).done(function(response){
            console.log('ajax finished');
        });
    });
});


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



// Function for displaying movie data
function renderButtons() {

    // Deleting the movies prior to adding new movies
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
}




// Adding a click event listener to all elements with a class of "movie"
//$(document).on("click", ".topics" );

// Calling the renderButtons function to display the initial buttons
renderButtons();