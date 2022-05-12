const express=require("express");

const https=require("https")

const app=express();

const bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){

    res.sendFile(__dirname + "/index.html")

})

app.post("/", function(req,res){

    console.log(req.body.cityName)

    const query=req.body.cityName
    const apikey="8471798c94bc4117cb8c41d8c9d7704a"
    const unit="metric"


    const url="https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + unit;

    https.get(url,function(response){

        console.log(response.statusCode);

        response.on("data", function(data){

            const weatherData=JSON.parse(data);
            const temp=weatherData.main.temp;
            const weatherDesc=weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon
            res.write("<p>The weather is currently " + weatherDesc + "</p>")
            res.write("<h1>The Temparture in "+ query + " is "+ temp+ " degree celsius</h1>")
            res.send();
        })
    })

});

app.listen(3000,function(){

    console.log("server running fine");
})