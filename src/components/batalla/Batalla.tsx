import { useBatalla } from '../../hooks/useBatalla'
import type { Bando, ResultadoRonda } from '../../types'
import { Calculo } from './Calculo'
import { EncabezadoBatalla } from './EncabezadoBatalla'
import { Luchador } from './Luchador'
import { PanelNarracion } from './PanelNarracion'

interface Props {
  bandoA: Bando
  bandoB: Bando
  onTerminar: (resultados: ResultadoRonda[]) => void
}

/** Pantalla de batalla: una ronda a la vez con cálculo, narración y botón para avanzar. */
export function Batalla({ bandoA, bandoB, onTerminar }: Props) {
  const batalla = useBatalla(bandoA, bandoB)

  function avanzar() {
    if (batalla.esUltima) onTerminar(batalla.resultados)
    else batalla.siguienteRonda()
  }

  return (
    <main className="pantalla-batalla">
      <EncabezadoBatalla
        ronda={batalla.ronda}
        nombreA={bandoA.nombre}
        nombreB={bandoB.nombre}
        marcador={batalla.marcador}
      />

      {/* El key nuevo en cada ronda vuelve a montar la arena y repite las animaciones de entrada. */}
      <section key={batalla.ronda} className={`arena ${batalla.resultado ? '' : 'peleando'}`}>
        <Luchador
          lado="A"
          bando={bandoA}
          pokemon={bandoA.pokemon[batalla.ronda]!}
          resultado={batalla.resultado}
        />
        <div className="vs">VS</div>
        <Luchador
          lado="B"
          bando={bandoB}
          pokemon={bandoB.pokemon[batalla.ronda]!}
          resultado={batalla.resultado}
        />
      </section>

      {batalla.error && (
        <div className="alerta-error">
          {batalla.error}{' '}
          <button type="button" className="boton-chico" onClick={batalla.reintentar}>
            Reintentar
          </button>
        </div>
      )}

      {!batalla.resultado && !batalla.error && (
        <p className="combate-en-curso">⚔️ ¡Combate en curso! ⚔️</p>
      )}

      {batalla.resultado && (
        <>
          <Calculo resultado={batalla.resultado} />
          <PanelNarracion key={batalla.ronda} narracion={batalla.narracion} />
        </>
      )}

      <div className="acciones">
        <button
          type="button"
          className="boton-grande"
          disabled={!batalla.narracion}
          onClick={avanzar}
        >
          {batalla.esUltima ? 'Ver resultado final 🏁' : 'Siguiente ronda ➜'}
        </button>
      </div>
    </main>
  )
}
