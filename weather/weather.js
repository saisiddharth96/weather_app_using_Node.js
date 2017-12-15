const request = require('request');

var getWeather = (lat,lng,callback) =>{
    request({
        url : `https://api.darksky.net/forecast/8678cb008834e1781d144becd13e6a32/${lat },${lng}`,
        json : true
    }, (error,response,body)=>{
        if (error) {
            callback("Unable to connect to forecast servers");
        }
        else if (response.statusCode === 400) {
            callback("Unable to fetch weather 400!");
        }
        else if (response.statusCode === 200) {
            callback(undefined, {
                temperature : body.currently.temperature,
                apparentTemperature : body.currently.apparentTemperature
            });
        }
    });
};

module.exports = {getWeather};