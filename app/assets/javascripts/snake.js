(function (root) {
  var SG = root.SG = (root.SG || {});
  
  /* Coord class */

  var Coord = SG.Coord = function (i, j) {
    this.i = i;
    this.j = j;
  };

  Coord.prototype.plus = function (coord2) {
    return new Coord(this.i + coord2.i, this.j + coord2.j);
  };
  
  /* Snake Class */

  var Snake = SG.Snake = function (board) {
    this.dir = "N";
    this.board = board;
		this.score = 0;

    var center = new Coord(board.dim / 2, board.dim / 2);
    this.segments = [center];
  };

  Snake.DIFFS = {
    "N": new Coord(-1, 0),
    "E": new Coord(0, 1),
    "S": new Coord(1, 0),
    "W": new Coord(0, -1)
  };

  Snake.SYMBOL = "S";

  Snake.prototype.move = function () {
    var snake = this;
    var head = _(this.segments).last();
    var new_head = head.plus(Snake.DIFFS[this.dir]);

    if (snake.eatsApple(new_head)) {
			snake.segments.push(new_head);
			this.score += 1
      this.board.apple.replace();
    } else if (this.board.validMove(new_head)) {
      snake.segments.push(new_head);
      snake.segments.shift();
    } else {
      snake.segments = [];
    }
  };

  Snake.prototype.eatsApple = function(coord) {
    var apple_coord = this.board.apple.position
    return (coord.i == apple_coord.i) && (coord.j == apple_coord.j)
  }
	

  Snake.prototype.turn = function (dir) {
    //this means you can turn directly backward into yourself.
    this.dir = dir;
  };
	
  /* Apple Class */

  var Apple = SG.Apple = function(board) {
    this.board = board;
  }

  Apple.prototype.replace = function() {
    // Should be checking to see there is no snake here.
    var x = Math.floor(Math.random() * this.board.dim);
    var y = Math.floor(Math.random() * this.board.dim);
		
		var temp_position = new Coord(x,y);
		
		
		// this.position = new Coord(x,y);
		console.log(_.contains(this.board.snake.segments, temp_position))

		if (_.contains(this.board.snake.segments, temp_position)) {
			this.replace()
		} else {
			this.position = temp_position
		}
  }
	
	/* Board Class */

  var Board = SG.Board = function (dim) {
    this.dim = dim;
		this.snake = new Snake(this);
    this.apple = new Apple(this);
    this.apple.replace();
  };

  Board.prototype.validMove = function (coord) {
    var inside = (coord.i >= 0) && (coord.i < this.dim) && (coord.j >= 0) && (coord.j < this.dim)

    var empty = _(this.snake.segments).every(function(seg){
      return (coord.i !== seg.i) || (coord.j !== seg.j)
    });

    return inside && empty;
  }

  Board.prototype.render = function () {
    var grid = Board.blankGrid(this.dim);

    _(this.snake.segments).each(function (seg) {
      grid[seg.i][seg.j] = Snake.SYMBOL;
    });

    var apple_pos = this.apple.position

    grid[apple_pos.i][apple_pos.j] = Apple.SYMBOL;

    // join it up
    return _(grid).map(function (row) { return row.join(""); }).join("\n");
  };
})(this);
