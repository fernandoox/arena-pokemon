import type { Bando, Lado, Pokemon, ResultadoRonda } from '../../types'
import { TarjetaPokemon } from '../comunes/TarjetaPokemon'

interface Props {
  lado: Lado
  bando: Bando
  pokemon: Pokemon
  /** Mientras no exista, la ronda sigue en curso. */
  resultado?: ResultadoRonda
  /** `true` en su turno de lanzar un ataque. */
  atacando?: boolean
}

/** Un Pokémon en la arena; se ilumina si gana y se apaga si pierde. */
export function Luchador({ lado, bando, pokemon, resultado, atacando = false }: Props) {
  const estado = !resultado ? '' : resultado.ganador === lado ? 'ganador' : 'perdedor'

  return (
    <div className={`luchador lado-${lado} ${estado} ${atacando ? 'atacando' : ''}`}>
      <p className="luchador-bando">{bando.nombre}</p>
      <TarjetaPokemon pokemon={pokemon} grande mostrarStats={false} />
      {estado === 'ganador' && <p className="sello-ganador">🏆 ¡GANA!</p>}
      <p className="luchador-estrategia">“{bando.estrategia}”</p>
    </div>
  )
}
