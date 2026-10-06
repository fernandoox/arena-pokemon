// Formas simplificadas de las respuestas de PokéAPI: solo los campos que usa la app.

/** Respuesta de `/pokemon?limit=N`. */
export interface RespuestaLista {
  results: { name: string; url: string }[]
}

/** Respuesta de `/pokemon/{nombre}`. */
export interface RespuestaPokemon {
  id: number
  name: string
  types: { type: { name: string } }[]
  stats: { base_stat: number; stat: { name: string } }[]
  sprites: {
    front_default: string | null
    other?: { 'official-artwork'?: { front_default: string | null } }
  }
}

/** Respuesta de `/type/{nombre}`. */
export interface RespuestaTipo {
  damage_relations: {
    double_damage_to: { name: string }[]
    half_damage_to: { name: string }[]
    no_damage_to: { name: string }[]
  }
}
