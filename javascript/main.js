console.log('connected');

var ticTacToe = {

  turnCounter: 0,

  gameBoard: ["n","n","n",
              "n","n","n",
              "n","n","n"],

  checkForWin: function(gameboard) {
    if ( parseInt(this.gameBoard[0]) + parseInt(this.gameBoard[3]) + parseInt(this.gameBoard[6]) === 3) {
      alert('red wins');
    } else if ( parseInt(this.gameBoard[0]) + parseInt(this.gameBoard[3]) + parseInt(this.gameBoard[6]) === 0) {
      alert('blue wins');
    }
    if ( parseInt(this.gameBoard[1]) + parseInt(this.gameBoard[4]) + parseInt(this.gameBoard[7]) === 3) {
      alert('red wins');
    } else if ( parseInt(this.gameBoard[1]) + parseInt(this.gameBoard[4]) + parseInt(this.gameBoard[7]) === 0) {
      alert('blue wins');
    }
    if ( parseInt(this.gameBoard[2]) + parseInt(this.gameBoard[5]) + parseInt(this.gameBoard[8]) === 3) {
      alert('red wins');
    } else if ( parseInt(this.gameBoard[2]) + parseInt(this.gameBoard[5]) + parseInt(this.gameBoard[8]) === 0) {
      alert('blue wins');
    }
    if ( parseInt(this.gameBoard[0]) + parseInt(this.gameBoard[1]) + parseInt(this.gameBoard[2]) === 3) {
      alert('red wins');
    } else if ( parseInt(this.gameBoard[0]) + parseInt(this.gameBoard[1]) + parseInt(this.gameBoard[2]) === 0) {
      alert('blue wins');
    }
    if ( parseInt(this.gameBoard[3]) + parseInt(this.gameBoard[4]) + parseInt(this.gameBoard[5]) === 3) {
      alert('red wins');
    } else if ( parseInt(this.gameBoard[3]) + parseInt(this.gameBoard[4]) + parseInt(this.gameBoard[5]) === 0) {
      alert('blue wins');
    }
    if ( parseInt(this.gameBoard[6]) + parseInt(this.gameBoard[7]) + parseInt(this.gameBoard[8]) === 3) {
      alert('red wins');
    } else if ( parseInt(this.gameBoard[6]) + parseInt(this.gameBoard[7]) + parseInt(this.gameBoard[8]) === 0) {
      alert('blue wins');
    }
    if ( parseInt(this.gameBoard[0]) + parseInt(this.gameBoard[4]) + parseInt(this.gameBoard[8]) === 3) {
      alert('red wins');
    } else if ( parseInt(this.gameBoard[0]) + parseInt(this.gameBoard[4]) + parseInt(this.gameBoard[8]) === 0) {
      alert('blue wins');
    }
    if ( parseInt(this.gameBoard[2]) + parseInt(this.gameBoard[4]) + parseInt(this.gameBoard[6]) === 3) {
      alert('red wins');
    } else if ( parseInt(this.gameBoard[2]) + parseInt(this.gameBoard[4]) + parseInt(this.gameBoard[6]) === 0) {
      alert('blue wins');
    }
  },

  isOdd: function(turnCounter) {
    if (turnCounter % 2) {
      0;
      // console.log(true);
      return true;
  } else {
      // console.log(false);
      return false;
  }
}

};

$( document ).ready(function(){

  // var doubleCheck = function($this) {
  //   if ( $this.hasClass('gamebox red') || $this.hasClass('gamebox blue') ) {
  //     console.log("Pick a different box");
  //     break;
  //   }
  // }

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

  $('.gameBox').on('click', function(){
    var $this = $(this);
    // var $this = $(this);
    // doubleCheck()

    ticTacToe.turnCounter = parseInt(ticTacToe.turnCounter) + 1;
    // console.log(ticTacToe.turnCounter)

      if (ticTacToe.isOdd(ticTacToe.turnCounter) == true) {
        $(this).addClass('blue')
        console.log(this.id)
      } else {
        $(this).addClass('red')
        console.log(this.id)
      }

    score($this);

    ticTacToe.checkForWin();
    })
  })
