const COLORES = ['#ffcb05', '#e3350d', '#3b82f6', '#22c55e', '#ffffff']
const CANTIDAD = 60

/**
 * Papelitos que caen sin fin detrás del contenido.
 * El retraso negativo hace que cada uno empiece "a medio camino",
 * así la pantalla se llena desde el primer momento.
 */
export function Confeti() {
  return (
    <div className="confeti" aria-hidden="true">
      {Array.from({ length: CANTIDAD }, (_, i) => (
        <span
          key={i}
          style={{
            left: `${(i * 37) % 100}%`,
            background: COLORES[i % COLORES.length],
            animationDuration: `${2.5 + (i % 5) * 0.5}s`,
            animationDelay: `-${(i % 12) * 0.35}s`,
          }}
        />
      ))}
    </div>
  )
}
