
const input = document.getElementById('city-input')
const city = document.querySelector('.city-name')
const btn = document.querySelector('.btn')
const temperature = document.querySelector('.temperature')
const weatherType = document.querySelector('.type-of-weather')
const body = document.querySelector('body')
const saveBtn = document.querySelector('.observe-button')


const tmplt = ` 
 
<div class="weather-wrapper">
    <div class="attributes-holder">
    <div class="city-name"></div>
    <div class="temperature"></div>
    <div class="temp-icon"></div>
    <div class="type-of-weather"></div>
    </div>
   
</div>
<style>

.weather-wrapper {
    margin: 20px;
    position: relative;
    font-family: 'Mochiy Pop P One', sans-serif;
    border-radius: 10px;
    max-width: 300px;
    min-height: 50%;
    text-align: center;
    box-shadow: 0 0 3px 5px black;
    padding: 3px;
}

label {
    margin: 0 auto;
}
#city-input {
    font-size: 16px;
    font-weight: bold;
    text-shadow: 1px 0 black;
    letter-spacing: 2px;
    width: 50%;
    height: 20px;
    box-shadow: 0 0 3px 5px black;
    margin: 50px 0 10px 0;
    outline: none;
    border-radius: 2px;
    color: black;
    font-family: 'Mochiy Pop P One', sans-serif;
    text-align: center;
}
.city-name {
    font-size: 16px;
    font-weight: bold;
    text-shadow: 1px 0 black;
    font-family: 'Mochiy Pop P One', sans-serif;
    letter-spacing: 2px;
    min-width: 100px;
    min-height: 20px;
    padding: 3px;
    box-shadow: 0 0 3px 5px black;
    margin: 20px 20px 0;
    border-radius: 2px;
    color: black;
}

.temperature {
    min-width: 100px;
    font-family: 'Mochiy Pop P One', sans-serif;
    padding: 3px;
    height: 20px;
    box-shadow: 0 0 3px 5px black;
    margin: 20px 20px 0;
    border-radius: 2px;
    color: rgba(2, 30, 141, 0.62);
    font-size: 16px;
    
}
.type-of-weather {
    min-width: 100px;
    box-shadow: 0 0 3px 5px black;
    margin: 20px 20px 20px 20px;
    border-radius: 2px;

    background: #8c9898;
    min-height: 20px;
    padding: 3px;
}
.btn {
    display: flex;
    height: 25px;
    cursor: pointer;
    width: 20%;
    margin: 10px auto 0;
    border-radius: 10px;
    border: 2px solid black;
    background: black;
    transition: 0.5s;
    font-size: 16px;
    box-shadow: 0 0 3px 5px black;
    justify-content: center;
    align-items: center;
    color: white;

}
.btn:hover {
    box-shadow: 0 0 3px 8px black;
    transition: 0.5s;
    color: white;
}</style>
`
class Template extends HTMLElement {
    constructor() {
        super()

        const shadow = this.attachShadow({mode: 'closed'})
        shadow.appendChild(document.createElement('div'))
            .innerHTML = this.tmplt


    }
}
Template.prototype.tmplt = tmplt
customElements.define('template-insert', Template)

saveBtn.onclick = () => {

    body.style = `
    padding: 20px;
    justify-content: left;
    `
    document.body.appendChild(document.createElement('template-insert'))
    const temp = document.querySelector('.temperaturO')
    console.log(temp)


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
