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
          alert('Crosses wins');
        }, 100);
        true;
        return;
      } else if ( parseInt(this.gameBoard[this.wins[x][0]]) + parseInt(this.gameBoard[this.wins[x][1]]) + parseInt(this.gameBoard[this.wins[x][2]]) === 0) {
        setTimeout(function () {
          alert('Naughts wins');
        }, 100);
        true;
        return;
      } else if (this.turnCounter === 9) {
        setTimeout(function () {
          alert('Draw');
        }, 100);
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

  recordScore: function(inputId) {
    //loop through each square in the table
    $( "td" ).each(function( index ) {
      //loop through each possible id of the squares and record it as 'currentId'
      for (var i = 0; i < 9; i++) {
        currentId = "#" + i.toString();
        //Determine if the current square id from the each loop matches the current square id from the for loop
        if (inputId.is(currentId)) {
          //Use the number from the for loop as the index of the score in the gameboard array. This works because the id's of the squares on the gameboard are from #0 => #8 and the gameboard array is indexed from [0] => [8].
          if (inputId.is(".cross")) {
            //cross assigned a 1 and naught is assigned a 0
            ticTacToe.gameBoard[i] = "1";
          } else if (inputId.is(".naught")) {
              ticTacToe.gameBoard[i] = "0";
            }
          return
        }//if
      }//for
    })//each
  }

};

$('td').on('click', function(){
  //the click on the current square is represented by $this
  var $this = $(this);

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

  //Record this score in the gameboard array
  ticTacToe.recordScore($this);

  //Check if there is a winner
  if (ticTacToe.checkForWin() == true) {
    $(".gameBox cross", ".gameBox naught").attr("class", "gameBox")
    return;
  }
})
