import { useState } from 'react'
import { sonarFanfarria, sonarInicio } from './audio/efectos'
import { Batalla } from './components/batalla/Batalla'
import { ControlesAudio } from './components/comunes/ControlesAudio'
import { PantallaFinal } from './components/final/PantallaFinal'
import { PantallaRegistro } from './components/registro/PantallaRegistro'
import type { Bando, ResultadoRonda } from './types'

type Fase = 'registro' | 'batalla' | 'final'

const bandoVacio = (): Bando => ({
  nombre: '',
  pokemon: [null, null, null],
  estrategia: '',
  listo: false,
})

/** Controla el flujo de pantallas: registro → batalla → final → registro. */
export default function App() {
  const [fase, setFase] = useState<Fase>('registro')
  const [bandoA, setBandoA] = useState(bandoVacio)
  const [bandoB, setBandoB] = useState(bandoVacio)
  const [resultados, setResultados] = useState<ResultadoRonda[]>([])

  function iniciarBatalla() {
    sonarInicio()
    setFase('batalla')
  }

  function terminarBatalla(finales: ResultadoRonda[]) {
    setResultados(finales)
    setFase('final')
    sonarFanfarria()
  }

  function nuevaBatalla() {
    setBandoA(bandoVacio())
    setBandoB(bandoVacio())
    setResultados([])
    setFase('registro')
  }

  return (
    <>
      <ControlesAudio />
      {fase === 'registro' && (
        <PantallaRegistro
          bandoA={bandoA}
          bandoB={bandoB}
          onCambioA={setBandoA}
          onCambioB={setBandoB}
          onIniciar={iniciarBatalla}
        />
      )}
      {fase === 'batalla' && (
        <Batalla bandoA={bandoA} bandoB={bandoB} onTerminar={terminarBatalla} />
      )}
      {fase === 'final' && (
        <PantallaFinal
          bandoA={bandoA}
          bandoB={bandoB}
          resultados={resultados}
          onNuevaBatalla={nuevaBatalla}
        />
      )}
    </>
  )
}
