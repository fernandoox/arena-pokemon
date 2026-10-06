import { useEffect, useRef, useState } from 'react'
import { narrarRonda } from '../api/claude'
import { obtenerRelaciones } from '../api/pokeapi'
import { sonarGolpeYVictoria, sonarRedoble } from '../audio/efectos'
import { detenerVoz, leerEnVozAlta } from '../audio/voz'
import { SUSPENSO_MS, TOTAL_RONDAS } from '../constants/reglas'
import { calcularRonda, contarVictorias } from '../logic/ronda'
import type { Bando, Narracion, ResultadoRonda } from '../types'
import { esperar } from '../utils/tiempo'

/** Devuelve una copia del arreglo con `valor` en la posición `indice`. */
function conValor<T>(lista: T[], indice: number, valor: T): T[] {
  const copia = [...lista]
  copia[indice] = valor
  return copia
}

/**
 * Controla las 3 rondas: calcula cada ganador y luego pide la narración.
 * Cada ronda se juega automáticamente al llegar a ella.
 */
export function useBatalla(bandoA: Bando, bandoB: Bando) {
  const [ronda, setRonda] = useState(0)
  const [resultados, setResultados] = useState<ResultadoRonda[]>([])
  const [narraciones, setNarraciones] = useState<Narracion[]>([])
  const [error, setError] = useState('')
  // En desarrollo React ejecuta los efectos dos veces; esto evita jugar una ronda doble.
  const iniciadas = useRef(new Set<number>())

  async function jugarRonda(indice: number) {
    iniciadas.current.add(indice)
    setError('')
    const a = bandoA.pokemon[indice]!
    const b = bandoB.pokemon[indice]!

    try {
      sonarRedoble(SUSPENSO_MS / 1000)
      const [relaciones] = await Promise.all([
        obtenerRelaciones([...a.tipos, ...b.tipos]),
        esperar(SUSPENSO_MS),
      ])
      const resultado = calcularRonda(indice + 1, a, b, relaciones)
      setResultados((previos) => conValor(previos, indice, resultado))
      sonarGolpeYVictoria()

      const narracion = await narrarRonda({
        ronda: resultado,
        nombreBandoA: bandoA.nombre,
        nombreBandoB: bandoB.nombre,
        estrategiaA: bandoA.estrategia,
        estrategiaB: bandoB.estrategia,
      })
      setNarraciones((previas) => conValor(previas, indice, narracion))
      leerEnVozAlta(narracion.texto)
    } catch {
      iniciadas.current.delete(indice)
      setError('No se pudieron descargar los tipos desde PokéAPI.')
    }
  }

  useEffect(() => {
    if (!iniciadas.current.has(ronda)) void jugarRonda(ronda)
    // Solo debe reaccionar al cambio de ronda.
    // oxlint-disable-next-line react-hooks/exhaustive-deps
  }, [ronda])

  useEffect(() => detenerVoz, [])

  function siguienteRonda() {
    detenerVoz()
    setRonda((r) => r + 1)
  }

  return {
    ronda,
    resultados,
    resultado: resultados[ronda] as ResultadoRonda | undefined,
    narracion: narraciones[ronda] as Narracion | undefined,
    marcador: contarVictorias(resultados.filter(Boolean)),
    esUltima: ronda === TOTAL_RONDAS - 1,
    error,
    reintentar: () => jugarRonda(ronda),
    siguienteRonda,
  }
}
