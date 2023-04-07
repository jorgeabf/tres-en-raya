import { TURNS } from '../constans'

const WinnerModal = ({ winner, resetGame }) => {
  if (winner === null) return null

  const winnerMessage =
    winner === false
      ? `Ha sido Empate: ${TURNS.x} ${TURNS.o}`
      : `El ganador es: ${winner}`

  return (
    <aside className='winner'>
      <div className='winner-text'>
        <h3>{winnerMessage}</h3>
        <button
          className='winner-button'
          onClick={resetGame}>
          Jugar otra vez
        </button>
      </div>
    </aside>
  )
}

export default WinnerModal
