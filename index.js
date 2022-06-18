const express = require('express')
const jsonServer = require('json-server');
const app = express()

let port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Hello world")
})

// const citiesData = require("./cities.json")
// app.get("/cities", (req, res) => {
//     res.send(citiesData)
// })

// const studentsData = require("./students.json")
// app.get("/students", (req, res) => {
//     res.send(studentsData)
// })

app.use('/cities', jsonServer.router('cities.json'));
app.use('/students', jsonServer.router('students.json'));

app.listen(port, () => {
    console.log(`Example app is listening on port http://localhost:${port}`)
})