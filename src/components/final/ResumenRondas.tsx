import { ganadorYPerdedor } from '../../logic/ronda'
import type { ResultadoRonda } from '../../types'
import { formatearNombre } from '../../utils/texto'

interface Props {
  resultados: ResultadoRonda[]
}

/** Lista de rondas con su ganador; cada renglón entra un poco después del anterior. */
export function ResumenRondas({ resultados }: Props) {
  return (
    <ol className="resumen-rondas">
      {resultados.map((r, i) => (
        <li key={r.numero} style={{ animationDelay: `${0.6 + i * 0.3}s` }}>
          Ronda {r.numero}: {formatearNombre(r.pokemonA.nombre)} vs{' '}
          {formatearNombre(r.pokemonB.nombre)} →{' '}
          <strong className={`lado-${r.ganador}`}>
            gana {formatearNombre(ganadorYPerdedor(r).ganador.nombre)}
          </strong>
        </li>
      ))}
    </ol>
  )
}
