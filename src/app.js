const express  = require('express');
const path = require('path');
const hbs = require('hbs');
const request = require('request');
const forecast = require('./utility/Forecast')

const app = express();

// get public and view directory paths
const publicDirPath = path.join(__dirname,"../public");
const viewPath = path.join(__dirname,"../templates/views");
const partialViewPath = path.join(__dirname,"../templates/partials")

// set view engine and view path
app.set("view engine","hbs");
app.set('views',viewPath);
hbs.registerPartials(partialViewPath);

// set directory for static files to be served
app.use(express.static(publicDirPath));


app.get('',(req,res)=>{
    res.render('index',{
        title:"weather",
        name: "nikita"
    });
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help",
        name: "nikita"
    });
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About",
        name: "nikita"
    });
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send("Please provide an address");
    }
    
    forecast.geocode(req.query.address,(error,{latitude,longitude,place}={})=>{
        
        if(error){
            return res.send({error});
            }
            
        forecast.weather(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error});
                }
                
            res.send({
                forecast : forecastData.weather,
                location : place,
                address: req.query.address
            });
        })

    })
    
})
app.get('/help/*',(req,res)=>{
    res.render('help',{
        title:"help",
        name: "nikita"
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:"404",
        name: "nikita"
    })
})
app.listen(3000,()=>{
    console.log("Server is up on port 3000");
})