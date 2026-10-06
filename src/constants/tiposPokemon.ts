import type { InfoTipo } from '../types'

/** Nombre en español y color de cada tipo, indexado por su nombre en inglés. */
export const TIPOS: Record<string, InfoTipo> = {
  normal: { nombre: 'Normal', color: '#A8A77A', textoOscuro: true },
  fire: { nombre: 'Fuego', color: '#EE8130', textoOscuro: true },
  water: { nombre: 'Agua', color: '#6390F0', textoOscuro: true },
  electric: { nombre: 'Eléctrico', color: '#F7D02C', textoOscuro: true },
  grass: { nombre: 'Planta', color: '#7AC74C', textoOscuro: true },
  ice: { nombre: 'Hielo', color: '#96D9D6', textoOscuro: true },
  fighting: { nombre: 'Lucha', color: '#C22E28', textoOscuro: false },
  poison: { nombre: 'Veneno', color: '#A33EA1', textoOscuro: false },
  ground: { nombre: 'Tierra', color: '#E2BF65', textoOscuro: true },
  flying: { nombre: 'Volador', color: '#A98FF3', textoOscuro: true },
  psychic: { nombre: 'Psíquico', color: '#F95587', textoOscuro: true },
  bug: { nombre: 'Bicho', color: '#A6B91A', textoOscuro: true },
  rock: { nombre: 'Roca', color: '#B6A136', textoOscuro: true },
  ghost: { nombre: 'Fantasma', color: '#735797', textoOscuro: false },
  dragon: { nombre: 'Dragón', color: '#6F35FC', textoOscuro: false },
  dark: { nombre: 'Siniestro', color: '#705746', textoOscuro: false },
  steel: { nombre: 'Acero', color: '#B7B7CE', textoOscuro: true },
  fairy: { nombre: 'Hada', color: '#D685AD', textoOscuro: true },
}

/** Nombres en español de las estadísticas que devuelve PokéAPI. */
export const NOMBRES_STATS: Record<string, string> = {
  hp: 'PS',
  attack: 'Ataque',
  defense: 'Defensa',
  'special-attack': 'At. Esp.',
  'special-defense': 'Def. Esp.',
  speed: 'Velocidad',
}
