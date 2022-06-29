//le definimos un ancho de 2000 al lienzo
var canvasWidth = 2000;
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




//creamos la funcion para el juego, la cual es llamada en el body de nuestro html
function startGame() {
    //iniciamos nuestro gamecanvas
    gameCanvas.start();
    //llamamos la variable player y creamos un nuevo player
    player = new createPlayer(30, 30, 10);
    block = new createBlock();
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
        ctx = gameCanvas.context;
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    //creamos la función makeFall
    this.makeFall = function() {
            this.y += fallSpeed;
            fallSpeed += 0.1;
            //llamamos a la función stopPlayer
            this.stopPlayer();
    }
    //creamos la función stopPlayer
    this.stopPlayer = function() {
        var ground = canvasHeight - this.height;
        if (this.y > ground) {
            this.y = ground;
        }
    }
    //creamos la función jump
    this.jump = function() {
        if (isJumping) {
            this.y -= jumpSpeed;
            jumpSpeed += 0.3;
        }
    }
}

//función updatCanvas para borrar el lienxo y volver a dibujar el reproductor
function updateCanvas() {
    
     /*la segunda línea es para limpiar el lienzo y volver a dibujar el reproductor
     llamamos a nuestra variable de jugador y llamamos a nuestras funciones */

    ctx = gameCanvas.context;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    
    player.makeFall();
    player.draw();
    player.jump();
    
    block.draw();
    block.attackPlayer();
}
//creamos la función createBlock
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
    
    //creamos la función draw
    this.draw = function() {
        ctx = gameCanvas.context;
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, width, height);
    }
    //creamos la función attackPlayer
    this.attackPlayer = function() {
        this.x -= speed;
        this.returnToAttackPosition();
    }
    //creamos la función returnToAttackPosition
    this.returnToAttackPosition = function() {
        if (this.x < 0) {
            width = randomNumber(10, 50);
            height = randomNumber(50, 200);
            speed = randomNumber(4, 6);
            this.y = canvasHeight - height;
            this.x = canvasWidth;
            // Aumenta la puntuación si el bloque llegó al borde
            score++;
        }
    }
}
