import { useEffect, useState } from 'react'

interface Props {
  texto: string
  msPorLetra?: number
  /** Se llama cuando ya apareció la última letra. */
  alTerminar?: () => void
}

/**
 * Texto que aparece letra por letra.
 * Empieza desde cero cada vez que se monta: para reiniciarlo, cámbiale el `key`.
 */
export function MaquinaDeEscribir({ texto, msPorLetra = 28, alTerminar }: Props) {
  const [letras, setLetras] = useState(0)
  const terminado = letras >= texto.length

  useEffect(() => {
    if (terminado) return
    const temporizador = setTimeout(() => setLetras((n) => n + 1), msPorLetra)
    return () => clearTimeout(temporizador)
  }, [letras, terminado, msPorLetra])

  useEffect(() => {
    if (terminado) alTerminar?.()
  }, [terminado, alTerminar])

  return (
    <p className="maquina">
      {texto.slice(0, letras)}
      {!terminado && <span className="cursor">▌</span>}
    </p>
  )
}
