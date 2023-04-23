const api_key = 'cb1d7125416c813760e7c7a3ae1f3d85'
const api_url_weather = (lat, lon) => `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&lang=es&units=Metric`
const api_url_geo = (city) => `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=10&appid=${api_key}`

const input_location = document.getElementById('input_location')
const btn_getLocation = document.getElementById('btn_getLocation')

const location_container = document.getElementById('location_container')
const btn_back = document.getElementById('btn_back')

const weather_container = document.getElementById('weather_container')

/* Data weather */
const w_location = document.getElementById('w_location')
const w_temp = document.getElementById('w_temp')
const w_feels = document.getElementById('w_feels')
const w_min = document.getElementById('w_min')
const w_max = document.getElementById('w_max')
const w_status = document.getElementById('w_status')
const w_icon = document.getElementById('w_icon')
const w_wind_spd = document.getElementById('w_wind_spd')
const w_humidity = document.getElementById('w_humidity')
const w_pressure = document.getElementById('w_pressure')

/* Renderiza los datos de la ciudad ingresada */
const renderWeather = (w) => {
    const icon = `https://openweathermap.org/img/wn/${w.weather[0].icon}@4x.png`
    w_icon.setAttribute('src',icon)
    w_temp.textContent = `${w.main.temp}°`
    w_min.textContent = `${w.main.temp_min}°`
    w_max.textContent = `${w.main.temp_max}°`
    w_status.textContent = `${w.weather[0].description}`
    w_wind_spd.textContent = `${w.wind.speed} Km/hs`
    w_location.textContent = `${w.name}`
    w_humidity.textContent = `${w.main.humidity}`
    w_pressure.textContent = `${w.main.pressure}`
    w_feels.textContent = `${w.main.feels_like}`
}

/* Obtiene los datos de la ciudad ingresada */
const fetchWeather = async (url) => {
    try {
        let response = await fetch(url)
        response = await response.json()
        console.log(response)
        renderWeather(response)
    } catch (error) {
        console.log(error)
    }
}

/* Obtiene los datos de lat y long de la ciduad ingresada */
const fetchGeo = async (geo_url) => {
    try {
        let response = await fetch(geo_url)
        response = await response.json()
        fetchWeather(api_url_weather(response[0].lat,response[0].lon))
    } catch (error) {
        console.log(error)
    }
}

input_location.addEventListener('change', (e) => {
    e.preventDefault()
    fetchGeo(api_url_geo(e.target.value))
})

btn_getLocation.addEventListener('click', async (e) => {
    const sucess = (response) => {
        fetchWeather(api_url_weather(response.coords.latitude,response.coords.longitude))
    }
    
    e.preventDefault()
    weather_container.classList.toggle("hidde")
    location_container.classList.toggle('hidde')

    navigator.geolocation.getCurrentPosition(sucess)
})

btn_back.addEventListener('click', () => {
    weather_container.classList.toggle("hidde")
    location_container.classList.toggle('hidde')
})