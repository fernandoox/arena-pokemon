// Sonidos sintetizados con la Web Audio API, sin archivos de audio:
// osciladores para tonos y ruido blanco para golpes, como en consolas retro.
import { guardarPreferencia, leerPreferencia } from '../utils/preferencias'

const CLAVE = 'arena-sonido'
let activado = leerPreferencia(CLAVE, true)
let contexto: AudioContext | null = null

export const sonidoActivado = () => activado

/** Prende o apaga los efectos y recuerda la elección. */
export function activarSonido(valor: boolean): void {
  activado = valor
  guardarPreferencia(CLAVE, valor)
}

/**
 * Motor de audio del navegador. Se crea al primer uso porque
 * los navegadores solo permiten sonido después de un clic.
 */
function obtenerContexto(): AudioContext | null {
  if (!activado) return null
  contexto ??= new AudioContext()
  if (contexto.state === 'suspended') void contexto.resume()
  return contexto
}

/** Opciones de {@link tono}. */
interface OpcionesTono {
  /** `'square'` suena a videojuego; `'sine'` es suave. */
  forma?: OscillatorType
  volumen?: number
  /** Si se indica, el tono se desliza hasta esta frecuencia. */
  frecuenciaFinal?: number
}

/**
 * Toca un tono.
 * @param frecuencia En Hz (440 = La).
 * @param inicio Segundos desde ahora.
 * @param duracion Segundos.
 */
export function tono(
  frecuencia: number,
  inicio: number,
  duracion: number,
  { forma = 'square', volumen = 0.12, frecuenciaFinal }: OpcionesTono = {},
): void {
  const ctx = obtenerContexto()
  if (!ctx) return
  const t = ctx.currentTime + inicio
  const oscilador = ctx.createOscillator()
  const ganancia = ctx.createGain()

  oscilador.type = forma
  oscilador.frequency.setValueAtTime(frecuencia, t)
  if (frecuenciaFinal)
    oscilador.frequency.exponentialRampToValueAtTime(frecuenciaFinal, t + duracion)

  // Sube rápido y se apaga suave para evitar "clics".
  ganancia.gain.setValueAtTime(0.0001, t)
  ganancia.gain.exponentialRampToValueAtTime(volumen, t + 0.01)
  ganancia.gain.exponentialRampToValueAtTime(0.0001, t + duracion)

  oscilador.connect(ganancia).connect(ctx.destination)
  oscilador.start(t)
  oscilador.stop(t + duracion + 0.05)
}

/**
 * Toca un golpe de ruido blanco (tambores, explosiones).
 * @param inicio Segundos desde ahora.
 * @param duracion Segundos.
 */
export function ruido(inicio: number, duracion: number, volumen = 0.2): void {
  const ctx = obtenerContexto()
  if (!ctx) return
  const t = ctx.currentTime + inicio
  const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * duracion), ctx.sampleRate)
  buffer.getChannelData(0).forEach((_, i, datos) => (datos[i] = Math.random() * 2 - 1))

  const fuente = ctx.createBufferSource()
  const ganancia = ctx.createGain()
  fuente.buffer = buffer
  ganancia.gain.setValueAtTime(volumen, t)
  ganancia.gain.exponentialRampToValueAtTime(0.0001, t + duracion)

  fuente.connect(ganancia).connect(ctx.destination)
  fuente.start(t)
}
