// Texto a voz con la Web Speech API: gratis, sin llave, usa las voces del navegador.
import { VOZ_NARRADOR } from '../constants/narrador'
import { guardarPreferencia, leerPreferencia } from '../utils/preferencias'
import { dividirEnOraciones } from '../utils/texto'

const CLAVE = 'arena-voz'
const disponible = typeof window !== 'undefined' && 'speechSynthesis' in window
let activada = leerPreferencia(CLAVE, true)

export const vozDisponible = () => disponible
export const vozActivada = () => activada

/** Prende o apaga la voz y recuerda la elección; al apagar, calla al narrador. */
export function activarVoz(valor: boolean): void {
  activada = valor
  guardarPreferencia(CLAVE, valor)
  if (!valor) detenerVoz()
}

/** La voz del narrador o, si el navegador no la tiene, cualquiera en español. */
function buscarVoz(): SpeechSynthesisVoice | undefined {
  const voces = speechSynthesis.getVoices()
  return voces.find((v) => v.name === VOZ_NARRADOR) ?? voces.find((v) => v.lang.startsWith('es'))
}

/**
 * Lee un texto en voz alta si la voz está activada.
 * Se lee oración por oración porque Chrome corta frases largas.
 */
export function leerEnVozAlta(texto: string): void {
  if (!disponible || !activada) return
  detenerVoz()
  const voz = buscarVoz()

  for (const oracion of dividirEnOraciones(texto)) {
    const frase = new SpeechSynthesisUtterance(oracion)
    frase.lang = voz?.lang ?? 'es-US'
    if (voz) frase.voice = voz
    speechSynthesis.speak(frase)
  }
}

/** Calla al narrador. */
export function detenerVoz(): void {
  if (disponible) speechSynthesis.cancel()
}

// Las voces cargan de forma asíncrona: pedirlas al inicio las deja listas.
if (disponible) speechSynthesis.getVoices()
