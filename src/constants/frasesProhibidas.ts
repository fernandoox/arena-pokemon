/**
 * Patrones típicos de *prompt injection*: órdenes escondidas en un texto
 * para que la IA las obedezca. Se comparan contra texto normalizado
 * (minúsculas y sin acentos).
 *
 * `\b` marca inicio o fin de palabra: `/\bignor/` detecta "ignora",
 * "ignorar" e "ignore", y `/\beres\b/` no confunde "intereses".
 */
export const FRASES_PROHIBIDAS: { patron: RegExp; frase: string }[] = [
  { patron: /\bignor/, frase: 'ignora / ignore' },
  { patron: /\binstruc/, frase: 'instrucciones' },
  { patron: /\bsystem/, frase: 'system' },
  { patron: /\bdeclar\w*(\s+\w+){0,4}\s+ganador/, frase: 'declara ganador' },
  { patron: /\beres\b/, frase: 'eres' },
  { patron: /\bolvid/, frase: 'olvida' },
  { patron: /\bprompt/, frase: 'prompt' },
  { patron: /\bforget\b/, frase: 'forget' },
  { patron: /\byou are\b/, frase: 'you are' },
  { patron: /\bactua como\b/, frase: 'actúa como' },
]
