(function (root) {

  var TTT = root.TTT = (root.TTT || {});

  var UI = TTT.UI = function (game) {
    this.game = game
  }

  UI.prototype.start = function() {
    game = this.game

    $(".row div").each( function(i, div) {
      $(div).addClass("empty");
    })

    $(".row").on('click', 'div.empty', function(e) {
      var player = game.player;
      var tile = $(this)
      drawTile(player, tile)

      var pos = $(this).data('pos');
      game.move(pos);
      console.log(game.board);

      checkGameOver(game)
    })
  }

  var drawTile = function(player, tile) {
    tile.addClass(player);
    tile.removeClass("empty");
    tile.append(player);
  }

  var checkGameOver = function(game) {
    var winner = game.winner();
    var draw = game.draw();

    if(winner) {
      alert(winner + " is the winner!");
      $("div.empty").each( function (i, div) {
        $(div).removeClass("empty");
      });
    } else if(draw) {
      alert("Nobody wins!");
    } else {
      player = game.player;
      $('#instructions').text("It's " + player + "'s turn.");
    };
  }


})(this);