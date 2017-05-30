var ticTacToe = {

  turnCounter: 0,

  //gameBoard has 9 indicies to represent the 9 squares on a ticTacToe board. The 0th index represents the top left, 1st is the top middle, 2nd is top right, 3rd is center left and so on.
  gameBoard: ["","","","","","","","",""],

  //There are eight possible ways to win in ticTacToe, these combinations are represented by the following index values of 'gameBoard'
  wins:  { one:[0,3,6], two:[1,4,7], three:[2,5,8], four:[0,1,2], five:[3,4,5], six:[6,7,8], seven:[0,4,8], eight:[2,4,6] },

  checkForWin: function() {
    //Loop through each possible winning combination recorded in the 'wins' object
    for (var x in this.wins) {
      //if one of the winning index combinations from 'wins' is equal to 3, crosses win. If it is equal to 0, naughts win. This is because crosses are assigned a 1 for each of their moves and naughts are assigned a 0.
      if ( parseInt(this.gameBoard[this.wins[x][0]]) + parseInt(this.gameBoard[this.wins[x][1]]) + parseInt(this.gameBoard[this.wins[x][2]]) === 3) {
        setTimeout(function () {
          $("#alertBox, #crossWin").fadeIn("slow", function() {
          $('#alertBox').css('display', 'block')
          $('#crossWin').css('display', 'block')
        });
        }, 50);
        true;
        return;
      } else if ( parseInt(this.gameBoard[this.wins[x][0]]) + parseInt(this.gameBoard[this.wins[x][1]]) + parseInt(this.gameBoard[this.wins[x][2]]) === 0) {
        setTimeout(function () {
          $("#alertBox, #naughtWin").fadeIn("slow", function() {
          $('#alertBox').css('display', 'block')
          $('#naughtWin').css('display', 'block')
        });
        }, 50);
        true;
        return;
      } else if (this.turnCounter === 9) {
        setTimeout(function () {
          $("#alertBox, #draw").fadeIn("slow", function() {
          $('#alertBox').css('display', 'block')
          $('#draw').css('display', 'block')
        });
        }, 50);
        return;
      }
    }
  },

  isOdd: function(turnCounter) {
    if (turnCounter % 2) {
      0;
      return true;
    } else {
      return false;
    }
  },

  recordScore: function(thisId, thisClass) {
    num = parseInt(thisId);
    if (thisClass.is(".cross")) {
      ticTacToe.gameBoard[num] = "1";
      return
    } else if (thisClass.is(".naught")) {
      ticTacToe.gameBoard[num] = "0";
      return
    }
  }

};

$('td').on('click', function(){
  //the click on the current square is represented by $this
  var $this = $(this);
  var thisId = this.id;

  //Don't do anything if the current square has already been clicked on
  if ( $this.hasClass('cross') || $this.hasClass('naught') ) {
    alert('Pick a different square');
    return;
  }

  //Determine whose turn it is
  ticTacToe.turnCounter = parseInt(ticTacToe.turnCounter) + 1;

  //Place naught or cross on the table
  if (ticTacToe.isOdd(ticTacToe.turnCounter) == true) {
    $(this).addClass('naught')
  } else {
    $(this).addClass('cross')
  }

  ticTacToe.recordScore(thisId, $this);

  //Check if there is a winner
  if (ticTacToe.checkForWin() == true) {
    $(".gameBox cross", ".gameBox naught").attr("class", "gameBox")
    return;
  }
})
