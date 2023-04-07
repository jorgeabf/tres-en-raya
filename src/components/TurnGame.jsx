import Square from './Square'
import { TURNS } from '../constans'

function TurnGame({ turn }) {
  return (
    <aside className='turn'>
      <Square isSelected={turn === TURNS.x}>
        {TURNS.x}
      </Square>
      <Square isSelected={turn === TURNS.o}>
        {TURNS.o}
      </Square>
    </aside>
  )
}

export default TurnGame
