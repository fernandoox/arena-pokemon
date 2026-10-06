interface Props {
  /** Frases prohibidas encontradas; si está vacío no se muestra nada. */
  frases: string[]
}

/** Aviso grande de intento de *prompt injection*. */
export function AlertaHackeo({ frases }: Props) {
  if (frases.length === 0) return null

  return (
    <div className="alerta-hackeo" role="alert">
      <strong>Intento de hackeo detectado 🚨</strong>
      <span>Frases prohibidas: {frases.join(', ')}</span>
    </div>
  )
}
