import { useEffect, useState } from 'react'
import type { Lado } from '../types'

/** Cada cuánto sale un ataque; deja una pausa después de `--vuelo` (CSS) para seguirlo con la vista. */
export const MS_POR_ATAQUE = 1300

/**
 * Turnos de ataque mientras la ronda está activa: A, B, A, B…
 * `disparo` cuenta los ataques; sirve de `key` para reiniciar cada animación.
 */
export function useTurnosDeAtaque(activo: boolean) {
  const [disparo, setDisparo] = useState(0)

  useEffect(() => {
    if (!activo) return
    const intervalo = setInterval(() => setDisparo((n) => n + 1), MS_POR_ATAQUE)
    return () => clearInterval(intervalo)
  }, [activo])

  const lado: Lado = disparo % 2 === 0 ? 'A' : 'B'
  return { disparo, lado }
}
