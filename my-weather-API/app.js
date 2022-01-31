const input = document.getElementById('city-input')
const city = document.querySelector('.city-name')
const btn = document.querySelector('.btn')
const temperature = document.querySelector('.temperature')
const weatherType = document.querySelector('.type-of-weather')

btn.onclick = () => {
    city.innerHTML = input.value
    console.log(input.value)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=60ac075c0193e2ea0b64789e3276fef5`)
        .then(function (resp){
            if(resp.status !== 404) {
                return resp.json()
            }
            else {
                city.innerHTML = 'No matches'
                weatherType.innerHTML = ''
                temperature.innerHTML = '';
            }
        }).then( function (data) {
            temperature.innerHTML = `${Math.round(data.main.temp - 273)} \u00B0`
            const icon = data.weather[0].icon
            weatherType.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png">`
    })
}