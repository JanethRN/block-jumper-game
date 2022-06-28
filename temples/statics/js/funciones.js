//le definimos un ancho de 2000 al lienzo
var canvasWidth = 2000;
//le definimos una altura de 600 al lienzo
var canvasHeight = 600;

//creamos la funcion para el juego, la cual es llamada en el body de nuestro html
function startGame() {
    //iniciamos nuestro gamecanvas
    gameCanvas.start();
}
var gameCanvas = {
    //creamos el elemento canvas
    canvas: document.createElement("canvas"),
    //iniciamos la función
   
    start: function () {
         /*controlaremos el tamaño de canvas
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