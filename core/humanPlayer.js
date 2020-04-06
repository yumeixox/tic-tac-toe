class Human {
  takeTurn(board, reader) {
    return new Promise((resolve, reject) => {
      reader.question(`Enter move for ${board.currentMark()}\n>> `,
      (res) => {
        if (board.isValidMove(res[0], res[1])) {
          resolve(res)
        } else {
          reject('Invalid Move')
        }
      })
    })
  }

}

module.exports = Human
