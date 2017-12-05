// Requiring data source which we are storing in a file with an array of "friends."

var friendsData = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================


module.exports = function(app) {
// API GET Requests for friends JSON. We designate /api/friends to be an
// endpoint that will deliver our friendsArray JSON when visited.

  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

  // API POST Request
  // Below code handles when a user submits the survey.
  // ========================================================

  app.post("/api/friends", function(req, res) {

  // Take POST request info and push it to friendsData array.
  // ========================================================
    friendsData.push(req.body);

  // Below code takes sum of req.body score
  // ========================================================
    // var myScores = req.body.scores;
  // console.log(myScores);

    var sum = function(total, num) {
      return parseInt(total) + parseInt(num); 
    }

  // score of user lives in myTotal 
    // var myTotal = myScores.reduce(sum);
    // console.log(myTotal);
    console.log(req.body.scores.reduce(sum));

      
  // Loops through friend list to retrieve scores of friends
  // friendTotal houses every score
 
    var friendScoreArray = [];  

    for (i=0; i < friendsData.length; i++) {
      if(req.body.scores.reduce(sum) - friendsData[i].scores.reduce(sum) === 0) {

        console.log("You have a PERFECT match: " + friendsData[i].name);
        // console.log(friendsData[i].name);
        res.json(friendsData[i]);


        // console.log("Friend: " + friendsData[i].name +
        //   "|| Score: " + friendsData[i].scores.reduce(sum));
        // friendScoreArray.push(friendsData[i].scores.reduce(sum));
      }

      else if (req.body.scores.reduce(sum) - friendsData[i].scores.reduce(sum) === 1 ||
        req.body.scores.reduce(sum) - friendsData[i].scores.reduce(sum) === -1) {
        console.log("You have an IMPERFECT match: " + friendsData[i].name);
        res.json(friendsData[i]);
      }

    }  
      // for(j=0; j<friendScoreArray.length;j++) {
      //   if (myTotal === friendScoreArray[j]) {
      //     console.log("We have a match");
      //   }
      //   else {
      //     console.log("No match");
      //   }
      // }

      // res.json(friendsData[0]);
      // console.log(friendScoreArray)
      // console.log(friendsData);

  });
      
};
