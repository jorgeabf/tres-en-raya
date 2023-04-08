import Square from './Square.jsx'

function Board ({ board, updateBoard }) {
  return (
    <main className='board'>
      {board.map((cell, index) => {
        return (
          <Square
            key={index}
            index={index}
            updateBoard={updateBoard}
          >
            {cell}
          </Square>
        )
      })}
    </main>
  )
}

export default Board
