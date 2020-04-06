const Board = require('./board.js')

class Comp {
  constructor(board, difficultyLevel) {
    this.board = board
    this.level = difficultyLevel
  }

  takeTurn() {
    let moves = this.getMoves(this.board)
    let move

    // Level 1
    move = moves[Math.floor(Math.random() * moves.length)]

    // Level 2
    if (this.level === 2) {
      for (let i = 0; i < moves.length; i++) {
        let dup = this.dupBoard(board)
        dup.placeMark(moves[i])
        if (dup.winner() === "O") {
          move = moves[i]
        }
      }
    }

    // Level 3
    if (this.level === 3) {
      move = this.getImpossible(this.board, true)
    }

    return move
  }

  getMoves(board) {
    let moves = [];
    board.grid.forEach((row, i) => {
      row.forEach((ele, j) => {
        if (board.grid[i][j] === " ") {
          moves.push(i.toString() + j.toString())
        }
      })
    })
    return moves;
  }

  dupBoard(board) {
    let dup_board = new Board
    dup_board.grid = []
    for (let i = 0; i < 3; i++) {
      dup_board.grid.push([...board.grid[i]])
    }
    dup_board.current_turn = board.current_turn
    return dup_board
  }

  getImpossible(board, init = false) {
    let moves = this.getMoves(board)
    let scores = {}

    // Assign terminal nodes and get empty nodes
    let emptyMoves = []
    for (let i = 0; i < moves.length; i++) {
      let dupBoard = this.dupBoard(board)
      dupBoard.placeMark(moves[i])

      if (dupBoard.winner() !== null) {
        if (dupBoard.winner() === "X") { scores[moves[i]] = -10 }
        if (dupBoard.winner() === "O") { scores[moves[i]] = 10 }
        if (dupBoard.winner() === "draw") { scores[moves[i]] = 0 }
      }
      else { emptyMoves.push(moves[i]) }
    }

    // Recurse for empty moves
    for (let i = 0; i < emptyMoves.length; i++) {
      let dupBoard = this.dupBoard(board)
      dupBoard.placeMark(emptyMoves[i])
      scores[emptyMoves[i]] = this.getImpossible(dupBoard)
    }

    // All moves have a score at this point
    // If initial call, return move, else return score
    let highestMove
    let lowestMove

    for (let i = 0; i < moves.length; i++) {
      if (highestMove === undefined || scores[moves[i]] > scores[highestMove]) {
        highestMove = moves[i]
      }
      if (lowestMove === undefined || scores[moves[i]] < scores[lowestMove]) {
        lowestMove = moves[i]
      }
    }

    // Adds variation
    let highestMoves = []
    let lowestMoves = []
    for (let i = 0; i < moves.length; i++) {
      if (scores[moves[i]] === scores[highestMove]) {
        highestMoves.push(moves[i])
      }
      if (scores[moves[i]] === scores[lowestMove]) {
        lowestMoves.push(moves[i])
      }
    }

    let move
    if (board.currentMark() === "O") {
      move = highestMoves[Math.floor(Math.random() * highestMoves.length)]
    }
    else {
      move = lowestMoves[Math.floor(Math.random() * lowestMoves.length)]
    }

    if (init === false) {
      return scores[move]
    }
    else {
      return move
    }
  }
}

module.exports = Comp
