$(document).on ("click", function() {


console.log("test");

var config = {
  apiKey: "AIzaSyBZvxogMVgsDsCW1136rCVLhFnLsmxJj3s",
  authDomain: "myfirstproject-ff297.firebaseapp.com",
  databaseURL: "https://myfirstproject-ff297.firebaseio.com",
  projectId: "myfirstproject-ff297",
  storageBucket: "myfirstproject-ff297.appspot.com",
  messagingSenderId: "601292464722"
};
  firebase.initializeApp(config);
  var database = firebase.database();
  $("#submit-button").on("click", function(event) {
      event.prevntDefault();
// Line 16  (Uncaught error for the value for trim()).
  var nameOfTrain = $("#name-train").val().trim();
  var trainDestination = $("#train-destination").val().trim();
  var trainTime = moment($("#train-time").val().trim(), "HH:mm").format();
  var trainFrequency = $("#train-frequency").val().trim();
  var newTrain = {
      name: trainName,
      destination: trainDestination,
      time: trainTime,
      frequency: trainFrequency,

  };
  
  database.ref("data/user").push(newTrain);
// Nothing log at line 30.
  console.log(newTrain.destination);

  $("#name-train").val("");
  $("#train- destination").val("");
  $("#train-time").val("");
  $("#train-frequency").val("");

});
// Test #2 logged in the console.
console.log("test2");

database.ref().orderByChild("dateAdded").on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  var nameOfTrain = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var traintime = childSnapshot.val().time;
  var trainFrequency =childSnapshot.val().frequency;
  
  console.log(nameOfTrain);
// Moment.js 
// Set up the time and frequency.

  
  var frequencyTrian = 7;
  var timeNow = "12:00";
  var timeConverted = moment(timeNow, "HH:mm").subtract(1, "year");
  var timeDiff = moment().diff(moment(timeConverted), "mintues");
  var remainTime = timeDiff % frequencyTrian;
  var nextArrival = frequencyTrian - remainTime;
  var minutesAway = moment().add(nextArrival, "mintues");


  var addedRow = $("<tr>").append(
    $("<td>").text(nameOfTrain),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
     $("<td>").text(nextArrival),
     $("<td>").text(minutesAway),
    );

    $("#table-input > tbody").append(addedRow);
  

  console.log("test3");
})

});
