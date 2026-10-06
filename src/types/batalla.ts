import type { Lado } from './bando'
import type { Pokemon } from './pokemon'

/** Mejor multiplicador de tipo encontrado y qué tipos lo produjeron. */
export interface Multiplicador {
  /** 2, 1, 0.5 o 0. */
  valor: number
  tipoAtacante: string
  tipoDefensor: string
}

/** Criterio que decidió una ronda. */
export type MotivoVictoria = 'puntaje' | 'velocidad' | 'moneda'

/** Todo lo que pasó en una ronda. */
export interface ResultadoRonda {
  /** 1, 2 o 3. */
  numero: number
  pokemonA: Pokemon
  pokemonB: Pokemon
  multiplicadorA: Multiplicador
  multiplicadorB: Multiplicador
  puntajeA: number
  puntajeB: number
  ganador: Lado
  motivo: MotivoVictoria
}

/** Rondas ganadas por cada lado. */
export type Marcador = Record<Lado, number>
