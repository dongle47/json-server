const express = require('express')
const app = express()

let port = process.env.PORT || 3000;

app.get("/", (req, res)=>{
    res.send("Hello world")
})

const citiesData = require("./cities.json")
app.get("/cities", (req, res)=>{
   res.send(citiesData) 
})

app.listen(port, ()=>{
    console.log(`Example app is listening on port http://localhost:${port}`)
})