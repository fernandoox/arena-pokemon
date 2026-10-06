import type { Pokemon } from './pokemon'

/** Identificador de cada lado de la arena. */
export type Lado = 'A' | 'B'

/** Lo que registra cada equipo antes de la batalla. */
export interface Bando {
  nombre: string
  /** Siempre 3 posiciones en orden de pelea; `null` = sin elegir. */
  pokemon: (Pokemon | null)[]
  estrategia: string
  /** `true` cuando el bando confirmó; su equipo se oculta. */
  listo: boolean
}
