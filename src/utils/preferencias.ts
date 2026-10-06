// localStorage puede fallar (modo privado, permisos), así que todo va en try/catch.

/**
 * Lee una preferencia de sí/no guardada en el navegador.
 * @param clave Nombre de la preferencia.
 * @param porDefecto Valor si nunca se guardó o no se puede leer.
 */
export function leerPreferencia(clave: string, porDefecto: boolean): boolean {
  try {
    const valor = localStorage.getItem(clave)
    return valor === null ? porDefecto : valor === 'si'
  } catch {
    return porDefecto
  }
}

/**
 * Guarda una preferencia de sí/no; si falla, solo dura la sesión actual.
 * @param clave Nombre de la preferencia.
 * @param valor Valor a guardar.
 */
export function guardarPreferencia(clave: string, valor: boolean): void {
  try {
    localStorage.setItem(clave, valor ? 'si' : 'no')
  } catch {
    // Sin almacenamiento disponible: se ignora.
  }
}
