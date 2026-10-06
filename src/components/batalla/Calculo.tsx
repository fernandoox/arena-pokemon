import type { ResultadoRonda } from '../../types'
import { LineaCalculo } from './LineaCalculo'

interface Props {
  resultado: ResultadoRonda
}

/** Explica en pantalla cómo se decidió la ronda, incluido el desempate. */
export function Calculo({ resultado: r }: Props) {
  return (
    <section className="calculo">
      <h2>🧮 El cálculo</h2>
      <p className="formula">puntaje = suma de stats × multiplicador de tipo</p>
      <LineaCalculo
        lado="A"
        pokemon={r.pokemonA}
        multiplicador={r.multiplicadorA}
        puntaje={r.puntajeA}
      />
      <LineaCalculo
        lado="B"
        pokemon={r.pokemonB}
        multiplicador={r.multiplicadorB}
        puntaje={r.puntajeB}
      />

      {r.motivo === 'velocidad' && (
        <p className="desempate">
          ¡Empate en puntaje! Desempata la velocidad: {r.pokemonA.velocidad} vs{' '}
          {r.pokemonB.velocidad}
        </p>
      )}
      {r.motivo === 'moneda' && (
        <p className="desempate">
          ¡Empate total (puntaje y velocidad)! Decidió una moneda al aire 🪙
        </p>
      )}
    </section>
  )
}
