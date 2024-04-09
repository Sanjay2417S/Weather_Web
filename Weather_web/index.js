const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
var apik = "4242dbde9becb40cb7293234e9361325";


search.addEventListener('click', () => {

    const city = document.querySelector('#city').value;
    if (city == '')
        return;

    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apik)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main){
                case 'Clear':
                    image.src = 'https://www.pngall.com/wp-content/uploads/11/Weather-No-Background.png';
                    break;

                case 'Rain':
                    image.src = 'https://www.freeiconspng.com/uploads/cloud-rain-weather-icon-25.png';
                    break;

                case 'Snow':
                    image.src = 'https://static.vecteezy.com/system/resources/thumbnails/012/806/416/small/3d-cartoon-weather-icon-snow-clouds-and-snowflakes-sign-isolated-on-transparent-background-3d-render-illustration-png.png';
                    break;

                case 'Clouds':
                    image.src = 'https://png.pngtree.com/png-clipart/20230417/original/pngtree-cloudy-white-cloud-weather-transparent-png-image_9062529.png';
                    break;

                case 'Haze':
                    image.src = 'https://cdn-icons-png.flaticon.com/512/1779/1779807.png';
                    break;

                default:
                    image.src = '';
            }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span> C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;

        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '590px';
        });
});