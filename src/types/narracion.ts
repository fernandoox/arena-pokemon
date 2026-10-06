import type { ResultadoRonda } from './batalla'

/** Datos que se envían a la IA para narrar una ronda. */
export interface DatosNarracion {
  ronda: ResultadoRonda
  nombreBandoA: string
  nombreBandoB: string
  estrategiaA: string
  estrategiaB: string
}

/** Texto de la narración de una ronda. */
export interface Narracion {
  texto: string
  /** `true` si es la narración genérica porque la IA no respondió. */
  respaldo: boolean
}
