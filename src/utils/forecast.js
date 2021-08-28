const request = require('postman-request');

const forecast = (latitude, longitude, callback)=>{

    const url = `http://api.weatherstack.com/current?access_key=ff2156cd671358c2147d770f210d61e4&query=${latitude},${longitude}`;
    request({url:url, json:true}, (error, response)=>{
        //console.log(response);
        if(error){
            callback(`Unable to connect to weather service. Try again!`, undefined);
        }else if(response.body.error){
            callback(`Unable to find location. Try again!`, undefined);
        }else{
            callback(undefined, {
                name: response.body.location.name,
                temp: response.body.current.temperature,
                feelslike: response.body.current.feelslike,
                description: response.body.current.weather_descriptions[0],
            })
        }
    })
};

module.exports = forecast;
