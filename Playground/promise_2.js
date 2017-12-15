const request = require('request');

var geoCodeAddress = (address) =>{
    return new Promise((resolve,reject)=>{
        var encodedAddress = encodeURIComponent(address);
        
        request({
            url : `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
            json : true
        },(error,response,body)=>{
             if(error){
                 reject("Unable to connect to google servers :(");
             }
             else if (body.status === 'ZERO_RESULTS') {
                reject ("Unable to find that location");
             }
             else if(body.status === 'OK'){
                resolve({
                        address : body.results[0].formatted_address,
                        latitide : body.results[0].geometry.location.lat,
                        longitude : body.results[0].geometry.location.lng
                });
            }
        });
    });
};

geoCodeAddress('000000').then((location)=>{
    console.log(JSON.stringify(location,undefined,2));
}, (errorMessage)=>{
    console.log(errorMessage);
})