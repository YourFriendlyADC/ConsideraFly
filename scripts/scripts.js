// import { airports, airports_test } from './airports.js';
import { calculateMidpoint } from './midpoint.js';
import { haversine } from './haversine.js';
import airports from './airports.json' assert { type: 'json' };
import airportsTest from './airportsTest.json' assert { type: 'json' };
let objecto = airportsTest;
// const airports_keys = Object.keys(airports_test);

// variable para controla modo de mapa (Completo o Ejemplo)
let fullMap = false;

// const objecto = JSON.parse(json);
// console.log(`${objecto["COK"][0][0]}, ${objecto["COK"][0][1]}`);

// for (let key in objecto) {
//   console.log(`${objecto[key][0][2]}`);
// }

// key para Cok 
// objecto[key] para la info

// Colores para aristas y pesos
let colors = ['#012a4a', '#014f86', '#240046', '#800f2f', '#c9184a', '#004b23', '#4f772d', '#a63c06', '#eeba0b'];

// Color de aristas
let currentColor1 = 0;
// Color de pesos
let currentColor2 = 0;

/* Pruebas */

// alert(objecto["AAE"][1][0][6]);


/*
ANOTACIONES
Cambiar los airports_test por airports (excepto
el del import) para ver todos los viajes
*/

function launchMap(){

  // Mapa
  let map = new google.maps.Map(document.getElementById('map'),{
    zoom: 3,
    center: {lat: 26.618654524207184, lng: -16.779351168567},
    mapTypeControl: false,
    mapTypeId: 'roadmap',
    streetViewControl: false,
    fullscreenControl: false,
    zoomControlOptions: {
      zoomInLabel: "Zoom In",
      zoomOutLabel: "Zoom Out",
    },
    styles: [{
      featureType: 'all',
      elementType: 'labels',
      stylers: [
      { visibility: 'off' }
      ]
    }, {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
      { color: '#6992d6' }
      ]
    }, {
      featureType: 'landscape',
      elementType: 'geometry',
      stylers: [
      { color: '#93d1c6' }
      ]
    }]
  });

  // Marcadores de Origen
  for (let key in objecto) {

    // Marcador
    let marker = new google.maps.Marker({
      // position: {lat: airports_test[airports_keys[key]][0][0], lng: airports_test[airports_keys[key]][0][1]},
      position: {lat: objecto[key][0][0], lng: objecto[key][0][1]},
      map: map,
      icon: {url: '../images/marker.png',
        scaledSize: new google.maps.Size(30, 30)}
    });

    // Ventana de información
    let infoWindow = new google.maps.InfoWindow({
      content: `<div class="info-card">
      <p>${key}</p>
      <p class="info-card-airport">${objecto[key][0][2]}</p>
      <p>${objecto[key][0][3]}, ${objecto[key][0][4]}</p>
      <p class="info-card-coords">${objecto[key][0][0]}, ${objecto[key][0][1]}</p>
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
    for (let i = 0; i < objecto[key][1].length - 1; i++) {

      // Nodos adyacentes
      let markerAd = new google.maps.Marker({
        position: {lat: objecto[key][1][i][1], lng: objecto[key][1][i][2]},
        map: map,
        icon: {url: '../images/marker.png',
          scaledSize: new google.maps.Size(30, 30)}
      });

      // Ventana de información
      let infoWindow = new google.maps.InfoWindow({
        content: `<div class="info-card">
        <p>${objecto[key][1][i][0]}</p>
        <p class="info-card-airport">${objecto[key][1][i][3]}</p>
        <p>${objecto[key][1][i][4]}, ${objecto[key][1][i][5]}</p>
        <p class="info-card-coords">${objecto[key][1][i][1]}, ${objecto[key][1][i][2]}</p>
        </div>`
      });
    
      // Animación al hacer Hover
      markerAd.addListener('mouseover', function(){
        infoWindow.open(map, markerAd);
      });
    
      markerAd.addListener('mouseout', function(){
        infoWindow.close();
      });

      // Aristas
      let line = new google.maps.Polyline({
        path: [{lat: objecto[key][0][0], lng: objecto[key][0][1]}, {lat: objecto[key][1][i][1], lng: objecto[key][1][i][2]}],
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
      let dist_label = calculateMidpoint(objecto[key][0][0], objecto[key][0][1], objecto[key][1][i][1], objecto[key][1][i][2]);

      // Dibujo del peso en la arista
      const label = new CustomLabel(map, line, `${objecto[key][1][i][6].toFixed(1)} km`, { lat: dist_label[0] + 1.75, lng: dist_label[1] }); // Set label position
    }
  }
}

// Zooms
function zoomIn() {
  map.setZoom(map.getZoom() + 1);
}

function zoomOut() {
  map.setZoom(map.getZoom() - 1);
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
document.addEventListener('DOMContentLoaded', function() {
  // launchMap();

  // const changeDataButton = document.getElementById('changeDataButton');

  //   changeDataButton.addEventListener('click', function() {
  //       if (dataUrl === 'airportsTest.json') {
  //           dataUrl = 'airports.json'; // Cambiar a la nueva URL
  //       } else {
  //           dataUrl = 'airportsTest.json'; // Volver a la URL original
  //       }

  //       // Volver a lanzar el mapa con la nueva URL
  //       launchMap();
  //   });

  //   // Lanzar el mapa por primera vez con la URL inicial
  //   launchMap();

    let button = document.getElementById('mode-button');
    button.addEventListener('click', function() {
      // Cambio de modo
      if (this.classList.contains('clicked') & objecto == airports) {
        this.classList.remove('clicked');
        this.innerHTML = 'Fresh Mode: ON';
        this.style.backgroundColor = '#fff';
        this.style.color = '#27276e';
        objecto = airportsTest;
      } else if (!this.classList.contains('clicked') & objecto == airportsTest) {
        this.classList.add('clicked');
        this.innerHTML = 'Fresh Mode:  OFF';
        this.style.backgroundColor = '#27276e';
        this.style.color = '#fff';
        objecto = airports;
      }

      // Reiniciar el mapa
      launchMap();
    });

    launchMap();
});