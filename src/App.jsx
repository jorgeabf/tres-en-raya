import './App.css'
import confetti from 'canvas-confetti'
import { useState } from 'react'

import { TURNS } from './constans'
import { checkWinner, checkEndGame } from './logic/board'
import WinnerModal from './components/WinnerModal'
import TurnGame from './components/TurnGame'
import Board from './components/Board'

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.x)
  const [winner, setWinner] = useState(null)
  // null es que no hay ganador, false es que hay empate

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.x)
    setWinner(null)
  }

  const updateBoard = (index) => {
    // no actualizar si ya tiene x u o
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x
    setTurn(newTurn)
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
      <h1>Tres en Raya</h1>
      <Board
        board={board}
        updateBoard={updateBoard}
      />

      <TurnGame turn={turn} />

      <WinnerModal
        winner={winner}
        resetGame={resetGame}
      />
    </div>
  )
}

export default App
