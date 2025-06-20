import { Injectable } from '@nestjs/common';

interface Response {
  isReady: Boolean
}

@Injectable()
export class AppService {
  private players: Array<string> = []
  private board: Array<Array<string>> = [['', '', ''], ['', '', ''], ['', '', '']]
  private moves: number = 0
  private currentPlayer = (this.moves % 2) === 0 ? this.players[1] : this.players[0]
  private symbol: Array<string> = ['X', 'O']
  private winner: string | null = null

  redirection(): Response {
    return (this.players.length % 2 === 0) && this.players.length > 0 ? { isReady: true } : { isReady: false }
  }

  addPlayer(playerName: string): Response {
    this.players.push(playerName)
    return this.redirection()
  }

  serveBoard(): object {
    return {
      board: this.board, currentPlayer: this.getCurrentPlayer()
    }
  }

  checkWinner(row: number, col: number) {
    const symbol = this.getCurrentSymbol()
    if (this.board[row].every((s) => s === symbol)) return true
    if (this.board.every((row) => row[col] === symbol)) return true
    if (row === col && this.board.every((row, index) => row[index] === symbol)) return true
    if (row + col == 2 && this.board.every((row, index) => row[2 - index] === symbol)) return true
  }

  markBox(row: number, col: number, playerName: string) {
    if (this.board[row][col] !== '') {
      return { isValid: false, error: 'invalid move' }
    }

    if (this.getCurrentPlayer() !== playerName) {
      return { isValid: false, error: 'it is not your turn' }
    }

    this.moves += 1
    const symbol = this.getCurrentSymbol()
    this.board[row][col] = symbol
    if (this.checkWinner(row, col)) {
      this.winner = this.getCurrentPlayer()
    }
    return { isValid: true, error: '' }
  }

  private getCurrentPlayer() {
    return (this.moves % 2) === 0 ? this.players[0] : this.players[1]
  }

  private getCurrentSymbol() {
    return (this.moves % 2 === 0) ? this.symbol[1] : this.symbol[0]
  }

  getWinner() {
    return { isGameOver: this.isGameOver(), winner: this.winner, isWon: (this.winner !== null && (!this.isDraw)) }
  }

  isDraw () {
    this.moves === 9 && this.winner === null
  }

  private isGameOver(): Boolean {
    return this.moves === 9 || this.winner !== null
  }

  replay() {
    this.board = [["", "", ""], ["", "", ""], ["", "", ""]]
    this.moves = 0
    this.winner = null;
  }

  exitGame(playerName : string) {
    const playerIndex = this.players.findIndex((player) => player === playerName)
    this.players.splice(playerIndex, 1)
    this.board = [["", "", ""], ["", "", ""], ["", "", ""]]
    this.moves = 0
    this.winner = null;
  }

}
