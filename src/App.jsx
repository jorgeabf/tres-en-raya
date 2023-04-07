import confetti from 'canvas-confetti'

import './App.css'
import { useState } from 'react'

const TURNS = {
  x: '🐘',
  o: '🐦'
}

const Square = ({
  children,
  isSelected,
  updateBoard,
  index
}) => {
  const className = `square ${
    isSelected ? 'is-selected' : ''
  }`

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div
      onClick={handleClick}
      className={className}>
      {children}
    </div>
  )
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))

  const [turn, setTurn] = useState(TURNS.x)

  const [winner, setWinner] = useState(null)
  // null es que no hay ganador, false es que hay empate

  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }
    //Si no hay ganador
    return null
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.x)
    setWinner(null)
  }

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null)
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
      <main className='board'>
        {board.map((cell, index) => {
          return (
            <Square
              key={index}
              index={index}
              updateBoard={updateBoard}>
              {board[index]}
            </Square>
          )
        })}
      </main>

      <aside className='turn'>
        <Square isSelected={turn === TURNS.x}>
          {TURNS.x}
        </Square>
        <Square isSelected={turn === TURNS.o}>
          {TURNS.o}
        </Square>
      </aside>

      {winner !== null && (
        <aside className='winner'>
          <div className='winner-text'>
            <h3>
              {winner === false
                ? `Ha sido Empate: ${TURNS.x} ${TURNS.o}`
                : `El ganador es: ${winner}`}
            </h3>
            <button
              className='winner-button'
              onClick={resetGame}>
              Jugar otra vez
            </button>
          </div>
        </aside>
      )}
    </div>
  )
}

export default App
