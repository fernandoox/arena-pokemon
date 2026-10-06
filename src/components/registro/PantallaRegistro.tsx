import type { Bando } from '../../types'
import { RegistroBando } from './RegistroBando'

interface Props {
  bandoA: Bando
  bandoB: Bando
  onCambioA: (bando: Bando) => void
  onCambioB: (bando: Bando) => void
  onIniciar: () => void
}

/** Los dos formularios lado a lado y el botón para empezar cuando ambos están listos. */
export function PantallaRegistro({ bandoA, bandoB, onCambioA, onCambioB, onIniciar }: Props) {
  const ambosListos = bandoA.listo && bandoB.listo

  return (
    <main className="pantalla-registro">
      <h1 className="titulo-app">⚡ Arena Pokémon ⚡</h1>

      <div className="bandos">
        <RegistroBando lado="A" bando={bandoA} onCambio={onCambioA} />
        <RegistroBando lado="B" bando={bandoB} onCambio={onCambioB} />
      </div>

      <div className="acciones">
        <button
          type="button"
          className="boton-grande boton-iniciar"
          disabled={!ambosListos}
          onClick={onIniciar}
        >
          ⚔️ Iniciar batalla
        </button>
        {!ambosListos && <p className="aviso-suave">Ambos bandos deben estar listos.</p>}
      </div>
    </main>
  )
}
