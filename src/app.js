const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast.js')

const app = express()

//define paths for express config
const publicDirectoryPath=(path.join(__dirname,'../public'))
const viewsPath=(path.join(__dirname,'../templates/views'))
const partialsPath=(path.join(__dirname,'../templates/partials'))

//set handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Margaret Kearney'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Margaret Kearney'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is the help message.',
        title: 'Help',
        name: 'Margaret Kearney'
    })

})

app.get('/weather',(req,res) => {
    if (!req.query.address){
        res.send({
            error: 'You must provide a search term'
        })
    } else { 
        geocode(req.query.address,(error, {latitude, longitude, location} = {}) => {
            if (error) {
              return res.send({ error })
            }
            
            forecast(longitude, latitude, (error, forecastData) => {
              if (error) {
                 return res.send({error})
              }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
                     
            }) 
            })
          
           } )
    }
 })

app.get('/products',(req,res) => {
    if (!req.query.search) {
        return res.send ({
           error: 'you must provide a search term'
       })
    }
    console.log(req.query.search)
    res.send ({
        products:[]
        
    })
})

app.get('/help/*',(req, res) =>{
    res.render('404', {
        title: '404',
        errorMessage:"Help article not found",
        name: 'Margaret Kearney'
    })
}),
app.get('*',(req,res)=>{
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Margaret Kearney'
    } )
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
