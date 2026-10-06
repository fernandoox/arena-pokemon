import { useBusquedaPokemon } from '../../hooks/useBusquedaPokemon'
import type { Pokemon } from '../../types'
import { TarjetaPokemon } from '../comunes/TarjetaPokemon'
import { ListaSugerencias } from './ListaSugerencias'

interface Props {
  /** Orden de pelea: 1, 2 o 3. */
  posicion: number
  valor: Pokemon | null
  onCambio: (pokemon: Pokemon | null) => void
}

/** Campo con sugerencias para elegir un Pokémon; si ya hay uno, muestra su tarjeta. */
export function BuscadorPokemon({ posicion, valor, onCambio }: Props) {
  const { texto, cambiarTexto, sugerencias, cargando, error, seleccionar } =
    useBusquedaPokemon(onCambio)

  const encabezado = <span className="posicion">{posicion}</span>

  if (valor) {
    return (
      <div className="buscador">
        <div className="buscador-encabezado">
          {encabezado}
          <button type="button" className="boton-chico" onClick={() => onCambio(null)}>
            ✖ Cambiar
          </button>
        </div>
        <TarjetaPokemon pokemon={valor} />
      </div>
    )
  }

  return (
    <div className="buscador">
      <div className="buscador-encabezado">
        {encabezado}
        <input
          type="text"
          value={texto}
          placeholder="Busca un Pokémon (ej. pikachu)"
          disabled={cargando}
          onChange={(e) => cambiarTexto(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && sugerencias.length > 0) {
              e.preventDefault()
              void seleccionar(sugerencias[0].nombre)
            }
          }}
        />
      </div>

      {cargando && <p className="aviso-suave">Cargando…</p>}
      {error && <p className="texto-error">{error}</p>}
      <ListaSugerencias sugerencias={sugerencias} onElegir={seleccionar} />
    </div>
  )
}
