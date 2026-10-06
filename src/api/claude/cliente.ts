import Anthropic from '@anthropic-ai/sdk'

/** Modelo de Claude; se puede cambiar con `VITE_CLAUDE_MODEL` en `.env`. */
export const MODELO = import.meta.env.VITE_CLAUDE_MODEL || 'claude-opus-5-5'

const LLAVE = import.meta.env.VITE_ANTHROPIC_API_KEY

/**
 * Cliente de Claude, o `null` si no hay llave en `.env`.
 *
 * `dangerouslyAllowBrowser` es obligatorio para usar el SDK en el navegador:
 * la llave queda visible para cualquiera que abra las herramientas de desarrollo.
 * Aceptable para una demo en clase; en producción la llave va en un servidor.
 */
export const cliente = LLAVE
  ? new Anthropic({
      apiKey: LLAVE,
      dangerouslyAllowBrowser: true,
      timeout: 30_000,
      maxRetries: 1,
    })
  : null
