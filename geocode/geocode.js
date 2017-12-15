const request = require('request');

function geocodeAddress(address,callback){
    var encodedAddress = encodeURIComponent(address);
    
    request({
        url : `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        json : true
    },(error,response,body)=>{
         if(error){
             callback("Unable to connect to google servers :(");
         }
         else if (body.status === 'ZERO_RESULTS') {
            callback("Unable to find that location");
         }
         else if(body.status === 'OK'){
            callback(undefined, {
                    address : body.results[0].formatted_address,
                    latitide : body.results[0].geometry.location.lat,
                    longitude : body.results[0].geometry.location.lng
            });
        }
    });
};

module.exports = {geocodeAddress};