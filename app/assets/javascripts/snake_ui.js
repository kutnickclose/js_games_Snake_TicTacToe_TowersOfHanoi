(function (root) {
  var SG = root.SG = (root.SG || {});

  var View = SG.View = function ($el, $scoreEl) {
    this.$el = $el;
		this.$scoreEl = $scoreEl

    this.board = null;
    this.intervalId = null;
  }

	//arrow keys
  View.KEYS = {
    38: "N",
    39: "E",
    40: "S",
    37: "W"
  };

  View.STEP_MILLIS = 100;

	//change snake direction
  View.prototype.handleKeyEvent = function (event) {
    if (_(View.KEYS).has(event.keyCode)) {
      this.board.snake.turn(View.KEYS[event.keyCode]);
    } else {
      // some other key was pressed; ignore.
    }
  };


  View.prototype.render = function () {
    // this.$el.html(this.board.render());

    var view = this;
    var board = view.board;
		var score = board.snake;

		//build the grid
    function buildCellsMatrix () {
      return _.times(board.dim, function () {
        return _.times(board.dim, function () {
          return $('<div class="cell"></div>');
        });
      });
    }
		
    var cellsMatrix = buildCellsMatrix();
		
		//add in the snake
    _(board.snake.segments).each(function (seg) {
      cellsMatrix[seg.i][seg.j].addClass("snake");
    });

		//add in the apple
    cellsMatrix[board.apple.position.i][board.apple.position.j].addClass("apple");

		//display the grid
    this.$el.empty();
    _(cellsMatrix).each(function (row) {
      var $rowEl = $('<div class="snake-row"></div>');
      _(row).each(function ($cell) { $rowEl.append($cell) });
      view.$el.append($rowEl);
    });
		
  };
	
	View.prototype.renderScore = function () {
		this.$scoreEl.empty()
		this.$scoreEl.append("Score: " + this.board.snake.score)
	}

  View.prototype.step = function () {
    if (_(this.board.snake.segments).last()) {
      this.board.snake.move();
      this.render();
			this.renderScore();
    } else {
      alert("You lose!");
      window.clearInterval(this.intervalId);
    }
  };

  View.prototype.start = function () {
    this.board = new SG.Board(10);

    $(window).keydown(this.handleKeyEvent.bind(this));

    this.intervalId = window.setInterval(
      this.step.bind(this),
      View.STEP_MILLIS
    );
  };
})(this);
