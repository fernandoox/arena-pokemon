import type { Narracion } from '../../types'
import { MaquinaDeEscribir } from '../comunes/MaquinaDeEscribir'

interface Props {
  /** Mientras no exista, se muestra que el narrador está escribiendo. */
  narracion?: Narracion
}

/** Narración de la IA (o la de respaldo) con efecto de máquina de escribir. */
export function PanelNarracion({ narracion }: Props) {
  return (
    <section className="narracion">
      <h2>🎙️ Narración</h2>
      {!narracion && (
        <p className="aviso-suave parpadeo">El narrador está preparando la crónica…</p>
      )}
      {narracion && <MaquinaDeEscribir texto={narracion.texto} />}
      {narracion?.respaldo && (
        <p className="aviso-suave">(Narración de respaldo: la IA no respondió)</p>
      )}
    </section>
  )
}
