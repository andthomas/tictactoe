var ticTacToe = {

  turnCounter: 0,

  drawCounter: 0,

  naughtCounter: 0,

  crossCounter: 0,

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
  var isWin = ticTacToe.checkWin(this)

  if (isWin === true) {
    if ($this.hasClass('cross')) {
      ticTacToe.crossCounter += 1
      setTimeout(function () {
        $("#alertBox, #crossWin").fadeIn("slow", function() {
          $('#alertBox').css('display', 'block')
          $('#crossWin').css('display', 'block')
        });
      }, 50);
    } else {
      setTimeout(function () {
        ticTacToe.naughtCounter += 1
        $("#alertBox, #naughtWin").fadeIn("slow", function() {
          $('#alertBox').css('display', 'block')
          $('#naughtWin').css('display', 'block')
        });
      }, 50);
    }
  } else if( ticTacToe.turnCounter === 9 ){
    // notify of draw
    setTimeout(function () {
      ticTacToe.drawCounter += 1
      $("#alertBox, #draw").fadeIn(function() {
        $('#alertBox').css('display', 'block')
        $('#draw').css('display', 'block')
      });
    }, 50);
  }


});

$('#alertBox').on('click', function() {
  gameHide();
  $("td").removeClass('naught');
  $("td").removeClass('cross');

  $("#alertBox").fadeOut("slow",function() {
    $('#alertBox').css('display', 'none')
    $('#naughtWin').css('display', 'none')
    $('#crossWin').css('display', 'none')
    $('#draw').css('display', 'none')


  ticTacToe.gameBoard = ["","","","","","","","",""]
  ticTacToe.turnCounter = 0;

  $("#naughtsScore").text(ticTacToe.naughtCounter);
  $("#drawScore").text(ticTacToe.drawCounter);
  $("#crossesScore").text(ticTacToe.crossCounter);
  gameLoad();
  });
});

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
  },700);
}

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

$(window).load(function(){
  gameLoad();
  $("#scoreBoard").fadeIn(function() {
    $("#scoreBoard").css("height", "120px");
  });
});
