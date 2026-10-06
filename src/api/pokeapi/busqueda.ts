import type { RespuestaLista, ResultadoBusqueda } from '../../types'
import { conCache, pedirJson, URL_BASE } from './http'

/** Pokémon de la Pokédex nacional. */
const TOTAL_POKEMON = 1025
const MAX_SUGERENCIAS = 8

/**
 * URL del sprite pequeño de un Pokémon.
 * @param id Número en la Pokédex.
 */
export function urlSprite(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
}

const obtenerLista = conCache(async () => {
  const datos = await pedirJson<RespuestaLista>(`${URL_BASE}/pokemon?limit=${TOTAL_POKEMON}`)
  return datos.results.map((p): ResultadoBusqueda => ({
    nombre: p.name,
    // La URL termina en ".../pokemon/25/"
    id: Number(p.url.split('/').filter(Boolean).pop()),
  }))
})

/**
 * Busca Pokémon por nombre: primero los que empiezan con el texto y luego los que lo contienen.
 * @param texto Lo que escribió el usuario (mínimo 2 letras).
 * @returns Hasta 8 sugerencias.
 */
export async function buscarPokemon(texto: string): Promise<ResultadoBusqueda[]> {
  const buscado = texto.trim().toLowerCase().replace(/\s+/g, '-')
  if (buscado.length < 2) return []

  const lista = await obtenerLista('todos')
  const empiezan = lista.filter((p) => p.nombre.startsWith(buscado))
  const contienen = lista.filter((p) => !p.nombre.startsWith(buscado) && p.nombre.includes(buscado))
  return [...empiezan, ...contienen].slice(0, MAX_SUGERENCIAS)
}
