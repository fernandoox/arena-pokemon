/**
 * Espera un tiempo antes de continuar.
 * @param ms Milisegundos de espera.
 */
export function esperar(ms: number): Promise<void> {
  return new Promise((resolver) => setTimeout(resolver, ms))
}
