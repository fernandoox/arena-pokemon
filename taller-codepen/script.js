// Paso 1: fetch
// TODO: agregar nombre pokemon y tipo y validar un pokemon no enctrado
const buscar = async () => {
  const nombre = document.getElementById('nombre').value
  const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`)
  const pokemon = await respuesta.json()
  document.getElementById('resultado').innerHTML = `
    <img src="${pokemon.sprites.front_default}">
  `
}

// Paso 2: Texto a voz
// TODO: cambiar lang a español MX
const hablar = () => {
  const texto = document.getElementById('texto').value
  const frase = new SpeechSynthesisUtterance(texto)
  frase.lang = 'en-US'
  speechSynthesis.speak(frase)
}

//Paso 3: Translator
// TODO: agregar input que capture el valor
const traducir = async () => {
  const traductor = await Translator.create({
    sourceLanguage: 'es',
    targetLanguage: 'en',
  })
  const resultado = await traductor.translate('¡Pikachu, yo te elijo!')
  console.log(resultado) // "Pikachu, I choose you!"
}
