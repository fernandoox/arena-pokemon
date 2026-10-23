import { useBatalla } from '../../hooks/useBatalla'
import { useTurnosDeAtaque } from '../../hooks/useTurnosDeAtaque'
import type { Bando, ResultadoRonda } from '../../types'
import { Ataques } from './Ataques'
import { Calculo } from './Calculo'
import { EncabezadoBatalla } from './EncabezadoBatalla'
import { Luchador } from './Luchador'
import { PanelNarracion } from './PanelNarracion'

interface Props {
  bandoA: Bando
  bandoB: Bando
  onTerminar: (resultados: ResultadoRonda[]) => void
}

/**
 * Pantalla de batalla: una ronda a la vez.
 * Primero la narración (los Pokémon siguen forcejeando) y al final se revelan el ganador y el cálculo.
 */
export function Batalla({ bandoA, bandoB, onTerminar }: Props) {
  const batalla = useBatalla(bandoA, bandoB)
  // Se atacan por turnos mientras se narra; al revelarse el ganador, paran.
  const atacando = batalla.calculada && !batalla.resultado
  const ataque = useTurnosDeAtaque(atacando)

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
          atacando={atacando && ataque.lado === 'A'}
        />
        <div className="vs">VS</div>
        {batalla.calculada && (
          <Ataques
            pokemonA={bandoA.pokemon[batalla.ronda]!}
            pokemonB={bandoB.pokemon[batalla.ronda]!}
            disparo={ataque.disparo}
            lado={ataque.lado}
            ganador={batalla.resultado?.ganador}
          />
        )}
        <Luchador
          lado="B"
          bando={bandoB}
          pokemon={bandoB.pokemon[batalla.ronda]!}
          resultado={batalla.resultado}
          atacando={atacando && ataque.lado === 'B'}
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

      {batalla.calculada && (
        <PanelNarracion
          key={batalla.ronda}
          narracion={batalla.narracion}
          alTerminar={batalla.terminarTexto}
        />
      )}

      {batalla.resultado && <Calculo resultado={batalla.resultado} />}

      <div className="acciones">
        <button
          type="button"
          className="boton-grande"
          disabled={!batalla.resultado}
          onClick={avanzar}
        >
          {batalla.esUltima ? 'Ver resultado final 🏁' : 'Siguiente ronda ➜'}
        </button>
      </div>
    </main>
  )
}
