import { useEffect, useState } from 'react'

interface Props {
  texto: string
  msPorLetra?: number
}

/**
 * Texto que aparece letra por letra.
 * Empieza desde cero cada vez que se monta: para reiniciarlo, cámbiale el `key`.
 */
export function MaquinaDeEscribir({ texto, msPorLetra = 28 }: Props) {
  const [letras, setLetras] = useState(0)
  const terminado = letras >= texto.length

  useEffect(() => {
    if (terminado) return
    const temporizador = setTimeout(() => setLetras((n) => n + 1), msPorLetra)
    return () => clearTimeout(temporizador)
  }, [letras, terminado, msPorLetra])

  return (
    <p className="maquina">
      {texto.slice(0, letras)}
      {!terminado && <span className="cursor">▌</span>}
    </p>
  )
}
