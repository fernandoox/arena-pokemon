import { FRASES_PROHIBIDAS } from '../constants/frasesProhibidas'
import type { Bando } from '../types'
import { normalizarTexto } from '../utils/texto'

/**
 * Busca frases típicas de *prompt injection*.
 *
 * Un filtro de palabras nunca es perfecto (alguien puede escribir "i-g-n-o-r-a").
 * La defensa principal es otra: el ganador lo decide un cálculo, no la IA.
 *
 * @returns Frases encontradas; vacío si el texto está limpio.
 */
export function detectarInyeccion(texto: string): string[] {
  const limpio = normalizarTexto(texto)
  return FRASES_PROHIBIDAS.filter((f) => f.patron.test(limpio)).map((f) => f.frase)
}

/**
 * Revisa los textos de un bando que se envían a la IA (nombre y estrategia).
 * @returns Frases prohibidas encontradas.
 */
export function detectarInyeccionEnBando(bando: Pick<Bando, 'nombre' | 'estrategia'>): string[] {
  return detectarInyeccion(`${bando.nombre} ${bando.estrategia}`)
}
