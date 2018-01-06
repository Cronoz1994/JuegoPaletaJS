
var canvas      = document.getElementById('canvas');
var contexto    = canvas.getContext('2d');
var xPelota     = canvas.width / 2;
var yPelota     = canvas.height - 30;
var colorPelota = "#0095DD";
var radioPelota = 10;
var dxPelota    = 2;
var dyPelota    = -1.5;

setInterval(dibujar, 10);

function dibujar() {
  contexto.clearRect(0, 0, canvas.width, canvas.height);

  dibujarPelota();
}

function dibujarPelota() {
  contexto.beginPath();
  contexto.arc(xPelota, yPelota, radioPelota, 0, Math.PI*2);
  contexto.fillStyle = colorPelota;
  contexto.fill();
  contexto.closePath();

  if (xPelota + dxPelota > canvas.width - radioPelota ||
      xPelota + dxPelota < radioPelota) {
    cambiarColorPelota();
    dxPelota = -dxPelota;
  }

  if (yPelota + dyPelota > canvas.height - radioPelota  ||
      yPelota + dyPelota < radioPelota) {
    cambiarColorPelota();
    dyPelota = -dyPelota;
  }


  xPelota += dxPelota;
  yPelota += dyPelota;
}

function cambiarColorPelota() {
  colorPelota = obtenerColorAleatorio();
}

function obtenerColorAleatorio() {
  var valoresHexa    = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];
  var colorAleatorio = '#';
  var indiceAlatorio = 0;

  for (var i = 0; i < 6; i++) {
    indiceAlatorio = obtenerNumAleatorio(0, valoresHexa.length);
    colorAleatorio += valoresHexa[indiceAlatorio];
  }
  
  return colorAleatorio;
}

function obtenerNumAleatorio(NumMin, NumMax) {
  return Math.round(Math.random() * (NumMax - NumMin) + NumMin);
}
