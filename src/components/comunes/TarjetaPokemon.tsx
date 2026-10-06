import type { CSSProperties } from 'react'
import type { Pokemon } from '../../types'
import { formatearNombre } from '../../utils/texto'
import { infoTipo } from '../../utils/tiposPokemon'
import { InsigniaTipo } from './InsigniaTipo'

/** Valor máximo posible de una estadística base; llena la barra al 100 %. */
const STAT_MAXIMA = 255

interface Props {
  pokemon: Pokemon
  /** Versión gigante para la arena. */
  grande?: boolean
  /** Muestra las barras de estadísticas. */
  mostrarStats?: boolean
}

/** Imagen, nombre, tipos y estadísticas de un Pokémon, con el color de su primer tipo. */
export function TarjetaPokemon({ pokemon, grande = false, mostrarStats = true }: Props) {
  const estilo = { '--color-tipo': infoTipo(pokemon.tipos[0]).color } as CSSProperties

  return (
    <div className={`tarjeta-pokemon ${grande ? 'grande' : ''}`} style={estilo}>
      <img src={pokemon.imagen} alt={pokemon.nombre} className="tarjeta-imagen" />

      <div className="tarjeta-info">
        <h3 className="tarjeta-nombre">
          <span className="tarjeta-numero">#{pokemon.id}</span> {formatearNombre(pokemon.nombre)}
        </h3>

        <div className="tarjeta-tipos">
          {pokemon.tipos.map((tipo) => (
            <InsigniaTipo key={tipo} tipo={tipo} />
          ))}
        </div>

        {mostrarStats && (
          <ul className="tarjeta-stats">
            {pokemon.stats.map((stat) => (
              <li key={stat.nombre}>
                <span className="stat-nombre">{stat.nombre}</span>
                <span className="stat-barra">
                  <span style={{ width: `${(stat.valor / STAT_MAXIMA) * 100}%` }} />
                </span>
                <span className="stat-valor">{stat.valor}</span>
              </li>
            ))}
          </ul>
        )}

        <p className="tarjeta-total">
          Total: <strong>{pokemon.total}</strong>
        </p>
      </div>
    </div>
  )
}
