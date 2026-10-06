import { contarVictorias } from '../../logic/ronda'
import type { Bando, ResultadoRonda } from '../../types'
import { Confeti } from './Confeti'
import { ResumenRondas } from './ResumenRondas'

interface Props {
  bandoA: Bando
  bandoB: Bando
  resultados: ResultadoRonda[]
  onNuevaBatalla: () => void
}

/** Marcador final, celebración del bando ganador (2 de 3) y botón para empezar de nuevo. */
export function PantallaFinal({ bandoA, bandoB, resultados, onNuevaBatalla }: Props) {
  const victorias = contarVictorias(resultados)
  const ladoGanador = victorias.A > victorias.B ? 'A' : 'B'
  const ganador = ladoGanador === 'A' ? bandoA : bandoB

  return (
    <main className={`pantalla-final lado-${ladoGanador}`}>
      <Confeti />

      <p className="trofeo">🏆</p>
      <h1 className="titulo-victoria">¡{ganador.nombre} gana la Arena!</h1>

      <div className="marcador-final">
        <span className="lado-A">{bandoA.nombre}</span>
        <strong>
          {victorias.A} – {victorias.B}
        </strong>
        <span className="lado-B">{bandoB.nombre}</span>
      </div>

      <ResumenRondas resultados={resultados} />

      <button type="button" className="boton-grande" onClick={onNuevaBatalla}>
        🔄 Nueva batalla
      </button>
    </main>
  )
}
