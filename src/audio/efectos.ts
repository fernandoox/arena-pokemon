import { ruido, tono } from './sintetizador'

/** "Blip" de Pokédex al elegir un Pokémon. */
export function sonarSeleccion(): void {
  tono(660, 0, 0.08)
  tono(990, 0.08, 0.12)
}

/** Arpegio alegre al confirmar un bando. */
export function sonarListo(): void {
  ;[523, 659, 784, 1047].forEach((f, i) => tono(f, i * 0.08, 0.15))
}

/** Sirena de "intento de hackeo". */
export function sonarAlerta(): void {
  for (let i = 0; i < 4; i++) {
    tono(880, i * 0.25, 0.12, { forma: 'sawtooth', volumen: 0.1 })
    tono(660, i * 0.25 + 0.12, 0.12, { forma: 'sawtooth', volumen: 0.1 })
  }
}

/** Barrido hacia arriba y explosión al iniciar la batalla. */
export function sonarInicio(): void {
  tono(150, 0, 0.6, { forma: 'sawtooth', frecuenciaFinal: 900 })
  ruido(0.55, 0.4, 0.25)
}

/**
 * Redoble de tambor que acelera.
 * @param segundos Duración total.
 */
export function sonarRedoble(segundos: number): void {
  let paso = 0.12
  for (let t = 0; t < segundos; t += paso) {
    ruido(t, 0.05, 0.12)
    paso = Math.max(0.04, paso * 0.93)
  }
}

/** Choque y melodía corta cuando se decide una ronda. */
export function sonarGolpeYVictoria(): void {
  ruido(0, 0.35, 0.35)
  tono(180, 0, 0.35, { forma: 'sine', volumen: 0.3, frecuenciaFinal: 40 })
  ;[784, 988, 1175].forEach((f, i) => tono(f, 0.3 + i * 0.1, 0.18))
}

/** Notas de la fanfarria final: [frecuencia, inicio, duración]. */
const FANFARRIA: [number, number, number][] = [
  [523, 0, 0.15],
  [523, 0.15, 0.15],
  [523, 0.3, 0.15],
  [659, 0.45, 0.45],
  [587, 0.9, 0.15],
  [659, 1.05, 0.15],
  [784, 1.2, 0.9],
]

/** Fanfarria de victoria, con una octava abajo para dar cuerpo. */
export function sonarFanfarria(): void {
  for (const [f, inicio, dur] of FANFARRIA) {
    tono(f, inicio, dur, { volumen: 0.1 })
    tono(f / 2, inicio, dur, { forma: 'triangle', volumen: 0.1 })
  }
}
