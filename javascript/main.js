var ticTacToe = {

  turnCounter: 0,

  //Red is assigned a 1 on the 3x3 board, and blue is assigned a zero
  gameBoard: ["","","",
              "","","",
              "","",""],

  //There are eight possible ways to win in ticTacToe
  wins:  { one:[0,3,6], two:[1,4,7], three:[2,5,8], four:[0,1,2], five:[3,4,5], six:[6,7,8], seven:[0,4,8], eight:[2,4,6] },

  checkForWin: function() {
    for (var x in this.wins) {
      if ( parseInt(this.gameBoard[this.wins[x][0]]) + parseInt(this.gameBoard[this.wins[x][1]]) + parseInt(this.gameBoard[this.wins[x][2]]) === 3) {
        setTimeout(function () {
          alert('red wins');
        }, 100);
        true;
        return;
      } else if ( parseInt(this.gameBoard[this.wins[x][0]]) + parseInt(this.gameBoard[this.wins[x][1]]) + parseInt(this.gameBoard[this.wins[x][2]]) === 0) {
        setTimeout(function () {
          alert('blue wins');
        }, 100);
        true;
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
  }

};

  var score = function($this) {
    if ($this.is("#tl")) {
      if ($this.is(".red")) {
        ticTacToe.gameBoard[0] = "1";
      } else if ($this.is(".blue")) {
          ticTacToe.gameBoard[0] = "0";
        }
      return
    } else if ($this.is("#tm")) {
      if ($this.is(".red")) {
        ticTacToe.gameBoard[1] = "1";
      } else if ($this.is(".blue")) {
          ticTacToe.gameBoard[1] = "0";
        }
      return
    } else if ($this.is("#tr")) {
      if ($this.is(".red")) {
        ticTacToe.gameBoard[2] = "1";
      } else if ($this.is(".blue")) {
          ticTacToe.gameBoard[2] = "0";
        }
        return
    } else if ($this.is("#cl")) {
      if ($this.is(".red")) {
        ticTacToe.gameBoard[3] = "1";
      } else if ($this.is(".blue")) {
          ticTacToe.gameBoard[3] = "0";
        }
        return
    } else if ($this.is("#cm")) {
      if ($this.is(".red")) {
        ticTacToe.gameBoard[4] = "1";
      } else if ($this.is(".blue")) {
          ticTacToe.gameBoard[4] = "0";
        }
        return
    } else if ($this.is("#cr")) {
      if ($this.is(".red")) {
        ticTacToe.gameBoard[5] = "1";
      } else if ($this.is(".blue")) {
          ticTacToe.gameBoard[5] = "0";
        }
      return
    } else if ($this.is("#bl")) {
      if ($this.is(".red")) {
        ticTacToe.gameBoard[6] = "1";
      } else if ($this.is(".blue")) {
          ticTacToe.gameBoard[6] = "0";
        }
        return
    } else if ($this.is("#bm")) {
      if ($this.is(".red")) {
        ticTacToe.gameBoard[7] = "1";
      } else if ($this.is(".blue")) {
          ticTacToe.gameBoard[7] = "0";
        }
      return
    } else if ($this.is("#br")) {
      if ($this.is(".red")) {
        ticTacToe.gameBoard[8] = "1";
      } else if ($this.is(".blue")) {
          ticTacToe.gameBoard[8] = "0";
        }
        return
    }
}

$('td').on('click', function(){
  var $this = $(this);

  if ( $this.hasClass('red') || $this.hasClass('blue') ) {
    alert('Pick a different square');
    return;
  }

  ticTacToe.turnCounter = parseInt(ticTacToe.turnCounter) + 1;
  // console.log(ticTacToe.turnCounter)

  if (ticTacToe.isOdd(ticTacToe.turnCounter) == true) {
    $(this).addClass('blue').fadeIn( "slow", function() {});
    console.log(this.id)
  } else {
    $(this).addClass('red').fadeIn( "slow", function() {});
    console.log(this.id)
  }

  score($this);

  if (ticTacToe.checkForWin() == true) {
    $(".gameBox red", ".gameBox blue").attr("class", "gameBox")
    return;
  }
})
