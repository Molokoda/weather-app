let requestUrl = 'https://raw.githubusercontent.com/David-Haim/CountriesToCitiesJSON/master/countriesToCities.json';
let countrySelect = document.getElementById('country');
let citySelect = document.getElementById('city');
let button = document.getElementById('getWeather');
let arrayOfCountries;
fetch(requestUrl).then(result => result.json()).then(result => getCountry(result));
function getCountry(country){
    arrayOfCountries = country;
    for(let key in country){
        let countryOption = document.createElement('option');
        countryOption.innerHTML = key;
        countryOption.value = key;
        countrySelect.append(countryOption);
    }
}

countrySelect.addEventListener('change', () => {
    let country;
    citySelect.innerHTML = '';
    for(let key in arrayOfCountries){
        if(key === countrySelect.value){
            country = arrayOfCountries[key];
        }
    }

    for(let item of country){
        let cityOption = document.createElement('option');
        cityOption.innerHTML = item;
        cityOption.value = item;
        citySelect.append(cityOption);
    }

})

button.addEventListener('click', getWeather)

function getWeather(){
    if(citySelect.value){
        let host = `http://api.weatherapi.com/v1/forecast.json?key=668de3030ed24d8c9f833153202911&q=${citySelect.value}&days=3`;
        fetch(host).then(result => result = result.json()).then(result => showWeather(result.forecast.forecastday))
    }
    else{
        alert('error');
    }
}

function showWeather(forecastDay){
    showDay(forecastDay[0], 'todayInfo', true);
    showDay(forecastDay[1], 'firstDayInfo', false);
    showDay(forecastDay[2], 'secondDayInfo', false);
}

function showDay(forecastDay, dayInfo, main){
    let todayInfo = document.getElementById(`${dayInfo}`);
    todayInfo.innerHTML = `<span class = "title">${forecastDay.date}</span>`;
    let i = 6;
    while(i <= forecastDay.hour.length){
        if( main ){
            todayInfo.innerHTML += `
            <div class = "hourInfo">
                <span>time: ${forecastDay.hour[i - 1].time}</span>
                <span>tempreture: ${forecastDay.hour[i - 1].temp_c}</span>
                <span>feelslike: ${forecastDay.hour[i - 1].feelslike_c}</span>
                <span>chance of rain: ${forecastDay.hour[i - 1].chance_of_rain}</span>
                <span>chance of snow: ${forecastDay.hour[i - 1].chance_of_snow}</span>
                <span>cloud: ${forecastDay.hour[i - 1].cloud}</span>
            </div>
        `
        }
        else{
            todayInfo.innerHTML += `
                <div class = "hourInfo">
                    <span>time: ${forecastDay.hour[i - 1].time}</span>
                    <span>tempreture: ${forecastDay.hour[i - 1].temp_c}</span>
                    <span>feelslike: ${forecastDay.hour[i - 1].feelslike_c}</span>
                </div>
            `
        }
        i += 6;
    } 
}

