// Initial array of feelings
var feelingArray = ["happy", "sad", "angry", "bored", "upset", "stupid", "overwhelmed", "fantastic", "awesome", "horrible", "meh", "excited"];


// Function to create button for each feeling
function createFeelingButtons() {
  // Deleting the buttons prior to adding new feeling
  $("#buttonsArea").empty();
  // Looping through feelingArray, then dynamicaly generating buttons for each feeling in the array
  for (var i = 0; i < feelingArray.length; i++) {
   //create a button for each feeling
    var feelingButton = $("<button>").addClass("feeling").attr("data-name", feelingArray[i]).text(feelingArray[i]);
    $("#buttonsArea").append(feelingButton);
  }//end of for loop
}//end of createFeelingButtons


// This function handles events where #addNewFeelingButton is clicked
$("#addNewFeelingButton").on("click", function(event) {
  event.preventDefault();
  
  // This line grabs the input from the textbox and evaluate what to do with it
  var feelingInput = $("#feeling-input").val().trim();
    if (feelingArray.indexOf(feelingInput) > -1){
      alert("That feeling already exists. Try another one.");
    }
    if (feelingInput == "") {
       alert ("Feeling \"empty\" today? HUGS! But you've got to enter \"empty\" in the box.");
    }
    if ((feelingArray.indexOf(feelingInput) === -1) && (feelingInput != "")) {
      feelingArray.push(feelingInput);
    }
  // Calling createFeelingButtons which handles the processing of creating a button of the feelingArray
  createFeelingButtons();
});

function displayFeelingGIF() {
  $("#GIFsArea").empty();
  var feeling = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" + feeling + "&limit=10";
  console.log(this)
  console.log(feeling)

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
      console.log(response)
      var GIF = response.data;
        for (var i=0; i<GIF.length; i++){
          var displayGIF = $("<div class = 'GIF'>");
          var rating = GIF[i].rating;
          var ratingText = $("<p>").text("Rating: " + rating.toUpperCase());
          var stillURLs = GIF[i].images.fixed_height_still.url;
          var animateURLs = GIF[i].images.fixed_height.url;
          var eachGIFimgtag = $("<img class = 'eachGIF'>").attr({
                                "src": stillURLs,
                                "data-state": "still",
                                "data-animateurl": animateURLs,
                                "data-stillurl": stillURLs,
                              });
          displayGIF.append(ratingText);
          displayGIF.append(eachGIFimgtag).css("float","left");
          $("#feelingToday").html("<h2> Feeling " + feeling + "? Here are some GIFs for you!</h2>");
          $("#GIFsArea").prepend(displayGIF);
        }//end of for loop

    $(".eachGIF").on("click", function() {
      var GIFstate = $(this).attr("data-state");
      console.log(this)
      console.log(GIFstate)
      if (GIFstate === "still") {
        $(this).attr("src", $(this).attr("data-animateurl"));
        $(this).attr("data-state", "animate");
      }
      else {
        $(this).attr("src", $(this).attr("data-stillurl"));
        $(this).attr("data-state", "still");
      }//end of if-else statments
    });//end of onclick eachGIF function
  });//end of response function
};//end of displayFeelingGIF function
      
// Function for displaying feeling GIFs. Using $(document).on instead of $(".feeling").on to add event listenersto dynamically generated elements
//whenever .feeling is clicked, execute displayFeelingGIF function
$(document).on("click", ".feeling", displayFeelingGIF);

// Calling the createFeelingButtons function to display the intial buttons
createFeelingButtons();


