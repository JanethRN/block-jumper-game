//le definimos un ancho de 2000 al lienzo
var canvasWidth = 1528;
//le definimos una altura de 600 al lienzo
var canvasHeight = 600;

//creamos una variable jugador
var player;
//creamos una variable para la posicion del jugador
var playerYPosition = 200;

//creamos una variable y le definimos la velocidad de caída 
var fallSpeed = 0;
//creamos una variable denominada interval y llamamos a nuestra función updateCanvas() en esta variable
var interval = setInterval(updateCanvas,20);

//creamos una variable booleana llamada isJumping con valor false
var isJumping = false;

//creamos la variable jumpSpeed con valor 0
var jumpSpeed = 0;

//creamos la variable block
var block;

//crear la variable con una puntuación inicial de 0
var score = 0;
//creamos la variable para contener el scoreLabel
var scoreLabel;




//creamos la funcion para el juego, la cual es llamada en el body de nuestro html
function startGame() {
    //iniciamos nuestro gamecanvas
    gameCanvas.start();
    //llamamos la variable player y creamos un nuevo player
    player = new createPlayer(30, 30, 10);
    //llamamos nuestra función createBlock
    block = new createBlock();
    //le asignamos un valor a scoreLabel
    scoreLabel = new createScoreLabel(10,30);
}
var gameCanvas = {
    //creamos el elemento canvas
    canvas: document.createElement("canvas"),
    //iniciamos la función
    start: function () {
         /*controlaremos el tamaño de canvass
         llamamos a nuestra variable canvasWidth  para el ancho de nuestro lienzo
         llamamos a nuestra varable canvasHeight para la altura de nuestro lienzo
         en la tercera línea definimos el valor que definirá el dibujo en nuestro lienzo 
         la cuarta línea .insertBefore: es un método que inserta un nodo hijo antes de un hijo existente*/
        
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }
}
//función para crear un nuevo jugador y creamos las variables para el ancho, altura
function createPlayer(width, height, x) {
    /*controlaremos el tamaño del jugador
         llamamos a nuestra variable canvasWidth  para el ancho de nuestro lienzo
         llamamos a nuestra varable canvasHeight para la altura de nuestro lienzo
         en la tercera línea llamamos la variable x 
         la cuarta línea llamamos la variable y y le asignamos el la variable 
          playerYPosition: para la posición del jugador */
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = playerYPosition;
    
    //creamos la función draw
    this.draw = function() {
        /*aqui se manipula lo que es el cuadro del jugador
        en la segunda línea se determina un color
        en la tercera línea llamamos a nuestras variables:x, y, width(ancho), height(alto)*/ 
        ctx = gameCanvas.context;
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    //creamos la función makeFall
    this.makeFall = function() {
        /*hacemos una condición llamando a la variable isJumping que es booleana
        y determinamos la velociadad de caida del jugador, finalmente llamamos a nuestra función stopPlayer*/ 
        if (!isJumping) {
            this.y += fallSpeed;
            fallSpeed += 0.1;
             //llamamos a la función stopPlayer
             this.stopPlayer();
        }    
    }
    //creamos la función stopPlayer
    this.stopPlayer = function() {
        /*creamos una variable ground que es igual al ancho del lienzo y
        creamos una condicional llamando a nuestra variable y de que si es mayor que ground o igual*/
        var ground = canvasHeight - this.height;
        if (this.y > ground) {
            this.y = ground;
        }
    }
    //creamos la función jump
    this.jump = function() {
        /*llamamos nuestra variable y que inicia con valor 0*/
        if (isJumping) {
            this.y -= jumpSpeed;
            jumpSpeed += 0.3;
        }
    }
}
function createBlock() {
     /*creamos una variable para el ancho con números predeterminados
    creamos la variable con valor preseterminado para la altura
    creamos una variable con valor predeterminado para la velocidad
    
    en la cuarta línea llamamos a nuestra variable x y llamamos la anchura de nuestro lienzo
    en la quinta línea llamamos la variable y para la altura*/ 
    var width = randomNumber(10, 50);
    var height = randomNumber(10, 200);
    var speed = randomNumber(2, 6);
    
    this.x = canvasWidth;
    this.y = canvasHeight - height;
    
    //creamos función draw
    this.draw = function() {
        /*asignamos e color de los bloques y llamamos a nuestras variables: x, y, width(ancho), height(alto)*/ 
        ctx = gameCanvas.context;
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, width, height);
    }
    //creamos la función attaPlayer
    this.attackPlayer = function() {
        //velocidad
        this.x -= speed;
        //posición
        this.returnToAttackPosition();
    }
    //función returnToAttackPosition
    this.returnToAttackPosition = function() {
        /*damos una anchura, alto, velocidad*/ 
        if (this.x < 0) {
            width = randomNumber(10, 50);
            height = randomNumber(50, 200);
            speed = randomNumber(4, 6);
            this.y = canvasHeight - height;
            this.x = canvasWidth;
            // aumenta la puntuación si el bloque llegó al borde
            score++;
        }
    }
}

//función  detectCollision
function detectCollision() {
    /*esta función tiene una condicional de que si el jugador toca los bloques automáticamente
    se plantará el juego*/ 
    var playerLeft = player.x
    var playerRight = player.x + player.width;
    var blockLeft = block.x;
    var blockRight = block.x + block.width;
    
    var playerBottom = player.y + player.height;
    var blockTop = block.y;
    
    if (playerRight > blockLeft && 
        playerLeft < blockLeft && 
        playerBottom > blockTop) {
        
        gameCanvas.stop();
    }
}
//creamos la función createScoreLabel
function createScoreLabel(x, y) {
    this.score = 0;  
    this.x = x;
    this.y = y;
    this.draw = function() {
        ctx = gameCanvas.context;
        ctx.font = "25px Marker Felt";
        ctx.fillStyle = "black";
        ctx.fillText(this.text, this.x, this.y);
    }
}

//función updatCanvas para borrar el lienxo y volver a dibujar el reproductor
function updateCanvas() {
    detectCollision();
    
     /*la segunda línea es para limpiar el lienzo y volver a dibujar el reproductor
     llamamos a nuestra variable de jugador y llamamos a todas nuestras funciones */

    ctx = gameCanvas.context;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    
    player.makeFall();
    player.draw();
    player.jump();
    
    block.draw();
    block.attackPlayer();

    scoreLabel.text = 'SCORE: ' + score;
    scoreLabel.draw();
}

//funciones con valores aleatorios
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

//reseteamos el juego
function resetJump() {
    jumpSpeed = 0;
    isJumping = false;
}

document.body.onkeyup = function(e) {
    if (e.keyCode == 32) {
        isJumping = true;
        setTimeout(function() { resetJump(); }, 1000);
    }
}


