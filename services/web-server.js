const express = require('express')
const cors = require('cors')

const studentRouter = require('../routers/studentRouter')
const facultyRouter = require('../routers/facultyRouter')
const instituteRouter = require('../routers/instituteRouter')

const initializeWebServer = async function(){
    const app = express()

    app.use(express.json())
    app.use(cors())
    app.use(studentRouter)
    app.use(facultyRouter)
   

    const port = 5000
    app.listen(port, () => {
        console.log('Listening on port '+port)
    })
}

module.exports = initializeWebServer



