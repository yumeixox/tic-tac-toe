const Board = require('./board.js')
const Human = require("./humanPlayer.js")
const Comp = require("./computerPlayer.js")

class Game {
  constructor() {
    this.board = new Board

    // Level 1 = easy, Level 2 = medium, Level 3 = hard
    this.comp = new Comp(this.board, 3)
  }
}

module.exports = Game
