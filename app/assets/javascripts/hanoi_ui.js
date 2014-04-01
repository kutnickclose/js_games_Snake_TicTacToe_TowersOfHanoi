(function (root) {
  var Hanoi = root.Hanoi = (root.Hanoi || {});

  var UI = Hanoi.UI = function (game) {
    this.game = game
    this.towerHeight = game.towers[0].length
    this.startColumn = null
    this.endColumn = null
  };

  UI.prototype.render = function () {
    var $towers = $('.towers')
    $towers.empty()
    _(3).times(function(n) {
      $towers.append("<div class='tower' data-column=" + n + "></div>");
    });
    var towers = this.game.towers
    var height = this.towerHeight

    $('.tower').each(function(index, tower) {
      console.log(height)
      _(height).times(function(n){
        var disc = towers[index][n] || '&nbsp;';

        var filled = null
        if(disc !== '&nbsp;'){
          filled = "filled"
        }

        $(tower).prepend("<div class='disc " + filled +"'>" + disc +  "</div>");
      })
    })
  };

  UI.prototype.start = function() {
    this.render();
    var game = this.game

    var gui = this
    $('.towers').on('click', '.tower', function() {
      var columnClick = $(this).data('column')
      if(gui.startColumn !== null) {
        // set it to endColumn, call game.move, check win / loss
        gui.endColumn = columnClick
        console.log("end column = " + gui.endColumn)
        gui.makeMove();
      } else {
        // set it to startColumn, render game
        gui.startColumn = columnClick
        console.log("start column = " + gui.startColumn)
        gui.render();
      }
    });
  };

  UI.prototype.makeMove = function() {
    // do game.move validity test / move action
    // reset startColumn, endColumn
    var valid = this.game.move(this.startColumn, this.endColumn)
    if (!valid) {
      alert("Invalid Move")
    }
    this.startColumn = null
    this.endColumn = null
    this.render();
    this.checkWinner()
  };

  UI.prototype.checkWinner = function () {
    if (this.game.isWon()) {
      alert("Good job - you win!");
    };
  };


})(this)


