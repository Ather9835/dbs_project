const oracledb = require('oracledb')

const initiateOracleConnection = async function(){
    await oracledb.createPool({
        user: 'raj',
        password: 'raj',
        poolMin: 3,
        poolMax: 3,
        poolIncrement: 0
    })
}

const closeOracleConnection = async function(){
    await oracledb.getPool().close(0)
}

module.exports = {
    initiateOracleConnection,
    closeOracleConnection
}