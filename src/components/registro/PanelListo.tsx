import type { Lado } from '../../types'

interface Props {
  lado: Lado
  nombre: string
  onEditar: () => void
}

/** Reemplaza el formulario de un bando confirmado para que el rival no vea su equipo. */
export function PanelListo({ lado, nombre, onEditar }: Props) {
  return (
    <section className={`panel-bando lado-${lado} listo`}>
      <h2>Bando {lado}</h2>
      <p className="nombre-listo">{nombre}</p>
      <p className="sello-listo">Listo ✔</p>
      <p className="aviso-suave">Su equipo está oculto hasta la batalla 🤫</p>
      <button type="button" className="boton-chico" onClick={onEditar}>
        ✏️ Editar
      </button>
    </section>
  )
}
