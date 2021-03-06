const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/bba77be52cf0925e11d28b554a17d407/'+ latitude +',' + longitude
    request({url, json: true},(error, {body}) => {
            if (error){
              callback('Unable to connect to weather service.',undefined)
            } else if (body.error) {
              callback('Unable to find location',undefined)
            } else {
               callback(undefined,body.daily.data[0].summary +" It is currently " + body.currently.temperature + " degrees outside. There is a " + body.daily.data[0].precipProbability * 100 +"% chance of rain.  The high today is " + body.daily.data[0].temperatureHigh+ ".  The low is " + body.daily.data[0].temperatureLow+ ".")
            }
          })
      
}

module.exports = forecast