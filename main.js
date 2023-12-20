var nivel = 0;
var btnRandom = 0;
var btnIngresado = 0;
var secuenciaBtnRandom = [];
var secuenciaBtnCapturado = [];
var indiceSecuenciaBtnCapturado = 0;
var indiceSecuenciaBtnRandom = 0;
var intervalID = 0;
var indice= 0;
var estado = "";
var contPuntos = 0;
var jugar = document.getElementById('jugar');
var title = document.getElementById('title');
var h2Modal = document.getElementById('h2Modal');
var pModal = document.getElementById('pModal');
var rojo = document.getElementById('rojo');
var verde = document.getElementById('verde');
var azul = document.getElementById('azul');
var amarillo = document.getElementById('amarillo');
var btn = [rojo, verde, azul, amarillo];
//storageArray contendra un array de strings que anteriormente eran objetos
var storageArray = [];
jugar.addEventListener('click', InicioJuego);
rojo.addEventListener('click', validador);
verde.addEventListener('click', validador);
azul.addEventListener('click', validador);
amarillo.addEventListener('click', validador);
//asigno eventos cuando ingresa el mouse al boton
rojo.addEventListener('mouseenter', mouseEnter);
verde.addEventListener('mouseenter', mouseEnter);
azul.addEventListener('mouseenter', mouseEnter);
amarillo.addEventListener('mouseenter', mouseEnter);
//signo eventos cuando el mouse sale del boton
rojo.addEventListener('mouseout', mouseOut);
verde.addEventListener('mouseout', mouseOut);
azul.addEventListener('mouseout', mouseOut);
amarillo.addEventListener('mouseout', mouseOut);
function mouseEnter(){
  if (this.classList.contains('activarMouseEnter')){
    this.classList.remove('activarMouseEnter');
  }else{
    this.classList.add('activarMouseEnter');
  }
}
function mouseOut(){
  if (this.classList.contains('activarMouseEnter')){
    this.classList.remove('activarMouseEnter');
  }else{
    this.classList.add('activarMouseEnter');
  }
}
function InicioJuego() {
   nivel = 0;
   btnRandom = 0;
   btnIngresado = 0;
   secuenciaBtnRandom = [];
   secuenciaBtnCapturado = [];
   indiceSecuenciaBtnCapturado = 0;
   indiceSecuenciaBtnRandom = 0;
   intervalID = 0;
   indice=0;
   estado = "";
  nuevoNivel();
}
//var nivel = 0;
//var intervalID = 0;
function nuevoNivel() {
  nivel = nivel + 1;
  title.innerText = "Nivel " + nivel + " Puntos: " + contPuntos;
  pushRandomSecuencia();
  intervalID = setInterval(mostrarSiguienteColor, 2000);
  //en este instante se estaria ejecutando la funcion pushBtnIngresado que se invoca por un evenlistener en los botones 
}
// var btnRandom = 0;
// var secuenciaBtnRandom = [];
function pushRandomSecuencia() {
  random = Math.floor(Math.random() * 4); // random entre 0-3
  btnRandom= btn[random]; // asigno un indice random al array de botones creado
  secuenciaBtnRandom.push(btnRandom);// el array almacenara los botones random generados en el juego de forma ordenada representando la secuencia de borones a clickear 
}
function LuzBtn(btnRandom) {
  btnRandom.classList.add('active');
  setTimeout(() => {
    btnRandom.classList.remove('active');
  },500);
}
//var indice = 0;
function mostrarSiguienteColor() {
  if (indice < secuenciaBtnRandom.length) {
    LuzBtn(secuenciaBtnRandom[indice]);
    console.log("INDICE RANDOM: " + indice);
    console.log(secuenciaBtnRandom[indice]);
    indice++;
  } else {
    clearInterval(intervalID); // Detener la ejecución de setInterval cuando se hayan mostrado todos los elementos
  }
}
//var indiceSecuenciaBtnRandom = 0;
function validador(event){
  btnIngresado = event.target;
  secuenciaBtnCapturado.push(btnIngresado);
  if (btnIngresado == secuenciaBtnRandom[indiceSecuenciaBtnRandom]) {
    estado="acertaste";
    indiceSecuenciaBtnRandom = indiceSecuenciaBtnRandom + 1;
    contPuntos = contPuntos +1;
  }else{
    estado = "no acertaste";
    console.log("no acertaste");
    indiceSecuenciaBtnRandom = 0;
    InicioJuego();
    title.innerText = puntaje.nombre + " :( vuelve a intentar!!! ";
    //ASIGNO EL PUNTAJE OBTENIDO A MI OBJETO PUNTAJES, EL CUAL SE USA PARA EL LOCAL STORAGE
    puntaje.puntos = contPuntos;
    //SETEO EL LOCALSTORAGE
    puntajeString = JSON.stringify(puntaje);
    storageArray.push(puntajeString)
    localStorage.setItem('Puntajes', storageArray);
    //muestro el modal al perder
    modal.style.display = 'flex';
    var nombre = document.getElementById('nombre');
    nombreGuardado = nombre.value;
    h2Modal.innerText = "Jugador/ra: " + nombreGuardado + " \nPuntaje: " + contPuntos;
    contPuntos = 0;
  }
  if (secuenciaBtnCapturado.length == secuenciaBtnRandom.length && estado == "acertaste") {
    indiceSecuenciaBtnRandom = 0;
    secuenciaBtnCapturado = [];
    nuevoNivel();
  }
} 
//Script para el modal
var modal = document.getElementById('miModal');
var historial = document.getElementById('hijo2');
var verHistorial = document.getElementById('verHistorial');
var cerrarModalBtn = document.getElementById('cerrarModalBtn');
var cerrarHistorial = document.getElementById('cerrarHistorial');
cerrarModalBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});
verHistorial.addEventListener('click', () => {
  historial.style.display = 'flex';
  //muestro el storage co el historial de partidas
  var storage = localStorage.getItem('Puntajes');
  var arrayStorage = `[${storage}]`
  var storage = JSON.parse(arrayStorage);
  //console.log(storage[0].nombre +" " +storage[0].puntos);
  // Obtener el elemento ul por su ID
  var ul = document.getElementById('miLista');
  // Limpiar la lista antes de agregar nuevos elementos
  ul.innerHTML = '';
  // Iterar sobre el array de objetos
  for (var i = 0; i < storage.length; i++) {
    // Crear un elemento de lista (li)
    var li = document.createElement('li');
    // Agregar el contenido del objeto al elemento de lista
    li.textContent = "Nombre: " + storage[i].nombre + ", Puntos: " + storage[i].puntos;
    // Agregar el elemento de lista a la lista no ordenada
    ul.appendChild(li);
  }
});
cerrarHistorial.addEventListener('click', () => {
  historial.style.display = 'none';
});
//objeto para el localStorage
var puntaje ={
  nombre : "",
  puntos: 0
}
//script para capturar el nombre del formulario
var nombreGuardado = "";
function guardarNombre() {
  var nombre = document.getElementById('nombre');
  nombreGuardado = nombre.value;
  console.log("Nombre guardado:", nombreGuardado);
  //LLENO MI OBJETO PUNTAJE CON EL NOMBRE INGRESADO
  puntaje.nombre=nombreGuardado;
  console.log(puntaje)
}
//validador del nombre
function esValidoNombre(name) {
  // Validar que el nombre solo contenga letras y números
  var regex = /^[a-zA-Z0-9]+$/;
  return regex.test(name);
}
function registrar() {
  var name = document.getElementById('nombre').value;
  // Validar nombre
  if (!esValidoNombre(name)) {
      alert('Por favor, ingrese un nombre alfanumérico válido.');
      return;
  }
  else{
    modal.style.display = 'flex';
    var nombre = document.getElementById('nombre');
    nombreGuardado = nombre.value;
    h2Modal.innerText = "Click en Jugar! " + nombreGuardado;
  }
}