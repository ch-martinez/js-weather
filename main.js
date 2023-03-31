const lat = '-33.13067'
const lon = '-64.34992'
const apiKey = 'cb1d7125416c813760e7c7a3ae1f3d85'
const api_url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`

const fetchData = async (url) => {
    try {
        let res = await fetch(url)
        res = await res.json()
        console.table(res)
        console.table(res.weather)
    } catch (error) {
        console.log(error)
    }
}

fetchData(api_url2)