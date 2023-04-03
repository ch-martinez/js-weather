const api_key = 'cb1d7125416c813760e7c7a3ae1f3d85'


const get_weather = (lat, lon) => {
    const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&lang=es&units=Metric`

}

const api_geo_url = (city) => `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=10&appid=${api_key}`

const input_location = document.getElementById('input_location')
const btn_getLocation = document.getElementById('btn_getLocation')

const location_container = document.getElementById('location_container')
const container = document.getElementById('container')

const w_temp = document.getElementById('w_temp')
const w_min = document.getElementById('w_min')
const w_max = document.getElementById('w_max')
const w_status = document.getElementById('w_status')
const w_wind_spd = document.getElementById('w_wind_spd')
const w_location = document.getElementById('w_location')

const renderWeather = (w) => {
    w_temp.textContent = `${w.main.temp}°`
    w_min.textContent = `${w.main.temp_min}°`
    w_max.textContent = `${w.main.temp_max}°`
    w_status.textContent = `${w.weather[0].description}`
    w_wind_spd.textContent = `${w.wind.speed} Km/hs`
    w_location.textContent = `${w.name}`
}

const fetchData = async (url) => {
    try {
        let res = await fetch(url)
        res = await res.json()
        console.log(res)
        renderWeather(res)
    } catch (error) {
        console.log(error)
    }
}

const fetchGeo = async (url) => {
    try {
        const response = await fetch(url)
        const data = response.json()
        console.log(data)

    } catch (error) {
        console.log(error)
    }
}

const getLocation = () => {
    
}

input_location.addEventListener('keyup', (e) => {
    e.preventDefault()
    console.log(e.target.value)
    fetchGeo(api_geo_url(e.target.value))
})