import { infoTipo } from '../../utils/tiposPokemon'

interface Props {
  /** Tipo en inglés, p. ej. `"fire"`. */
  tipo: string
}

/** Etiqueta del color del tipo con su nombre en español. */
export function InsigniaTipo({ tipo }: Props) {
  const { nombre, color, textoOscuro } = infoTipo(tipo)
  return (
    <span
      className="insignia-tipo"
      style={{ background: color, color: textoOscuro ? '#111' : '#fff' }}
    >
      {nombre}
    </span>
  )
}
