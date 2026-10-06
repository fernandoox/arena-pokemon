import { TOTAL_RONDAS } from '../../constants/reglas'
import type { Marcador } from '../../types'

interface Props {
  /** Índice de la ronda actual (0 a 2). */
  ronda: number
  nombreA: string
  nombreB: string
  marcador: Marcador
}

/** Número de ronda al centro y marcador de cada bando a los lados. */
export function EncabezadoBatalla({ ronda, nombreA, nombreB, marcador }: Props) {
  return (
    <header className="encabezado-batalla">
      <span className="marcador-mini lado-A">
        {nombreA} <strong>{marcador.A}</strong>
      </span>
      <h1>
        Ronda {ronda + 1} de {TOTAL_RONDAS}
      </h1>
      <span className="marcador-mini lado-B">
        <strong>{marcador.B}</strong> {nombreB}
      </span>
    </header>
  )
}
