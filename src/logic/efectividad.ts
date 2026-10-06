import type { Multiplicador, Pokemon, RelacionesTipo } from '../types'

/**
 * Efectividad de un tipo atacante contra un tipo defensor.
 * @param tipoDefensor Tipo que recibe el ataque.
 * @param relacionesAtacante Relaciones de daño del tipo que ataca.
 * @returns 2 (súper efectivo), 0.5 (poco efectivo), 0 (no afecta) o 1 (normal).
 */
export function efectividad(tipoDefensor: string, relacionesAtacante: RelacionesTipo): number {
  if (relacionesAtacante.nulo.includes(tipoDefensor)) return 0
  if (relacionesAtacante.doble.includes(tipoDefensor)) return 2
  if (relacionesAtacante.mitad.includes(tipoDefensor)) return 0.5
  return 1
}

/**
 * Mejor multiplicador del atacante: prueba cada tipo suyo contra cada tipo
 * del defensor y se queda con el más alto.
 * @param relaciones Relaciones de daño de todos los tipos en juego.
 */
export function mejorMultiplicador(
  atacante: Pokemon,
  defensor: Pokemon,
  relaciones: Record<string, RelacionesTipo>,
): Multiplicador {
  const combinaciones = atacante.tipos.flatMap((tipoAtacante) =>
    defensor.tipos.map((tipoDefensor) => ({
      valor: efectividad(tipoDefensor, relaciones[tipoAtacante]),
      tipoAtacante,
      tipoDefensor,
    })),
  )
  return combinaciones.reduce((mejor, actual) => (actual.valor > mejor.valor ? actual : mejor))
}

/**
 * Describe un multiplicador con palabras.
 * @example describirMultiplicador(2) // 'súper efectivo'
 */
export function describirMultiplicador(valor: number): string {
  if (valor === 2) return 'súper efectivo'
  if (valor === 0.5) return 'poco efectivo'
  if (valor === 0) return 'no le afecta'
  return 'normal'
}
