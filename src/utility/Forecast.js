const request = require("request")
const geocode = (address,callback)=>{
    const geocodeUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoibmlraS0wNjgiLCJhIjoiY2todDR3endhMHFuYjJ4bGhzZThjYms1NiJ9.PqpJeeyHAgH6f3erJTN9IQ&limit=1";

    request({url:geocodeUrl,json:true,},(error,response) =>{
        if(error){
            callback("unable to connect",undefined);
        }
        else if(response.body.features.length == 0){
            callback("place invalid",undefined);
        }
        else{
            const data = {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                place : response.body.features[0].place_name
            }
            callback(undefined,data);
        }
    })
}

const weather = (latitude,longitude,callback)=>{
    const weatherUrl = "http://api.weatherstack.com/current?access_key=43e85fbef62256b4290b80d9aed742b2&query=" + latitude +"," + longitude;

    request({url:weatherUrl,json:true},(error,response)=>{
        if(error){
            callback(error,undefined);
        }
        else if(response.body.error){
            callback("Not enough information",undefined);
        }
        else{
        const data = {
            weather:response.body.current.weather_descriptions[0],
            temperature : response.body.current.temperature,
            feelslike : response.body.current.feelslike
        }
            callback(undefined,data);
        }
        
    })
}

module.exports = {
    geocode : geocode,
    weather : weather
}