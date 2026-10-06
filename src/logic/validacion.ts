import { LIMITE_STATS, MAX_ESTRATEGIA } from '../constants/reglas'
import type { Bando, Pokemon } from '../types'
import { detectarInyeccionEnBando } from './inyeccion'

/** Suma las estadísticas base de los Pokémon elegidos; ignora huecos vacíos. */
export function sumarStats(pokemon: (Pokemon | null)[]): number {
  return pokemon.reduce((suma, p) => suma + (p?.total ?? 0), 0)
}

/** Nombres de Pokémon que aparecen más de una vez. */
export function buscarRepetidos(pokemon: (Pokemon | null)[]): string[] {
  const nombres = pokemon.filter((p) => p !== null).map((p) => p.nombre)
  return nombres.filter((nombre, i) => nombres.indexOf(nombre) !== i)
}

/**
 * Revisa todas las reglas del registro.
 * @returns Mensajes de error; vacío si el bando puede confirmarse.
 */
export function validarBando(bando: Bando): string[] {
  const errores: string[] = []
  const faltantes = bando.pokemon.filter((p) => p === null).length
  const repetidos = buscarRepetidos(bando.pokemon)
  const total = sumarStats(bando.pokemon)

  if (!bando.nombre.trim()) errores.push('Escribe el nombre del bando.')
  if (faltantes > 0) errores.push(`Faltan ${faltantes} Pokémon por elegir.`)
  if (repetidos.length > 0) errores.push(`No se puede repetir Pokémon: ${repetidos.join(', ')}.`)
  if (total > LIMITE_STATS) {
    errores.push(`La suma de estadísticas es ${total} y el máximo es ${LIMITE_STATS}.`)
  }
  if (!bando.estrategia.trim()) errores.push('Escribe una estrategia.')
  if (bando.estrategia.length > MAX_ESTRATEGIA) {
    errores.push(`La estrategia no puede pasar de ${MAX_ESTRATEGIA} caracteres.`)
  }
  if (detectarInyeccionEnBando(bando).length > 0) {
    errores.push('Hay frases prohibidas en el nombre o la estrategia.')
  }
  return errores
}
