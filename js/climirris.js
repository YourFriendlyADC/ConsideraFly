const apiKey = '92e2a69a58f7bf550673580a075891ab';
const ciudad = 'Barranquilla';
const pais = 'CO';

// URL de la API de OpenWeatherMap
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}&units=metric`;

        // Elementos donde se mostrará la información del tiempo
        const temperatureElement = document.getElementById('temperature');
        const descriptionElement = document.getElementById('description');

        // Realiza una solicitud a la API de OpenWeatherMap
        fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
            // Procesa los datos de pronóstico aquí
            const temperatura = data.main.temp;
            const descripcion = data.weather[0].description;

            // Muestra los datos en la página
            temperatureElement.textContent = temperatura + "°C";
            descriptionElement.textContent = descripcion;
          })
          .catch(error => {
            console.error('Error al obtener datos de OpenWeatherMap:', error);
          });