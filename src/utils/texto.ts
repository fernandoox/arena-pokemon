/**
 * Convierte un nombre de PokéAPI en uno legible.
 * @example formatearNombre('mr-mime') // 'Mr Mime'
 */
export function formatearNombre(nombre: string): string {
  return nombre
    .split('-')
    .map((parte) => parte.charAt(0).toUpperCase() + parte.slice(1))
    .join(' ')
}

/**
 * Pasa a minúsculas y quita acentos para comparar textos sin importar cómo se escribieron.
 * @example normalizarTexto('IGNÓRA') // 'ignora'
 */
export function normalizarTexto(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
}

/**
 * Divide un párrafo en oraciones terminadas en `.`, `!` o `?`.
 * @example dividirEnOraciones('¡Hola! ¿Listos?') // ['¡Hola!', '¿Listos?']
 */
export function dividirEnOraciones(texto: string): string[] {
  const oraciones = texto.match(/[^.!?]+[.!?]+|[^.!?]+$/g) ?? [texto]
  return oraciones.map((o) => o.trim()).filter(Boolean)
}
