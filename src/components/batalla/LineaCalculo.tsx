import { describirMultiplicador } from '../../logic/efectividad'
import type { Lado, Multiplicador, Pokemon } from '../../types'
import { formatearNombre } from '../../utils/texto'
import { infoTipo } from '../../utils/tiposPokemon'
import { Contador } from '../comunes/Contador'

interface Props {
  lado: Lado
  pokemon: Pokemon
  multiplicador: Multiplicador
  puntaje: number
}

/**
 * Una línea del cálculo.
 * @example "Charizard: 534 × 2 = 1068 (Fuego → Planta: súper efectivo)"
 */
export function LineaCalculo({ lado, pokemon, multiplicador: m, puntaje }: Props) {
  return (
    <p className={`linea-calculo lado-${lado}`}>
      <strong>{formatearNombre(pokemon.nombre)}</strong>: {pokemon.total} × {m.valor} ={' '}
      <strong className="puntaje">
        <Contador valor={puntaje} />
      </strong>
      <span className="explicacion">
        ({infoTipo(m.tipoAtacante).nombre} → {infoTipo(m.tipoDefensor).nombre}:{' '}
        {describirMultiplicador(m.valor)})
      </span>
    </p>
  )
}
