import { airports, airports_test } from './airports.js';
import { calculateMidpoint } from './midpoint.js';
import { haversine } from './haversine.js';
const airports_keys = Object.keys(airports_test);

// Colores para aristas y pesos
let colors = ['#012a4a', '#014f86', '#240046', '#800f2f', '#c9184a', '#004b23', '#4f772d', '#a63c06', '#eeba0b'];

// Color de aristas
let currentColor1 = 0;
// Color de pesos
let currentColor2 = 0;

/*
ANOTACIONES
Cambiar los airports_test por airports (excepto el del import)
para ver todos los viajes
*/

function launchMap(){

  // Mapa
  let map = new google.maps.Map(document.getElementById('map'),{
    zoom: 3,
    center: {lat: 26.618654524207184,  lng: -16.779351168567},
  });

  // Marcadores
  for (let key in airports_keys) {

    // Marcador
    let marker = new google.maps.Marker({
      position: {lat: airports_test[airports_keys[key]][0][0], lng: airports_test[airports_keys[key]][0][1]},
      map: map,
      icon: {url: '../images/marker.png',
        scaledSize: new google.maps.Size(30, 30)}
    });

    // Ventana de información
    let infoWindow = new google.maps.InfoWindow({
      content: `<div class="info-card">
      <p>${airports_keys[key]}</p>
      <p class="info-card-airport">${airports_test[airports_keys[key]][0][2]}</p>
      <p>${airports_test[airports_keys[key]][0][3]}, ${airports_test[airports_keys[key]][0][4]}</p>
      <p class="info-card-coords">${airports_test[airports_keys[key]][0][0]}, ${airports_test[airports_keys[key]][0][1]}</p>
      </div>`
    });

    // Animación al hacer Hover
    marker.addListener('mouseover', function(){
      infoWindow.open(map, marker);
    });

    marker.addListener('mouseout', function(){
      infoWindow.close();
    });
    
    // Aristas
    for (let i = 0; i < airports_test[airports_keys[key]][1].length - 1; i++) {
      let line = new google.maps.Polyline({
        path: [{lat: airports_test[airports_keys[key]][0][0], lng: airports_test[airports_keys[key]][0][1]}, {lat: airports_test[airports_keys[key]][1][i][1], lng: airports_test[airports_keys[key]][1][i][2]}],
        geodesic: true,
        strokeColor: `${colors[currentColor1]}`,
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });
      // Cambio de color
      currentColor1 = (currentColor1 == 8) ? 0 : currentColor1 + 1;
  
      line.setMap(map);

      // Pesos
      // Calculo de la mitad del camino
      let dist_label = calculateMidpoint(airports_test[airports_keys[key]][0][0], airports_test[airports_keys[key]][0][1], airports_test[airports_keys[key]][1][i][1], airports_test[airports_keys[key]][1][i][2]);

      // Calculo de la distancia entre los vértices
      let dist_bet = haversine(airports_test[airports_keys[key]][0][0], airports_test[airports_keys[key]][0][1], airports_test[airports_keys[key]][1][i][1], airports_test[airports_keys[key]][1][i][2]);

      // Dibujo del peso en la arista
      const label = new CustomLabel(map, line, `${dist_bet.toFixed(1)} km`, { lat: dist_label[0] + 1.75, lng: dist_label[1] }); // Set label position
    }
  }
}

// Funcion de label del peso
function CustomLabel(map, line, labelText, position) {
  this.line = line;
  this.labelText = labelText;
  this.position = position;
  this.setMap(map);
}

CustomLabel.prototype = new google.maps.OverlayView();

CustomLabel.prototype.onAdd = function() {
  const div = document.createElement("div");
  div.className = "custom-label";
  div.innerHTML = this.labelText;
  div.style.position = "absolute";
  div.style.transform = "translate(-50%, -50%)";
  div.style.color = `${colors[currentColor2]}`;
  // Cambio de color
  currentColor2 = (currentColor2 == 8) ? 0 : currentColor2 + 1;
  div.style.fontSize = "1.25em";
  div.style.fontWeight = "500";
  const panes = this.getPanes();
  panes.overlayLayer.appendChild(div);
  this.div = div;
  this.draw();
};

CustomLabel.prototype.draw = function() {
  const overlayProjection = this.getProjection();
  const position = overlayProjection.fromLatLngToDivPixel(this.position);
  this.div.style.left = position.x + "px";
  this.div.style.top = position.y + "px";
};

// Carga de la página
document.addEventListener('DOMContentLoaded', function() {launchMap()});