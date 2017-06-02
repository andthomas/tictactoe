var ticTacToe = {

  turnCounter: 0,

  scores: { drawCounter: 0, naughtCounter: 0, crossCounter: 0 },

  gameBoard: ["/","/","/","/","/","/","/","/","/"],

  wins:  { one:[0,3,6], two:[1,4,7], three:[2,5,8], four:[0,1,2], five:[3,4,5], six:[6,7,8], seven:[0,4,8], eight:[2,4,6] },

  //check if there are 3 x's or o's in a row according to the possible winning combinations in the wins object
  checkWin: function() {
    for (var x in this.wins) {
      if (this.gameBoard[this.wins[x][0]] === "o" && this.gameBoard[this.wins[x][2]] === "o" && this.gameBoard[this.wins[x][1]] === "o") {
        return true;
      }
      else if (this.gameBoard[this.wins[x][0]] === "x" && this.gameBoard[this.wins[x][2]] === "x" && this.gameBoard[this.wins[x][1]] === "x")  {
        return false;
      }//if
    }//for
  },

  //An empty array to store possible defensive moves for Albert
  moves: { },

  // Albert checks if there is any winning combinations with naughts in a row
  checkSpace: function() {
    for (var x in this.wins) {
      if ( (this.gameBoard[this.wins[x][0]] === "o" && this.gameBoard[this.wins[x][1]] === "o") ||
      (this.gameBoard[this.wins[x][1]] === "o" && this.gameBoard[this.wins[x][2]] === "o") ||
      (this.gameBoard[this.wins[x][0]] === "o" && this.gameBoard[this.wins[x][2]] === "o") ) {

        this.moves["'" + x + "'"] = (this.wins[x])
      }//if
    }//for
  },

  //Albert looks through the winning combos with 2 in a row and identifies the empty third space
  defensiveMove: function() {
    for ( var x in this.moves ) {
      for ( var i = 0; i < this.moves[x].length; i++ ) {
        var poss = this.moves[x][i]
        if ( this.gameBoard[poss] === "/") {
          return poss;
        }
      }
    }
  }

}

var restoreGameUI = function() {
  $("#naughtsScore").text(ticTacToe.scores.naughtCounter);
  $("#drawScore").text(ticTacToe.scores.drawCounter);
  $("#crossesScore").text(ticTacToe.scores.crossCounter);
}

