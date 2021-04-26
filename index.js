const { initiateOracleConnection, closeOracleConnection } = require('./db/initConnection')
const initializeWebServer = require('./services/web-server')

const startWebServer = async function(){
    try{
        console.log('Initializing database connection pool')
        await initiateOracleConnection()

    }catch(e){
        console.log(e)
    }

    try{
        console.log('Initializing web server')
        await initializeWebServer()
    
    }catch(e){
        console.log(e)
    }
}

const closeWebServer = async function(){
    try{
        console.log('Closing database connection pool')
        await closeOracleConnection()

    }catch(e){
        console.log(e)
    }
}

const executeWebServer = async function(){
    await startWebServer()
}

executeWebServer()