/** Dirección base de PokéAPI (pública, sin llave). */
export const URL_BASE = 'https://pokeapi.co/api/v2'

/**
 * Descarga un JSON.
 * @param url Dirección completa.
 * @throws Error si la respuesta no es 2xx.
 */
export async function pedirJson<T>(url: string): Promise<T> {
  const respuesta = await fetch(url)
  if (!respuesta.ok) {
    throw new Error(`PokéAPI respondió ${respuesta.status} para ${url}`)
  }
  return respuesta.json() as Promise<T>
}

/**
 * Envuelve una función asíncrona para que cada clave se descargue una sola vez.
 * Si la descarga falla, se olvida para poder reintentar.
 * @param cargar Función que obtiene el valor de una clave.
 */
export function conCache<T>(cargar: (clave: string) => Promise<T>) {
  const cache = new Map<string, Promise<T>>()

  return (clave: string): Promise<T> => {
    const guardado = cache.get(clave)
    if (guardado) return guardado

    const promesa = cargar(clave)
    promesa.catch(() => cache.delete(clave))
    cache.set(clave, promesa)
    return promesa
  }
}
