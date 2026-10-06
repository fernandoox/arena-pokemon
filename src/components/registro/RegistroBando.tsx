import { sonarAlerta, sonarListo } from '../../audio/efectos'
import { MAX_ESTRATEGIA, MAX_NOMBRE } from '../../constants/reglas'
import { detectarInyeccionEnBando } from '../../logic/inyeccion'
import { sumarStats, validarBando } from '../../logic/validacion'
import type { Bando, Lado, Pokemon } from '../../types'
import { AlertaHackeo } from './AlertaHackeo'
import { BuscadorPokemon } from './BuscadorPokemon'
import { PanelListo } from './PanelListo'
import { TotalStats } from './TotalStats'

interface Props {
  lado: Lado
  bando: Bando
  onCambio: (bando: Bando) => void
}

/** Formulario de un bando: nombre, 3 Pokémon en orden y estrategia. */
export function RegistroBando({ lado, bando, onCambio }: Props) {
  if (bando.listo) {
    return (
      <PanelListo
        lado={lado}
        nombre={bando.nombre}
        onEditar={() => onCambio({ ...bando, listo: false })}
      />
    )
  }

  const frasesSospechosas = detectarInyeccionEnBando(bando)
  const errores = validarBando(bando)

  /** Actualiza un texto y suena la alarma si acaba de aparecer una frase prohibida. */
  function cambiarTexto(campo: 'nombre' | 'estrategia', valor: string) {
    const nuevo = { ...bando, [campo]: valor }
    if (frasesSospechosas.length === 0 && detectarInyeccionEnBando(nuevo).length > 0) sonarAlerta()
    onCambio(nuevo)
  }

  function cambiarPokemon(indice: number, pokemon: Pokemon | null) {
    onCambio({ ...bando, pokemon: bando.pokemon.with(indice, pokemon) })
  }

  function confirmar() {
    sonarListo()
    onCambio({ ...bando, listo: true })
  }

  return (
    <section className={`panel-bando lado-${lado}`}>
      <h2>Bando {lado}</h2>

      <label className="campo">
        Nombre del bando
        <input
          type="text"
          value={bando.nombre}
          maxLength={MAX_NOMBRE}
          placeholder="Ej. Los Relámpagos"
          onChange={(e) => cambiarTexto('nombre', e.target.value)}
        />
      </label>

      <h3 className="subtitulo">Pokémon (en orden de pelea)</h3>
      <div className="lista-buscadores">
        {bando.pokemon.map((pokemon, i) => (
          <BuscadorPokemon
            key={i}
            posicion={i + 1}
            valor={pokemon}
            onCambio={(p) => cambiarPokemon(i, p)}
          />
        ))}
      </div>

      <TotalStats total={sumarStats(bando.pokemon)} />

      <label className="campo">
        Estrategia
        <textarea
          value={bando.estrategia}
          maxLength={MAX_ESTRATEGIA}
          rows={3}
          placeholder="¿Cómo va a pelear tu equipo?"
          onChange={(e) => cambiarTexto('estrategia', e.target.value)}
        />
        <span className="contador">
          {bando.estrategia.length} / {MAX_ESTRATEGIA}
        </span>
      </label>

      <AlertaHackeo frases={frasesSospechosas} />

      {errores.length > 0 && (
        <ul className="lista-errores">
          {errores.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      <button
        type="button"
        className="boton-grande"
        disabled={errores.length > 0}
        onClick={confirmar}
      >
        Confirmar bando
      </button>
    </section>
  )
}
