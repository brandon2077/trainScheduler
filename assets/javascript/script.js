// Initialize Firebase
var config = {
    apiKey: "AIzaSyCS9zoYAXCoz1bGyVBpHahYkaxMxN-ScaM",
    authDomain: "trainscheduler-697d4.firebaseapp.com",
    databaseURL: "https://trainscheduler-697d4.firebaseio.com",
    projectId: "trainscheduler-697d4",
    storageBucket: "trainscheduler-697d4.appspot.com",
    messagingSenderId: "1086117551731"
  };
firebase.initializeApp(config);

var database = firebase.database();

// Initial .on("click") event 
$('#add-train-btn').on("click", function() {

  // Capture Inputs and Store In Variables
  var trainName = $('#train-name').val().trim();
  var trainDest = $('#train-dest').val().trim();
  var trainTime = $('#train-time').val().trim();
  var trainFreq = $('#train-freq').val().trim();

  // Console logging
  console.log(trainName);
  console.log(trainDest);
  console.log(trainTime);
  console.log(trainFreq);

  // Create Object With Input Variables
  var newTrain = {
    name: trainName,
    destination: trainDest,
    time: trainTime,
    frequency: trainFreq
  };  

  // Send Input to Firebase Database
  database.ref().push(newTrain);

  // Alert Upon Sending
  alert("Train Added to Database");

  // Clear input fields
  $('#train-name').val("");
  $('#train-dest').val("");
  $('#train-time').val("");
  $('#train-freq').val("");

  return false;
});

// Firebase Event Listening for on.("child_added") to Retrieve Data...
// ...and populate HTML
database.ref().on("child_added", function(snapshot) {

  // Log snapshot to the Console
  console.log(snapshot);

  // Store snapshot Values Into Variables
  var trainName = snapshot.val().name; 
  var trainDest = snapshot.val().destination;
  var trainTime = snapshot.val().time;
  var trainFreq = snapshot.val().frequency;

  // Console Logging the snapshot Values
  console.log(trainName);
  console.log(trainDest);
  console.log(trainTime);
  console.log(trainFreq);

  // Calculating Minutes Away
  // First Train Time Converted
  var trainTimeConv = moment(trainTime, "HH:mm").subtract(1, "years");
  console.log(trainTimeConv);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference Between First Train Time and Current Time
  // Using moment() to Convert to Minutes
  var diffTime = moment().diff(moment(trainTimeConv), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Calculating the Remainder for Time Apart 
  var timeRemainder = diffTime % trainFreq;
  console.log(timeRemainder);

  // Minutes Until Train
  var timeAway = trainFreq - timeRemainder;
  console.log("MINUTES TILL TRAIN: " + timeAway);


  // Adding snapshot Values to the Tables
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + "</td><td>" + trainTime + "</td><td>" + timeAway + "</td></tr>"); 


});
