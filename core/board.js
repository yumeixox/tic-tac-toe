class Board {
  constructor() {
    this.grid = [ [' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' '] ]
    this.current_turn = 0
  }

  rotatedGrid() {
    let new_grid = []
    for (let i = 0; i < this.grid.length; i++) {
      let new_row = []
      for (let j = this.grid.length - 1; j >= 0; j--) {
        new_row.push(this.grid[j][i])
      }
      new_grid.push(new_row)
    }
    return new_grid
  }

  checkGrid(grid) {
    let diag1 = []
    for (let i = 0; i < grid.length; i++) {
      diag1.push(grid[i][i])
      let row = []
      for (let j = 0; j < grid.length; j++) {
        row.push(grid[i][j])
      }
      if (row.every((ele) => ele === row[0] && ele != " ")) { return row[0] }
    }
    if (diag1.every((ele) => ele === diag1[0] && ele != " ")) { return diag1[0] }

    if (this.current_turn === 9) { return "draw" }

    return null
  }

  winner() {
    let winningMark = this.checkGrid(this.grid)
    if (winningMark === null || winningMark === "draw") {
      winningMark = this.checkGrid(this.rotatedGrid())
    }
    return winningMark
  }

  currentMark() {
    if (this.current_turn % 2 == 0) {
      return 'X'
    } else {
      return 'O'
    }
  }

  placeMark(pos) {
    this.grid[pos[0]][pos[1]] = this.currentMark();
    this.current_turn++
  }

  isValidMove(row, col) {
    if (Number.isInteger(parseInt(row)) == false ||  Number.isInteger(parseInt(col)) == false) { return false }
    if(row > 2 || row < 0 || col > 2 || col < 0 || this.grid[row][col] != ' ') {
      return false
    } else {
      return true
    }
  }
}

module.exports = Board
