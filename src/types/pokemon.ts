/** Estadística base de un Pokémon con su nombre en español. */
export interface Estadistica {
  nombre: string
  valor: number
}

/** Datos de un Pokémon necesarios para registrarlo y pelear. */
export interface Pokemon {
  id: number
  /** Nombre como lo usa PokéAPI, p. ej. `"mr-mime"`. */
  nombre: string
  /** URL del arte oficial. */
  imagen: string
  /** Tipos en inglés, p. ej. `["fire", "flying"]`. */
  tipos: string[]
  stats: Estadistica[]
  /** Suma de todas las estadísticas base. */
  total: number
  /** Velocidad base; desempata las rondas. */
  velocidad: number
}

/** Sugerencia del buscador: lo mínimo para mostrar nombre y sprite. */
export interface ResultadoBusqueda {
  nombre: string
  id: number
}

/** Relaciones de daño ofensivas de un tipo, según `/type/{nombre}`. */
export interface RelacionesTipo {
  /** Tipos que reciben ×2. */
  doble: string[]
  /** Tipos que reciben ×0.5. */
  mitad: string[]
  /** Tipos que reciben ×0. */
  nulo: string[]
}

/** Nombre en español y color para mostrar un tipo. */
export interface InfoTipo {
  nombre: string
  color: string
  /** `true` si el color es claro y necesita letra oscura. */
  textoOscuro: boolean
}
