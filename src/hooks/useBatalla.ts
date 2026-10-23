import { useCallback, useEffect, useRef, useState } from 'react'
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
 * El ganador queda en secreto hasta que la narración termina de escribirse y de leerse.
 */
export function useBatalla(bandoA: Bando, bandoB: Bando) {
  const [ronda, setRonda] = useState(0)
  const [resultados, setResultados] = useState<ResultadoRonda[]>([])
  const [narraciones, setNarraciones] = useState<Narracion[]>([])
  const [error, setError] = useState('')
  const [textoTerminado, setTextoTerminado] = useState(false)
  const [vozTerminada, setVozTerminada] = useState(false)
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

      const narracion = await narrarRonda({
        ronda: resultado,
        nombreBandoA: bandoA.nombre,
        nombreBandoB: bandoB.nombre,
        estrategiaA: bandoA.estrategia,
        estrategiaB: bandoB.estrategia,
      })
      setNarraciones((previas) => conValor(previas, indice, narracion))
      void leerEnVozAlta(narracion.texto).then(() => setVozTerminada(true))
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

  const revelada = Boolean(resultados[ronda]) && textoTerminado && vozTerminada

  useEffect(() => {
    if (revelada) sonarGolpeYVictoria()
  }, [revelada])

  const terminarTexto = useCallback(() => setTextoTerminado(true), [])

  function siguienteRonda() {
    detenerVoz()
    setTextoTerminado(false)
    setVozTerminada(false)
    setRonda((r) => r + 1)
  }

  return {
    ronda,
    resultados,
    /** `true` en cuanto el cálculo terminó, aunque el ganador siga en secreto. */
    calculada: Boolean(resultados[ronda]),
    /** Solo existe cuando ya se reveló el ganador. */
    resultado: revelada ? resultados[ronda] : undefined,
    narracion: narraciones[ronda] as Narracion | undefined,
    terminarTexto,
    marcador: contarVictorias(resultados.filter((r, i) => r && (i < ronda || revelada))),
    esUltima: ronda === TOTAL_RONDAS - 1,
    error,
    reintentar: () => jugarRonda(ronda),
    siguienteRonda,
  }
}
