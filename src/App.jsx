import './App.css'
import { useState } from 'react'

const TURNS = {
  x: '⭙',
  o: '⚪'
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
    updateBoard()
  }

  return (
    <div
      onClick={handleClick}
      className={className}>
      {children}
    </div>
  )
}

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  console.log(board)

  const [turn, setTurn] = useState(TURNS.x)

  const updateBoard = () => {
    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x
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
    </div>
  )
}

export default App
