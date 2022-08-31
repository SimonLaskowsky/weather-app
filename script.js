const input = document.querySelector('input')
const button = document.querySelector('button')
const cityName = document.querySelector('.city-name')
const warning = document.querySelector('.warning')
const photo = document.querySelector('.photo')
const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temperature')
const humidity = document.querySelector('.humidity')

const API_LINK = 'http://api.openweathermap.org/data/2.5/weather?q='
const API_KEY = '&appid=e4f0e75c5ad6fbff499dc2ab9f6434a9'
const API_UNITS = '&units=metric'

const getWeather = () => {
    const city = input.value || 'Warsaw'  //jeżeli nic nie jest przekazane to domyslna wartosc to warsaw
    const URL = API_LINK + city + API_KEY + API_UNITS 

    axios.get(URL).then(res => {
        const temp = res.data.main.temp
        const hum = res.data.main.humidity
        const status = Object.assign({}, ...res.data.weather)

        warning.textContent = ''
        input.value = ''

        if (status.id >= 200 && status.id <= 232){
            photo.setAttribute('src', './img/thunderstorm.png')
        } else if (status.id >= 300 && status.id <= 321){
            photo.setAttribute('src', './img/drizzle.png')
        } else if (status.id >= 500 && status.id <= 531){
            photo.setAttribute('src', './img/rain.png')
        } else if (status.id >= 600 && status.id <= 622){
            photo.setAttribute('src', './img/snow.png')
        } else if (status.id >= 701 && status.id <= 781){
            photo.setAttribute('src', './img/fog.png')
        } else if (status.id == 800) {
            photo.setAttribute('src', './img/sun.png')
        } else if (status.id >= 800 && status.id <= 804){
            photo.setAttribute('src', './img/cloud.png')
        } else {
            photo.setAttribute('src', './img/unknow.png')
        }

        cityName.textContent = res.data.name
        temperature.textContent = Math.floor(temp) + '℃'
        humidity.textContent = hum + '%'
        weather.textContent = status.main
    }).catch(() => warning.textContent = 'Wpisz poprawną nazwę miasta!')
}

const enterCheck = (e) => {
    if (e.key == 'Enter'){
        getWeather()
    }
}

getWeather()
button.addEventListener('click', getWeather)
input.addEventListener('keyup', enterCheck)