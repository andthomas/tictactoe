console.log('connected');

var ticTacToe = {

  turnCounter: 0,

  gameBoard: ["n","n","n",
              "n","n","n",
              "n","n","n"],

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
        ticTacToe.gameBoard[0] = 1;
      else if ($this.is(".blue")) {
          ticTacToe.gameBoard[0] = 1;
      return
    } else if ($this.is("#tm")) {

      return
    } else if ($this.is("#tr")) {

        return
    } else if ($this.is("#cl")) {

        return
    } else if ($this.is("#cm")) {

        return
    } else if ($this.is("#cr")) {

      return
    } else if ($this.is("#bl")) {

        return
    } else if ($this.is("#bm")) {

      return
    } else if ($this.is("#br")) {

        return
    }
}

  $('.gameBox').on('click', function(){
    var $this = $(this);
    score($this)
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
    })
  })
