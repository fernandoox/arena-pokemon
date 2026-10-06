import type { RelacionesTipo, RespuestaTipo } from '../../types'
import { conCache, pedirJson, URL_BASE } from './http'

/**
 * Obtiene contra qué tipos es fuerte, débil o inútil un tipo (con caché).
 * @param tipo Nombre del tipo en inglés, p. ej. `"fire"`.
 */
export const obtenerRelacionesTipo = conCache(async (tipo: string): Promise<RelacionesTipo> => {
  const { damage_relations: r } = await pedirJson<RespuestaTipo>(`${URL_BASE}/type/${tipo}`)
  return {
    doble: r.double_damage_to.map((t) => t.name),
    mitad: r.half_damage_to.map((t) => t.name),
    nulo: r.no_damage_to.map((t) => t.name),
  }
})

/**
 * Descarga las relaciones de varios tipos a la vez.
 * @param tipos Nombres de tipos (se ignoran repetidos).
 * @returns Objeto indexado por tipo, p. ej. `{ fire: {...}, grass: {...} }`.
 */
export async function obtenerRelaciones(tipos: string[]): Promise<Record<string, RelacionesTipo>> {
  const unicos = [...new Set(tipos)]
  const relaciones = await Promise.all(unicos.map(obtenerRelacionesTipo))
  return Object.fromEntries(unicos.map((tipo, i) => [tipo, relaciones[i]]))
}
