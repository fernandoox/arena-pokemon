import { INSTRUCCIONES_NARRADOR } from '../../constants/narrador'
import type { DatosNarracion, Narracion } from '../../types'
import { cliente, MODELO } from './cliente'
import { construirPrompt } from './prompt'
import { narracionRespaldo } from './respaldo'

/**
 * Pide a Claude una narración épica de una ronda ya decidida.
 *
 * Nunca lanza error: sin llave, sin internet o si la IA se niega,
 * devuelve la narración de respaldo para que la batalla continúe.
 */
export async function narrarRonda(datos: DatosNarracion): Promise<Narracion> {
  if (!cliente) {
    console.warn('No hay VITE_ANTHROPIC_API_KEY: se usa la narración de respaldo.')
    return narracionRespaldo(datos.ronda)
  }

  try {
    const respuesta = await cliente.beta.messages.create({
      model: MODELO,
      max_tokens: 16000,
      system: INSTRUCCIONES_NARRADOR,
      messages: [{ role: 'user', content: construirPrompt(datos) }],
      // Opus 5.5 siempre razona; "low" basta para un párrafo y responde más rápido.
      output_config: { effort: 'low' },
      // Si el modelo se niega por un filtro de seguridad, la API reintenta con otro.
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
    })

    if (respuesta.stop_reason === 'refusal') throw new Error('Claude se negó a narrar')

    const texto = respuesta.content
      .map((bloque) => (bloque.type === 'text' ? bloque.text : ''))
      .join('')
      .trim()
    if (!texto) throw new Error('Claude respondió vacío')

    return { texto, respaldo: false }
  } catch (error) {
    console.error('Error al narrar con Claude:', error)
    return narracionRespaldo(datos.ronda)
  }
}
