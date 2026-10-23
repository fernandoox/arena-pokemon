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

/** Tiempo máximo de lectura por letra; respaldo por si el navegador nunca avisa que terminó. */
const MS_MAX_POR_LETRA = 120

/**
 * Lee un texto en voz alta si la voz está activada.
 * Se lee oración por oración porque Chrome corta frases largas.
 * La promesa se cumple al terminar de leer (o de inmediato si la voz está apagada).
 */
export function leerEnVozAlta(texto: string): Promise<void> {
  if (!disponible || !activada) return Promise.resolve()
  detenerVoz()
  const voz = buscarVoz()
  const oraciones = dividirEnOraciones(texto)

  return new Promise((resolve) => {
    const limite = setTimeout(resolve, texto.length * MS_MAX_POR_LETRA + 2000)
    const terminar = () => {
      clearTimeout(limite)
      resolve()
    }

    oraciones.forEach((oracion, i) => {
      const frase = new SpeechSynthesisUtterance(oracion)
      frase.lang = voz?.lang ?? 'es-US'
      if (voz) frase.voice = voz
      // Cancelar la voz también dispara `onerror`, así que nunca se queda esperando.
      if (i === oraciones.length - 1) frase.onend = frase.onerror = terminar
      speechSynthesis.speak(frase)
    })
    if (oraciones.length === 0) terminar()
  })
}

/** Calla al narrador. */
export function detenerVoz(): void {
  if (disponible) speechSynthesis.cancel()
}

// Las voces cargan de forma asíncrona: pedirlas al inicio las deja listas.
if (disponible) speechSynthesis.getVoices()
