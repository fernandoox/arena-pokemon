import type {
  Lado,
  Marcador,
  MotivoVictoria,
  Pokemon,
  RelacionesTipo,
  ResultadoRonda,
} from '../types'
import { mejorMultiplicador } from './efectividad'

/** Elige un lado al azar (50 % / 50 %). */
const monedaAlAire = (): Lado => (Math.random() < 0.5 ? 'A' : 'B')

/**
 * Decide el ganador: mayor puntaje; si empatan, mayor velocidad; si empatan otra vez, moneda.
 * @param lanzarMoneda Se puede reemplazar en pruebas para no depender del azar.
 */
function decidirGanador(
  puntajeA: number,
  puntajeB: number,
  pokemonA: Pokemon,
  pokemonB: Pokemon,
  lanzarMoneda: () => Lado,
): { ganador: Lado; motivo: MotivoVictoria } {
  if (puntajeA !== puntajeB) {
    return { ganador: puntajeA > puntajeB ? 'A' : 'B', motivo: 'puntaje' }
  }
  if (pokemonA.velocidad !== pokemonB.velocidad) {
    return { ganador: pokemonA.velocidad > pokemonB.velocidad ? 'A' : 'B', motivo: 'velocidad' }
  }
  return { ganador: lanzarMoneda(), motivo: 'moneda' }
}

/**
 * Calcula una ronda: `puntaje = suma de stats × multiplicador de tipo`.
 * La IA no participa: el ganador sale solo de este cálculo.
 * @param numero Número de ronda (1 a 3).
 * @param relaciones Relaciones de daño de los tipos de ambos Pokémon.
 * @param lanzarMoneda Desempate final; por defecto, al azar.
 */
export function calcularRonda(
  numero: number,
  pokemonA: Pokemon,
  pokemonB: Pokemon,
  relaciones: Record<string, RelacionesTipo>,
  lanzarMoneda: () => Lado = monedaAlAire,
): ResultadoRonda {
  const multiplicadorA = mejorMultiplicador(pokemonA, pokemonB, relaciones)
  const multiplicadorB = mejorMultiplicador(pokemonB, pokemonA, relaciones)
  const puntajeA = pokemonA.total * multiplicadorA.valor
  const puntajeB = pokemonB.total * multiplicadorB.valor

  return {
    numero,
    pokemonA,
    pokemonB,
    multiplicadorA,
    multiplicadorB,
    puntajeA,
    puntajeB,
    ...decidirGanador(puntajeA, puntajeB, pokemonA, pokemonB, lanzarMoneda),
  }
}

/** Pokémon ganador y perdedor de una ronda. */
export function ganadorYPerdedor(ronda: ResultadoRonda): { ganador: Pokemon; perdedor: Pokemon } {
  return ronda.ganador === 'A'
    ? { ganador: ronda.pokemonA, perdedor: ronda.pokemonB }
    : { ganador: ronda.pokemonB, perdedor: ronda.pokemonA }
}

/** Cuenta cuántas rondas ganó cada lado. */
export function contarVictorias(resultados: ResultadoRonda[]): Marcador {
  return {
    A: resultados.filter((r) => r.ganador === 'A').length,
    B: resultados.filter((r) => r.ganador === 'B').length,
  }
}
