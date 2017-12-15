const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .option({
        a : {
            demand : true,
            alias : 'address',
            decsribe : "Enter the address that you want to fetch weather of",
            string : true            
        }   
})
    .help()
    .alias('help','h')
    .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeURL = `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;


axios
    .get(geocodeURL)
    .then((response)=>{
        if(response.data.status === 'ZERO_RESULTS'){
            throw new Error('Unable to find that address');
        }
        
        var lat=response.data.results[0].geometry.location.lat;
        var lng= response.data.results[0].geometry.location.lng;
        var weatherURL = `https://api.darksky.net/forecast/8678cb008834e1781d144becd13e6a32/${lat },${lng}`; 
        console.log(response.data.results[0].formatted_address); 
        return axios.get(weatherURL);
    })
    .then((response)=>{
        var temperature = response.data.currently.temperature;
        var apparentTemperature = response.data.currently.apparentTemperature;
        console.log(`It's currently ${temperature} \nbut it feels like ${apparentTemperature}`);
    })
    .catch((err)=>{ 
        if(err.code === 'ENOTFOUND'){
            console.log('Unable to connect Google API');
        }
        else{
           console.log(err.message);
        }
    });
