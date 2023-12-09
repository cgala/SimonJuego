var state = "start";
var secuence = [];
var level = 0;
var countBtn = 0;
var nextColor = 0;
var nextButton = [];
var indexOneSecuence = 0; // haciendo referencia al indice de mi secuencia


var title = document.getElementById('title');
var red = document.getElementById('red');
var green = document.getElementById('green');
var blue = document.getElementById('blue');
var yellow = document.getElementById('yellow');

var btn = [red, green, blue, yellow];

document.addEventListener('keypress', startGame);
red.addEventListener('click', buttonPress);
green.addEventListener('click', buttonPress);
blue.addEventListener('click', buttonPress);
yellow.addEventListener('click', buttonPress);

// red.addEventListener('click', buttonCount);
// green.addEventListener('click', buttonCount);
// blue.addEventListener('click', buttonCount);
// yellow.addEventListener('click', buttonCount);





function startGame() {
  if (state === 'start' || state === 'gameover') {
    level = 0;
    countBtn = 0;
    nextColor = 0;
    nextButton = [];
    indexSecuence = 0;
    secuence = [];
    newLevel();
   
  }
}

function newLevel() {
  state = 'gaming-now';
  setTimeout(() => {
    level = level + 1;
    title.innerText = 'Nivel ' + level;

    //nextColor contiene un numero random entre 1 a 4
    nextColor = Math.floor(Math.random() * 4);
    //nextButton tendra el color del boton
    nextButton = btn[nextColor];

    lightButton(nextButton);
    //guardo en el array patron el color del boton para generear la secuencia
    secuence.push(nextButton);
    state = "esperando el click";
  
    indexSecuence = 0;
  }, 2000);
  
}



//lightButton funcion para iluminar el boton y apagarlo pasado 1 segundo
function lightButton(button) {
  button.classList.add('active');
  setTimeout(() => {
    button.classList.remove('active');
  },500);
}
  
function buttonPress(event){
  if (state === "esperando el click") {
    btnPress = event.target;
    if (btnPress === secuence[indexSecuence] ) {
      indexSecuence = indexSecuence + 1;

      lightButton(btnPress); // ilumino el boton precionado

      if (indexSecuence === secuence.length) {
        newLevel();
      }
    }else{
      state="gameover";
      title.innerText = "Perdiste, vuelve a intentar!";
      startGame();
    }
   
  }
}



function buttonCount(){
  countBtn = countBtn+1;
}




//console.clear();
