// Initialize Firebase
let firebaseConfig = {
    apiKey: "AIzaSyDEyWVLqhfOLvcOxGZUPD7YzHuZkfGoyNw",
    authDomain: "trainscheduler-61d42.firebaseapp.com",
    databaseURL: "https://trainscheduler-61d42.firebaseio.com",
    projectId: "trainscheduler-61d42",
    storageBucket: "",
    messagingSenderId: "525697484522",
    appId: "1:525697484522:web:ca85d555af5f3f72"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

 // Create a variable to reference the database.
 let database = firebase.database();

 // Click Button changes what is stored in firebase
$("#add-train-btn").on("click", function (event) {
  // Prevent the page from refreshing
  event.preventDefault();

  // Grab values from input 
  let trnName = $("#name-input").val().trim();
  let trnDest = $("#location-input").val().trim();
  let trnTime = $("#time-input").val().trim();
  let trnFreq = $("#rate-input").val().trim();

 // Creates local "temporary" object for holding employee data
 let newTrn = {
  name: trnName,
  destination: trnDest,
  firstTrainTime: trnTime,
  rate: trnFreq,
};

// Uploads train data to the database
database.ref().push(newTrn);

// // Logs everything to console
// console.log(newTrn.name);
// console.log(newTrn.destination);
// console.log(newTrn.firstTrainTime);
// console.log(newTrn.rate);

alert("Train successfully added");

//Clear Input Fields
$("#train-input").val("");
$("#location-input").val("");
$("#time-input").val("");
$("#rate-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  let trnName = childSnapshot.val().name;
  let trnDest = childSnapshot.val().destination;
  let trnTime = childSnapshot.val().firstTrainTime;
  let trnFreq = childSnapshot.val().rate;
  
  // // Train Info
  // console.log(trnName);
  // console.log(trnDest);
  // console.log(trnTime);
  // console.log(trnFreq);

// Save snapshot object as a variable
var newCalc = childSnapshot.val();

 // Calculations
  var timeConversion = moment(childSnapshot.val().firstTrainTime, "hh:mm").subtract(1, "years");
  var timeDifference = moment().diff(moment(timeConversion), "minutes");
  var minutesRemaining = timeDifference % childSnapshot.val().rate;
  var minutesRemaining = childSnapshot.val().rate - minutesRemaining;
  var nextArrival = moment().add(minutesRemaining, "minutes");
  nextArrival = moment(nextArrival).format("time");

  // Log everything that's coming out of snapshot
  console.log("Name: " + newCalc.name);
  console.log("Destination: " + newCalc.destination);
  console.log("First Train Time: " + newCalc.firstTrainTime);
  console.log("Frequency: " + newCalc.rate);
  console.log("Next Arrival: " + nextArrival);
  console.log("Minutes Remaining: " + minutesRemaining);



  // // Create the new row
  // var newRow = $("<tr>").append(
  //   $("<td>").text(trnName),
  //   $("<td>").text(trnDest),
  //   $("<td>").text(trnTime),
  //   $("<td>").text(trnFreq),
  //   $("<td>").text(nextArrival),
  // );

  $("#train-table").append(
    "<tr><td>" + trnName + "</td>" +
    "<td>" + trnDest + "</td>" +
    "<td>" + trnTime + "</td>" +
    "<td>" + trnFreq + "</td>" +
    "<td>" + nextArrival + "</td>"

//   // Append the new row to the table
//   $("#train-table > tbody").append(newRow);
// });
  );

  });