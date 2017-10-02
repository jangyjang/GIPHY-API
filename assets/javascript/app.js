// Initial array of feelings
var feelingArray = ["happy", "sad", "angry", "bored", "upset", "stupid", "overwhelmed", "fantastic", "awesome", "horrible", "meh", "excited"];




// Function to create button for each feeling
function createFeelingButtons() {
  // Clearing buttonsArea each time this function runs otherwise all the buttons will be created repeatedly
  $("#buttonsArea").empty();
  // Looping through feelingArray, then dynamicaly generating buttons for each feeling in the array, and then append the buttons in #buttonsArea
  for (var i = 0; i < feelingArray.length; i++) {
    var feelingButton = $("<button>").addClass("feelingButton").attr("data-name", feelingArray[i]).text(feelingArray[i]);
    $("#buttonsArea").append(feelingButton);
  }//end of for loop
}//end of createFeelingButtons



$("#addNewFeelingButton").on("click", addNewFeelingButtons);
// This function handles events where #addNewFeelingButton is clicked

function addNewFeelingButtons(event) {
  event.preventDefault();

  // This line grabs the input from the textbox and evaluates what to do with it
  var feelingInput = $("#feeling-input").val().trim();
    if (feelingArray.indexOf(feelingInput) > -1){
      alert("That feeling already exists. Try another one.");
      formReset ();
    }
    if (feelingInput == "") {
       alert ("You might feel \"empty\" today, but you have to enter something in the box.");
       formReset ();
    }
    if ((feelingArray.indexOf(feelingInput) === -1) && (feelingInput != "")) {
      feelingArray.push(feelingInput);
      formReset ();
    }
  // Calling createFeelingButtons which handles the processing of creating a button of the feelingArray
  createFeelingButtons();
  
}

//this function is to reset form so that it becomes blank
function formReset() {
  document.getElementById("feelingFormArea").reset();
}


//whenever .feelingButton is clicked, execute displayFeelingGIF function
$(document).on("click", ".feelingButton", displayFeelingGIF);
// Function for displaying feelingGIFs. Using $(document).on instead of $(".feelingButton").on to add event listenersto dynamically generated elements
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
          var ratingText = $("<p>").html("Rating: <span>" + rating.toUpperCase() + "</span>");
          var stillURLs = GIF[i].images.fixed_height_still.url;
          var animateURLs = GIF[i].images.fixed_height.url;
          var eachGIFimgtag = $("<img class = 'eachGIF'>").attr({
                                "src": stillURLs,
                                "data-state": "still",
                                "data-animateurl": animateURLs,
                                "data-stillurl": stillURLs,
                              });
          displayGIF.append(ratingText);
          displayGIF.append(eachGIFimgtag);
          $("#feelingToday").html("<h2> Feeling <span>" + feeling + "</span>? Here are some GIFs for you!</h2>");
          $("#GIFsArea").prepend(displayGIF);
        }//end of for loop

    $(".eachGIF").on("click", stillorAnimate);
      function stillorAnimate (){
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
    };//end of stillOrAnimatefunction
  });//end of response function
};//end of displayFeelingGIF function
      
// Calling the createFeelingButtons function to display the intial buttons
createFeelingButtons();


