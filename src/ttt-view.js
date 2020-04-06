const Game = require("../core/game.js")

class View {
  constructor($el) {
    this.game = new Game
    this.$ttt = $el
    this.comp = true

    this.setupBoard()
    this.bindEvents()
  }

  bindEvents() {
    $(".grid").on("click", ".cell", (event) => {
      $(event.target).append(`<strong class="mark">${this.game.board.currentMark()}</strong>`)
      this.makeMove(event.target)

      $(event.target).addClass("noHover")
    })
  }

  makeMove(sq) {
    const $sq = $(sq)
    let row = parseInt($sq.attr("data-pos")[0])
    let col = parseInt($sq.attr("data-pos")[2])

    this.game.board.placeMark(`${row}${col}`)

    let winner = this.game.board.winner()
    if (winner !== null) {
      this.endGame(winner)
    }

    if (this.comp === true && this.game.board.current_turn % 2 !== 0 && winner === null) {
      this.makeCompMove()
    }
  }

  makeCompMove() {
    let move = this.game.comp.takeTurn()
    let row = parseInt(move[0])
    let col = parseInt(move[1])

    let sq = $(`.cell[data-pos='${row},${col}']`)
    sq.trigger("click")
  }

  endGame(winner) {
    // Disable Events
    $(".grid").off("click", ".cell")
    $(".cell").addClass("noHover")

    this.displayReplayButton()
    this.displayWinner(winner)

    // Fade board
    $("h1").addClass("faded")
    $(".grid").addClass("faded")
  }

  setupBoard() {
    this.$ttt.append('<ul class="grid"></ul>')
    for (let i = 0; i < 9; i++) {
      $(".grid").append("<li class='cell'></li>")
    }

    let j = 0
    $(".cell").each((i, sq) => {
      $(sq).attr("data-pos", [j, i % 3])
      if (i % 3 === 2) { j++ }
    })
  }

  displayReplayButton() {
    $("body").prepend("<div class='replay-container'><strong class='replay'>↻</strong></div>")

    $(".replay").click((event) => { this.resetBoard() })
  }

  resetBoard() {
    this.game = new Game
    this.$ttt = $(".ttt")

    $(".grid").remove()
    $(".replay-container").remove()
    $(".replay").remove()
    $(".winner").remove()

    this.setupBoard()
    this.bindEvents()

    $("h1").removeClass("faded")
  }

  displayWinner(winner) {
    if (winner !== "draw") {
      $("body").prepend(`<strong class='winner hidden'> wins!</strong>`)
    } else {
      $("body").prepend(`<strong class='winner hidden'></strong>`)
    }

    $(".winner").prepend(winner)
    $(".winner").addClass("banner")
    $(".winner").removeClass("hidden")
  }
}

module.exports = View;
