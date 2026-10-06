import { useEffect, useState } from 'react'

interface Props {
  /** Número final; puede tener decimales (p. ej. 267.5). */
  valor: number
  /** Duración de la animación en milisegundos. */
  duracion?: number
}

/** Número que cuenta desde 0 hasta `valor`, un cuadro de animación a la vez. */
export function Contador({ valor, duracion = 900 }: Props) {
  const [mostrado, setMostrado] = useState(0)

  useEffect(() => {
    const inicio = performance.now()
    let cuadro = 0

    function avanzar(ahora: number) {
      const progreso = Math.min((ahora - inicio) / duracion, 1)
      setMostrado(progreso < 1 ? Math.round(valor * progreso) : valor)
      if (progreso < 1) cuadro = requestAnimationFrame(avanzar)
    }

    cuadro = requestAnimationFrame(avanzar)
    return () => cancelAnimationFrame(cuadro)
  }, [valor, duracion])

  return <>{mostrado}</>
}
