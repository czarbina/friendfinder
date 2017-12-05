var friendsData = require("../data/friends");

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

  // Below code will allow us to sum arrays of numbers for comparison later
  // ========================================================
    var sum = function(total, num) {
      return parseInt(total) + parseInt(num); 
    }
      
  // Loops through friends array to find matching sum scores and will respond
  // with the closest match. NOTE: Logic far from perfect here, but I just
  // wanted to get something. 

    for (i=0; i < friendsData.length; i++) {
      if(req.body.scores.reduce(sum) - friendsData[i].scores.reduce(sum) === 0) {

        console.log("You have a PERFECT match: " + friendsData[i].name);
        res.json(friendsData[i]);
      }

      else if (req.body.scores.reduce(sum) - friendsData[i].scores.reduce(sum) === 1 ||
        req.body.scores.reduce(sum) - friendsData[i].scores.reduce(sum) === -1) {

        console.log("You have an IMPERFECT match: " + friendsData[i].name);
        res.json(friendsData[i]);
      }
    }  
  });
};
