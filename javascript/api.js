/**
 * Created by ryanhoyda on 5/31/17.
 */





var topics = ["Movies", "TV Shows", "Entertainment", "Politics", "Science", "Military",
    "Fashion", "Music", "Pop Culture", "Sports"];

var queryURL = "http://api.giphy.com/v1/gifs/search?q=movies&api_key=dc6zaTOxFJmzC"

$.ajax({
    url: queryURL,
    method: 'GET'
    //.done(function(response) {
    //console.log(response.data[0].embed_url);

}).done(function(response) {
    var images = $(".images");
    var length = response.data.length;


    for ( var i = 0; i < length; i++) {
        var img = $('<img>');
        img.attr('src', response.data[i].images.fixed_height.url);
        images.append(img);
    }
});


// Function for displaying movie data
function renderButtons() {

    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of movies
    for (var i = 0; i < topics.length; i++) {

        // Then dynamicaly generating buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of movie to our button
        a.addClass("topic");
        // Adding a data-attribute
        a.attr("data-name", topics[i]);
        // Providing the initial button text
        a.text(topics[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

// This function handles events where a movie button is clicked
$("#add-topic").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var topic = $("#topic-input").val().trim();

    // Adding movie from the textbox to our array
    topic.push(topics);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});

// Adding a click event listener to all elements with a class of "movie"
$(document).on("click", ".topics");

// Calling the renderButtons function to display the initial buttons
renderButtons();