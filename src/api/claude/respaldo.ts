import { ganadorYPerdedor } from '../../logic/ronda'
import type { Narracion, ResultadoRonda } from '../../types'
import { formatearNombre } from '../../utils/texto'

/** Narración genérica para que la batalla siga cuando la IA no responde. */
export function narracionRespaldo(ronda: ResultadoRonda): Narracion {
  const { ganador, perdedor } = ganadorYPerdedor(ronda)
  const g = formatearNombre(ganador.nombre)
  const p = formatearNombre(perdedor.nombre)

  return {
    texto: `¡La arena tiembla cuando ${g} y ${p} se miran frente a frente! Ambos lanzan sus mejores ataques y el público contiene la respiración. Al final, ${g} resiste el último golpe y se lleva la ronda ${ronda.numero}. ¡Qué combate!`,
    respaldo: true,
  }
}
