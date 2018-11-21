var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC";
var topics = ["five", "six"];
var topicQueryURL;

var getTopic = function (event) {
    console.log("getTopic ran  ");
    // Preventing the buttons default behavior when clicked (which is submitting a form)
    event.preventDefault();
    // This line grabs the input from the textbox
    var topic = $("#topic-input").val().trim();
    console.log("last topic is   " + topic);
    // Adding the topic from the textbox to our array
    topics.push(topic);
    // Calling renderButtons which handles the processing of our topic array
    renderButtons();
    return topic;
}

// This function handles events where one button is clicked
$("#add-topic").on("click", getTopic)

var renderButtons = function () {
    var btnsView = $("#buttons-view");
    btnsView.empty();
    for (var i = 0; i < topics.length; i++) {
        // Then dynamicaly generating buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var newButton = $("<button>");
        // console.log(" new button holds the following stuff  see below: ")
        // console.log(newButton);
        // Adding a class of movie to our button
        newButton.addClass("topic");
        // Adding a data-attribute
        newButton.attr("data-name", topics[i]);
        // Providing the initial button text
        newButton.text(topics[i]);
        //delete all the butns
        var btnsView = $("#buttons-view");

        // Adding the button to the HTML
        btnsView.append(newButton);
        //.on( events [, selector ] [, data ], handler )
        newButton.on("click",function(){
            var topic=$(this).attr("data-name");
            console.log("topic right now is" + topic);
            displayTopicGifs(topic);
            console.log("newButton just clicked listener worked");
        });
    }
}

renderButtons();

var displayTopicGifs = function (topic) {

    topicQueryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({
        url: topicQueryURL,
        method: "GET"
    })
        // After data comes back from the request
        .then(function (response) {
            console.log("below line should include topic");
            console.log(queryURL);
            console.log(response);
            // storing the data from the AJAX request in the results variable
            var results = response.data;
            // Looping through each result item
            for (var i = 0; i < results.length; i++) {
                // Creating and storing a div tag
                var topicDiv = $("<div>");
                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + results[i].rating);
                // Creating and storing an image tag
                var topicImage = $("<img>");
                // Setting the src attribute of the image to a property pulled off the result item
                topicImage.attr("src", results[i].images.fixed_height.url);
                // Appending the paragraph and image tag to the topicDiv
                topicDiv.append(p);
                topicDiv.append(topicImage);
                // Prependng the topicDiv to the HTML page in the "#gifs-appear-here" div
                $("#topic-gifs-appear-here").prepend(topicDiv);
            }
        });
}
  
$("button").on("click", function() {
    // Grabbing and storing the data-animal property value from the button
    var topic = $(this).attr("data-name");

    // Constructing a queryURL using the animal name
    var topicqQueryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      topic + "&api_key=dc6zaTOxFJmzC&limit=10";
      $.ajax({
        url: topicQueryURL,
        method: "GET"
    })
        // After data comes back from the request
        .then(function (response) {
            console.log("below line should include topic");
            console.log(topicQueryURL);
            console.log(response);
            // storing the data from the AJAX request in the results variable
            var results = response.data;
            // Looping through each result item
            for (var i = 0; i < results.length; i++) {
                // Creating and storing a div tag
                var topicDiv = $("<div>");
                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + results[i].rating);
                // Creating and storing an image tag
                var topicImage = $("<img>");
                // Setting the src attribute of the image to a property pulled off the result item
                topicImage.attr("src", results[i].images.fixed_height.url);
                // Appending the paragraph and image tag to the topicDiv
                topicDiv.append(p);
                topicDiv.append(topicImage);
                $("#topic-gifs-appear-here").prepend(topicDiv);
            }
 });
});