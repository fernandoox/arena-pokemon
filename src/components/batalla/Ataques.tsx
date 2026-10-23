import type { Lado, Pokemon } from '../../types'
import { infoTipo } from '../../utils/tiposPokemon'

type Trayectoria = 'recto' | 'arco' | 'zigzag' | 'rafaga'

/** Cómo viaja el ataque de cada tipo; los que no aparecen van en arco. */
const TRAYECTORIAS: Record<string, Trayectoria> = {
  fire: 'rafaga',
  water: 'rafaga',
  ice: 'rafaga',
  flying: 'rafaga',
  electric: 'zigzag',
  dragon: 'zigzag',
  psychic: 'recto',
  ghost: 'recto',
  dark: 'recto',
  steel: 'recto',
  fairy: 'recto',
  normal: 'recto',
  fighting: 'recto',
}

interface Props {
  pokemonA: Pokemon
  pokemonB: Pokemon
  /** Número de ataque; cambia en cada turno y reinicia la animación. */
  disparo: number
  /** Quién lanza el ataque en este turno. */
  lado: Lado
  /** Mientras no exista, se lanzan ataques por turnos; al llegar, el ganador da el golpe final. */
  ganador?: Lado
}

interface PropsProyectil {
  pokemon: Pokemon
  lado: Lado
  /** Cuál de sus tipos usa; los Pokémon de dos tipos los alternan. */
  turno: number
  final?: boolean
}

/** Un ataque: el emoji del tipo viajando con su trayectoria y el color del bando que lo lanza. */
function Proyectil({ pokemon, lado, turno, final = false }: PropsProyectil) {
  const tipo = pokemon.tipos[turno % pokemon.tipos.length]
  const trayectoria = TRAYECTORIAS[tipo] ?? 'arco'
  // La ráfaga son 3 emojis seguidos; el resto, y el golpe final, uno solo para que coincida con el 💥.
  const copias = trayectoria === 'rafaga' && !final ? 3 : 1

  return Array.from({ length: copias }, (_, i) => (
    <span
      key={i}
      className={`proyectil lado-${lado} desde-${lado} ${final ? 'final' : ''}`}
      style={{ animationDelay: `${i * 0.15}s` }}
    >
      <span className={`proyectil-emoji trayectoria-${trayectoria}`}>{infoTipo(tipo).emoji}</span>
    </span>
  ))
}

/** Emojis que vuelan de un Pokémon al otro según su tipo. */
export function Ataques({ pokemonA, pokemonB, disparo, lado, ganador }: Props) {
  if (ganador) {
    return (
      <div className="ataques" aria-hidden="true">
        <Proyectil pokemon={ganador === 'A' ? pokemonA : pokemonB} lado={ganador} turno={0} final />
        <span className={`impacto contra-${ganador === 'A' ? 'B' : 'A'}`}>💥</span>
      </div>
    )
  }

  return (
    <div className="ataques" aria-hidden="true">
      {/* El key nuevo reinicia la animación en cada disparo. */}
      <Proyectil
        key={disparo}
        pokemon={lado === 'A' ? pokemonA : pokemonB}
        lado={lado}
        turno={Math.floor(disparo / 2)}
      />
    </div>
  )
}
