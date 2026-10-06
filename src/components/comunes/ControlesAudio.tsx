import { useState } from 'react'
import { sonarSeleccion } from '../../audio/efectos'
import { activarSonido, sonidoActivado } from '../../audio/sintetizador'
import { activarVoz, vozActivada, vozDisponible } from '../../audio/voz'

/** Botones flotantes para prender o apagar los efectos de sonido y la voz del narrador. */
export function ControlesAudio() {
  const [sonido, setSonido] = useState(sonidoActivado)
  const [voz, setVoz] = useState(vozActivada)

  function alternarSonido() {
    activarSonido(!sonido)
    setSonido(!sonido)
    if (!sonido) sonarSeleccion()
  }

  function alternarVoz() {
    activarVoz(!voz)
    setVoz(!voz)
  }

  return (
    <div className="controles-audio">
      <button
        type="button"
        title="Efectos de sonido"
        aria-pressed={sonido}
        onClick={alternarSonido}
      >
        {sonido ? '🔊' : '🔇'} Sonido
      </button>

      {vozDisponible() && (
        <button
          type="button"
          title="Leer la narración en voz alta"
          aria-pressed={voz}
          onClick={alternarVoz}
        >
          {voz ? '🗣️' : '🤐'} Voz
        </button>
      )}
    </div>
  )
}
