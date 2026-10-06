import { NOMBRES_STATS } from '../../constants/tiposPokemon'
import type { Estadistica, Pokemon, RespuestaPokemon } from '../../types'
import { urlSprite } from './busqueda'
import { conCache, pedirJson, URL_BASE } from './http'

/** Convierte la respuesta de PokéAPI en el `Pokemon` que usa la app. */
function aPokemon(datos: RespuestaPokemon): Pokemon {
  const stats: Estadistica[] = datos.stats.map((s) => ({
    nombre: NOMBRES_STATS[s.stat.name] ?? s.stat.name,
    valor: s.base_stat,
  }))

  return {
    id: datos.id,
    nombre: datos.name,
    imagen:
      datos.sprites.other?.['official-artwork']?.front_default ??
      datos.sprites.front_default ??
      urlSprite(datos.id),
    tipos: datos.types.map((t) => t.type.name),
    stats,
    total: stats.reduce((suma, s) => suma + s.valor, 0),
    velocidad: datos.stats.find((s) => s.stat.name === 'speed')?.base_stat ?? 0,
  }
}

/**
 * Obtiene imagen, tipos y estadísticas de un Pokémon (con caché).
 * @param nombre Nombre como lo usa PokéAPI, p. ej. `"pikachu"`.
 */
export const obtenerPokemon = conCache(async (nombre: string) =>
  aPokemon(await pedirJson<RespuestaPokemon>(`${URL_BASE}/pokemon/${nombre}`)),
)
