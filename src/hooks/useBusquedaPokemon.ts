import { useEffect, useState } from 'react'
import { buscarPokemon, obtenerPokemon } from '../api/pokeapi'
import { sonarSeleccion } from '../audio/efectos'
import type { Pokemon, ResultadoBusqueda } from '../types'

/**
 * Estado del buscador: texto, sugerencias y descarga del Pokémon elegido.
 * @param alSeleccionar Recibe el Pokémon ya descargado.
 */
export function useBusquedaPokemon(alSeleccionar: (pokemon: Pokemon) => void) {
  const [texto, setTexto] = useState('')
  const [sugerencias, setSugerencias] = useState<ResultadoBusqueda[]>([])
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // Ignora respuestas de búsquedas viejas si el texto cambió.
    let vigente = true
    buscarPokemon(texto)
      .then((lista) => vigente && setSugerencias(lista))
      .catch(() => vigente && setError('No se pudo conectar con PokéAPI.'))
    return () => {
      vigente = false
    }
  }, [texto])

  function cambiarTexto(valor: string) {
    setTexto(valor)
    setError('')
  }

  async function seleccionar(nombre: string) {
    setCargando(true)
    setError('')
    setSugerencias([])
    try {
      alSeleccionar(await obtenerPokemon(nombre))
      sonarSeleccion()
      setTexto('')
    } catch {
      setError('No se pudo cargar ese Pokémon. Intenta de nuevo.')
    } finally {
      setCargando(false)
    }
  }

  return { texto, cambiarTexto, sugerencias, cargando, error, seleccionar }
}
