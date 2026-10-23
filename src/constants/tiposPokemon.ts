import type { InfoTipo } from '../types'

/** Nombre en español, color y emoji de ataque de cada tipo, indexado por su nombre en inglés. */
export const TIPOS: Record<string, InfoTipo> = {
  normal: { nombre: 'Normal', color: '#A8A77A', textoOscuro: true, emoji: '⭐' },
  fire: { nombre: 'Fuego', color: '#EE8130', textoOscuro: true, emoji: '🔥' },
  water: { nombre: 'Agua', color: '#6390F0', textoOscuro: true, emoji: '💧' },
  electric: { nombre: 'Eléctrico', color: '#F7D02C', textoOscuro: true, emoji: '⚡' },
  grass: { nombre: 'Planta', color: '#7AC74C', textoOscuro: true, emoji: '🍃' },
  ice: { nombre: 'Hielo', color: '#96D9D6', textoOscuro: true, emoji: '❄️' },
  fighting: { nombre: 'Lucha', color: '#C22E28', textoOscuro: false, emoji: '👊' },
  poison: { nombre: 'Veneno', color: '#A33EA1', textoOscuro: false, emoji: '☠️' },
  ground: { nombre: 'Tierra', color: '#E2BF65', textoOscuro: true, emoji: '⛰️' },
  flying: { nombre: 'Volador', color: '#A98FF3', textoOscuro: true, emoji: '🌪️' },
  psychic: { nombre: 'Psíquico', color: '#F95587', textoOscuro: true, emoji: '🌀' },
  bug: { nombre: 'Bicho', color: '#A6B91A', textoOscuro: true, emoji: '🐛' },
  rock: { nombre: 'Roca', color: '#B6A136', textoOscuro: true, emoji: '🪨' },
  ghost: { nombre: 'Fantasma', color: '#735797', textoOscuro: false, emoji: '👻' },
  dragon: { nombre: 'Dragón', color: '#6F35FC', textoOscuro: false, emoji: '🐉' },
  dark: { nombre: 'Siniestro', color: '#705746', textoOscuro: false, emoji: '🌑' },
  steel: { nombre: 'Acero', color: '#B7B7CE', textoOscuro: true, emoji: '⚙️' },
  fairy: { nombre: 'Hada', color: '#D685AD', textoOscuro: true, emoji: '✨' },
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
