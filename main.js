
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
var red = document.getElementById('red');
var green = document.getElementById('green');
var blue = document.getElementById('blue');
var yellow = document.getElementById('yellow');

var btn = [red, green, blue, yellow];

//storageArray contendra un array de strings que anteriormente eran objetos
var storageArray = [];

jugar.addEventListener('click', InicioJuego);
red.addEventListener('click', validador);
green.addEventListener('click', validador);
blue.addEventListener('click', validador);
yellow.addEventListener('click', validador);

//asigno eventos cuando ingresa el mouse al boton
red.addEventListener('mouseenter', mouseEnter);
green.addEventListener('mouseenter', mouseEnter);
blue.addEventListener('mouseenter', mouseEnter);
yellow.addEventListener('mouseenter', mouseEnter);
//signo eventos cuando el mouse sale del boton

red.addEventListener('mouseout', mouseOut);
green.addEventListener('mouseout', mouseOut);
blue.addEventListener('mouseout', mouseOut);
yellow.addEventListener('mouseout', mouseOut);

function mouseEnter(){
  if (this.classList.contains('activeMouseEnter')){
    this.classList.remove('activeMouseEnter');
  }else{
    this.classList.add('activeMouseEnter');
  }
}
function mouseOut(){
  if (this.classList.contains('activeMouseEnter')){
    this.classList.remove('activeMouseEnter');
  }else{
    this.classList.add('activeMouseEnter');
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
    title.innerText = "Perdiste :( vuelve a intentar!!! "






    //ASIGNO EL PUNTAJE OBTENIDO A MI OBJETO PUNTAJES, EL CUAL SE USA PARA EL LOCAL STORAGE
    puntaje.puntos = contPuntos;
    //SETEO EL LOCALSTORAGE
    puntajeString = JSON.stringify(puntaje);
    storageArray.push(puntajeString)
    localStorage.setItem('Puntajes', storageArray);






    //muestro el modal al perder
    modal.style.display = 'flex';
    h2Modal.innerText = "Puntaje: " + contPuntos;
    contPuntos = 0;
  }

  if (secuenciaBtnCapturado.length == secuenciaBtnRandom.length && estado == "acertaste") {
    indiceSecuenciaBtnRandom = 0;
    secuenciaBtnCapturado = [];
    nuevoNivel();
  }
} 


//Script para el modal
var showModalBtn = document.getElementById('showModalBtn');
var closeModalBtn = document.getElementById('closeModalBtn');
var closeModalBtn2 = document.getElementById('closeModalBtn2');
var modal = document.getElementById('myModal');
var modalName = document.getElementById('myModalName');


showModalBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
});

closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
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


// Seccion LocalStorage
//puntajeString = JSON.stringify(puntaje);
//console.log(puntajeString);
