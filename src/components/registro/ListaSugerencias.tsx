import { urlSprite } from '../../api/pokeapi'
import type { ResultadoBusqueda } from '../../types'
import { formatearNombre } from '../../utils/texto'

interface Props {
  sugerencias: ResultadoBusqueda[]
  onElegir: (nombre: string) => void
}

/** Lista desplegable de Pokémon que coinciden con la búsqueda. */
export function ListaSugerencias({ sugerencias, onElegir }: Props) {
  if (sugerencias.length === 0) return null

  return (
    <ul className="sugerencias">
      {sugerencias.map((s) => (
        <li key={s.nombre}>
          <button type="button" onClick={() => onElegir(s.nombre)}>
            <img src={urlSprite(s.id)} alt="" loading="lazy" />
            {formatearNombre(s.nombre)}
          </button>
        </li>
      ))}
    </ul>
  )
}
