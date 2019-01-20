$(document).on ("click", function() {


console.log("test");

var config = {
  apiKey: "AIzaSyAsj5Lfq_TNWhM6L_e9LGIa-0sk6XJQcaE",
  authDomain: "train-scheduler-2f34c.firebaseapp.com",
  databaseURL: "https://train-scheduler-2f34c.firebaseio.com",
  projectId: "train-scheduler-2f34c",
  storageBucket: "train-scheduler-2f34c.appspot.com",
  messagingSenderId: "500439050203"
};
firebase.initializeApp(config);
console.log(firebase);
  var database = firebase.database();
  // Line 18 was added 1/19/19
  var ref = database.ref("Train");
  $("#submit-button").on("click", function(event) {
      event.prevntDefault();
      console.log("test");
// Line 16  (Uncaught error for the value for trim()).
  var nameOfTrain = $("#name-train-input").val().trim();
  var trainDestination = $("#train-destination-input").val().trim();
  var trainTime = moment($("#train-time-input").val().trim(), "HH:mm").format();
  var trainFrequency = $("#train-frequency-input").val().trim();
  var newTrain = {
      name: nameOfTrain,
      destination: trainDestination,
      time: trainTime,
      frequency: trainFrequency,

  };
  ref.push(newTrain);
  
  // database.ref().push(newTrain);
// Nothing log at line 30.
  console.log(newTrain.destination);

  $("#name-train-input").val("");
  $("#train- destination-input").val("");
  $("#train-time-input").val("");
  $("#train-frequency-input").val("");

});
// Test #2 logged in the console.
console.log("test2");

// .orderByChild("dateAdded")--- this piece of code get added after .ref()

database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  var nameOfTrain = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().time;
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

    $("#train-table > tbody").append(addedRow);
  

  console.log("test3");
})

});
