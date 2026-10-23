import { TIPOS } from '../constants/tiposPokemon'
import type { InfoTipo } from '../types'

/**
 * Nombre en español, color y emoji de un tipo.
 * @param tipo Nombre del tipo en inglés, p. ej. `"fire"`.
 * @returns Un gris genérico si el tipo no se conoce.
 */
export function infoTipo(tipo: string): InfoTipo {
  return TIPOS[tipo] ?? { nombre: tipo, color: '#777777', textoOscuro: false, emoji: '💫' }
}
