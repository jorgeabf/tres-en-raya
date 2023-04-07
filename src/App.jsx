import './App.css'
import confetti from 'canvas-confetti'
import { useState } from 'react'

import { TURNS } from './constans'
import { checkWinner, checkEndGame } from './logic/board'
import WinnerModal from './components/WinnerModal'
import TurnGame from './components/TurnGame'
import Board from './components/Board'

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromLocalStorage =
      window.localStorage.getItem('board')
    return boardFromLocalStorage
      ? JSON.parse(boardFromLocalStorage)
      : Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turnFromLocalStorage =
      window.localStorage.getItem('turn')
    return turnFromLocalStorage ?? TURNS.x
  })

  const [winner, setWinner] = useState(null)
  // null es que no hay ganador, false es que hay empate

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.x)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  const updateBoard = (index) => {
    // no actualizar si ya tiene x u o
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x
    setTurn(newTurn)
    // Guardar la Partida
    window.localStorage.setItem(
      'board',
      JSON.stringify(newBoard)
    )
    window.localStorage.setItem(
      'turn',
      JSON.stringify(turn)
    )
    // Revisar si hay ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false) // Empate
    }
  }

  return (
    <div className='App'>
      <Board
        board={board}
        updateBoard={updateBoard}
      />

      <TurnGame turn={turn} />

      <WinnerModal
        winner={winner}
        resetGame={resetGame}
      />
      <button
        className='winner-button'
        onClick={resetGame}>
        Resetear Juego
      </button>
    </div>
  )
}

export default App
