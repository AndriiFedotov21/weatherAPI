
const input = document.getElementById('city-input')
const city = document.querySelector('.city-name')
const btn = document.querySelector('.btn')
const temperature = document.querySelector('.temperature')
const weatherType = document.querySelector('.type-of-weather')
const body = document.querySelector('body')
const saveBtn = document.querySelector('.observe-button')

let count = -1;
saveBtn.onclick = () => {
    count += 1
    body.style = `
    padding: 20px;
    justify-content: left;
    `
    let newTemplate = document.body.appendChild(document.createElement("div"))
    newTemplate.innerHTML = `
    <div class="weather-wrapper-template">
    <div class="attributes-holder-template">
    <div class="city-name-template"></div>
    <div class="temperature-template"></div>
    <div class="temp-icon-template"></div>
    <div class="type-of-weather-template"></div>
    </div>
    </div> `


    let citiesList = [...document.querySelectorAll(".city-name-template")]
    console.log(citiesList)
    citiesList[count].innerHTML =  city.innerHTML
    let temperatureList = [...document.querySelectorAll(".temperature-template")]
    console.log(citiesList)
    temperatureList[count].innerHTML =  temperature.innerHTML
    let weatherList = [...document.querySelectorAll(".type-of-weather-template")]
    console.log(citiesList)
    weatherList[count].innerHTML =  weatherType.innerHTML





}
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