$(document).ready(function() {

  var saveLocally = false;

  if(typeof(Storage) !== "undefined") {
    saveLocally = true;
    var state = JSON.parse(localStorage.getItem('xxx'))
    if (state !==null) {
      ticTacToe.scores = state;
      restoreGameUI()
    }
  }

  //Display winning screen and add point to score
  var showEndgame = function(winCounter, winId) {

    ticTacToe.scores[winCounter] += 1

    if(saveLocally){
      localStorage.setItem('xxx', JSON.stringify(ticTacToe.scores))
    }

    setTimeout(function () {
      $("#alertBox, " + winId).fadeIn("slow", function() {
        $('#alertBox, ' + winId).css('display', 'block')
      });
    }, 50);
  }

  var winning = function() {
    var win = ticTacToe.checkWin()

    if (win === false) {
      showEndgame('crossCounter', '#crossWin');
      return false;

    } else if (win === true) {
      showEndgame('naughtCounter', '#naughtWin');
      return true;
    }
  }

  var gameLoad = function() {
    setTimeout(function () {
      $("#leftVert").animate({height: '500px'}, 'slow');
    });
    setTimeout(function () {
      $("#rightVert").animate({height: '500px'}, 'slow');
    }, 300);

    setTimeout(function () {
      $("#topHor").animate({width: '500px'}, 'slow');
    }, 500);

    setTimeout(function () {
      $("#botHor").animate({width: '500px'}, 'slow');
    },600);
  }

  gameLoad();

  //Load scoreboard with blank scores
  $("#scoreBoard").fadeIn(function() {
    $("#scoreBoard").css("height", "120px");
    $("#naughtsScore").text(ticTacToe.scores.naughtCounter);
    $("#drawScore").text(ticTacToe.scores.drawCounter);
    $("#crossesScore").text(ticTacToe.scores.crossCounter);
  });

  //Albert the AI's main code
  var albert = function() {
    //If a corner is selected, put the first x in the middle for the best starting move.
    if (ticTacToe.turnCounter == 1){
      if (ticTacToe.gameBoard[0] == "o" || ticTacToe.gameBoard[2] == "o" || ticTacToe.gameBoard[6] == "o" || ticTacToe.gameBoard[8] == "o") {

        ticTacToe.gameBoard[4] = "x";

        setTimeout(function () {
          $("#4").addClass('cross');
        }, 200);
        ticTacToe.turnCounter += 1;
        return;
      }
    } else {
        ticTacToe.checkSpace();

        var defend = ticTacToe.defensiveMove();

        if (defend) {
          ticTacToe.gameBoard[defend] = "x";

          setTimeout(function () {
            $("#" + defend).addClass('cross');
          }, 200);

          winning();

          ticTacToe.turnCounter += 1;
          return;
        }
      }

    ticTacToe.checkSpace();

    var defend = ticTacToe.defensiveMove();

    if (defend) {
      ticTacToe.gameBoard[defend] = "x";

      setTimeout(function () {
        $("#" + defend).addClass('cross');
      }, 200);

      winning();

      ticTacToe.turnCounter += 1;
      return;
    }

    //If there are no defensive moves take the next available space on the board
    for ( var i = 0; i < ticTacToe.gameBoard.length; i++ ) {
      if ( ticTacToe.gameBoard[i] == "/" ) {

        ticTacToe.gameBoard[i] = "x";

        setTimeout(function () {
          $("#" + i).addClass('cross');
        }, 200);

        winning();

        ticTacToe.turnCounter += 1;
        return;
      }//if
    }//for
  };

  //The players code
  $('td').on('click', function(){
    var squareClass = $(this);
    var squareId = this.id;

    if ( squareClass.hasClass('cross') || squareClass.hasClass('naught') ) {
      return;
    }

    squareClass.addClass('naught')

    ticTacToe.turnCounter += 1;

    ticTacToe.gameBoard[parseInt(squareId)] = "o";

    var gameResult = winning();

    if ( gameResult ) {
      return

    } else if ( gameResult !== true && ticTacToe.turnCounter < 9 ) {
      albert();

    } else if( ticTacToe.turnCounter === 9 ){
      showEndgame('drawCounter', '#draw');
    }
  });

  //Reset button
  $('#reset').on('click', function(){
    gameHide();
    $("td").removeClass('naught');
    $("td").removeClass('cross');

    //Get rid of alert
    $("#alertBox").fadeOut("slow",function() {
      $('#alertBox').css('display', 'none')
      $('#naughtWin').css('display', 'none')
      $('#crossWin').css('display', 'none')
      $('#draw').css('display', 'none')

    //Reset the game array and the turn counter
    ticTacToe.gameBoard = ["/","/","/","/","/","/","/","/","/"]
    ticTacToe.turnCounter = 0;

    //Record scores on the scoreboard
    $("#naughtsScore").text('0');
    $("#drawScore").text('0');
    $("#crossesScore").text('0');

    ticTacToe.scores.drawCounter = 0;
    ticTacToe.scores.crossCounter = 0;
    ticTacToe.scores.naughtCounter = 0;
    gameLoad();
    })
  })

  //Fade out grid on screen
  var gameHide = function() {
    $("#leftVert, #rightVert, #topHor, #botHor").fadeOut(function() {
      $("#leftVert, #rightVert").css("height", '0px');
      $("#topHor, #botHor").css("width", '0px');
    });
    $("#leftVert, #rightVert, #topHor, #botHor").fadeIn(function() {
      $("#leftVert, #rightVert").css("height", '0px');
      $("#topHor, #botHor").css("width", '0px');
    });
  }

  //Clear game on click of alert box
  $('#alertBox').on('click', function() {
    gameHide();
    $("td").removeClass('naught');
    $("td").removeClass('cross');

    //Get rid of alert
    $("#alertBox").fadeOut("slow",function() {
      $('#alertBox').css('display', 'none')
      $('#naughtWin').css('display', 'none')
      $('#crossWin').css('display', 'none')
      $('#draw').css('display', 'none')

    //Reset the game array and the turn counter
    ticTacToe.gameBoard = ["/","/","/","/","/","/","/","/","/"]
    ticTacToe.turnCounter = 0;
    ticTacToe.moves = {};

    //Record scores on the scoreboard
    $("#naughtsScore").text(ticTacToe.scores.naughtCounter);
    $("#drawScore").text(ticTacToe.scores.drawCounter);
    $("#crossesScore").text(ticTacToe.scores.crossCounter);
    gameLoad();
    });
  });
});
