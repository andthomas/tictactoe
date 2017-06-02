var ticTacToe = {

  turnCounter: 0,

  scores: { drawCounter: 0, naughtCounter: 0, crossCounter: 0 },

  //gameBoard has 9 indicies to represent the 9 squares on a ticTacToe board. The 0th index represents the top left, 1st is the top middle, 2nd is top right, 3rd is center left and so on.
  gameBoard: ["","","","","","","","",""],

  //There are eight possible ways to win in ticTacToe, these combinations are represented by the following index values of 'gameBoard'
  wins:  { one:[0,3,6], two:[1,4,7], three:[2,5,8], four:[0,1,2], five:[3,4,5], six:[6,7,8], seven:[0,4,8], eight:[2,4,6] },

  checkWin: function(player) {
    for (var x in this.wins) {
      if ( parseInt(this.gameBoard[this.wins[x][0]]) + parseInt(this.gameBoard[this.wins[x][1]]) + parseInt(this.gameBoard[this.wins[x][2]]) === 3 || parseInt(this.gameBoard[this.wins[x][0]]) + parseInt(this.gameBoard[this.wins[x][1]]) + parseInt(this.gameBoard[this.wins[x][2]]) === 0 ) {
        return true;
      }
    }
  },

  //Change turns according to the total turns had
  isOdd: function(turnCounter) {
    if (turnCounter % 2) {
      0;
      return true;
    } else {
      return false;
    }
  },

  //Push 0 or 1 to array for naught and cross
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

var restoreGameUI = function() {
  $("#naughtsScore").text(ticTacToe.scores.naughtCounter);
  $("#drawScore").text(ticTacToe.scores.drawCounter);
  $("#crossesScore").text(ticTacToe.scores.crossCounter);
}

$(document).ready(function() {

  //Animate lines on screen
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

  var saveLocally = false;

  if(typeof(Storage) !== "undefined") {
    saveLocally = true;
    var state = JSON.parse(sessionStorage.getItem('xxx'))
    if (state !==null) {
      ticTacToe.scores = state;
      restoreGameUI()
    }
  }

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
    ticTacToe.gameBoard = ["","","","","","","","",""]
    ticTacToe.turnCounter = 0;

    gameLoad();

    })
  })

  $('td').on('click', function(){
    //the click on the current square is represented by $this
    var $this = $(this);
    var thisId = this.id;

    //Don't do anything if the current square has already been clicked on
    if ( $this.hasClass('cross') || $this.hasClass('naught') ) {
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

    var showEndgame = function(winCounter, winId) {
      ticTacToe.scores[winCounter] += 1

      if(saveLocally){
        sessionStorage.setItem('xxx', JSON.stringify(ticTacToe.scores))
      }

      setTimeout(function () {
        $("#alertBox, " + winId).fadeIn("slow", function() {
          $('#alertBox, ' + winId).css('display', 'block')
        });
      }, 50);
    }

    //Check if there is a winner and notify them
    var isWin = ticTacToe.checkWin(this)

    if (isWin === true) {

      if ($this.hasClass('cross')) {
        showEndgame('crossCounter', '#crossWin');
      } else {
        showEndgame('naughtCounter', '#naughtWin');
      }

    } else if( ticTacToe.turnCounter === 9 ){
      showEndgame('drawCounter', '#draw');
    }
  });

  //Fade out lines on screen
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
    ticTacToe.gameBoard = ["","","","","","","","",""]
    ticTacToe.turnCounter = 0;

    //Record scores on the scoreboard
    $("#naughtsScore").text(ticTacToe.scores.naughtCounter);
    $("#drawScore").text(ticTacToe.scores.drawCounter);
    $("#crossesScore").text(ticTacToe.scores.crossCounter);
    gameLoad();
    });
  });
});
