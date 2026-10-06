import { LIMITE_STATS } from '../../constants/reglas'

interface Props {
  total: number
}

/** Suma de estadísticas en vivo con barra; se pone roja al pasarse del límite. */
export function TotalStats({ total }: Props) {
  const porcentaje = Math.min(total / LIMITE_STATS, 1) * 100

  return (
    <div className={`total-stats ${total > LIMITE_STATS ? 'excedido' : ''}`}>
      <span>
        Suma de stats: <strong>{total}</strong> / {LIMITE_STATS}
      </span>
      <span className="barra-total">
        <span style={{ width: `${porcentaje}%` }} />
      </span>
    </div>
  )
}
