const yargs = require('yargs');

const geocode = require ('./geocode/geocode.js');
const weather = require ('./weather/weather.js');

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

geocode.geocodeAddress(argv.address,(errorMessage,results)=>{
    if(errorMessage){
        console.log(errorMessage);
    }
    else{
        //console.log(results); //use this to see the complete object
        console.log(`In ${results.address}`);
        weather.getWeather(results.latitide,results.longitude,(errorMessage,weatherResults)=>{
            if(errorMessage){
                console.log(errorMessage);
            }
            else{
                console.log(`It is currently ${weatherResults.temperature}`);
                console.log(`and it feels like ${weatherResults.apparentTemperature}`);
                //console.log(weatherResults); //use this to see the complete object
            }
        });
    }
});



