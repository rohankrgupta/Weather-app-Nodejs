const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for express config.
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../template/views');
const partialsPath = path.join(__dirname, '../template/partials');

// Setup handlebar engine & views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather',
        name: "Rohan Kr. Gupta"
    });

})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About me',
        name: "Rohan Kr. Gupta"
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Need Assistance ?',
        msg: 'Contact me : rohankrgupta2000@gmail.com',
        name: "Rohan Kr. Gupta"
    })
})

app.get('/weather', (req, res)=>{
    
    if(!req.query.address){
        return res.send({
            error: "Must provide an address"
        })
    }

    const address = req.query.address;

    geocode(address, (error, {location, latitude, longitude}={})=>{
        //console.log(error, data);
        if(error){
            return res.send({
                error: "Invalid Address"
            })
        }
    
        forecast(latitude, longitude, (error, {description: des, temp, feelslike, name}={}) => {
            if(error){
                return res.send({
                    error: "Not able to reach weather service"
                })
            };

            return res.send({
                location: location,
                description: des,
                temperature: temp,
                feelslike: feelslike,
            });        
        });
    });

    /*res.send({
        forecast: "It is snowing",
        location: req.query.address,
        name: "Rohan Kr. Gupta"
    });*/
});

app.get('/products', (req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search item',
        })
    }
    console.log(req.query.search)

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404-page', {
        title: "Page Not found",
        name: "Rohan Kr. Gupta",
        msg: "Help article not found",
    })
})

app.get('*', (req, res)=>{
    res.render('404-page', {
        title: "404",
        name: "Rohan Kr. Gupta",
        msg: "Dang..Page Not Found !",
    })
})



app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
});


