const jwt = require('jsonwebtoken')

const studentAuthentication = function(req, res, next){
    try{
        const token = req.header('Authorization').replace('Bearer ' ,'')    //Authorizaiton: '<token>'
        const decoded_token = jwt.verify(token, 'dbs_university_project')
        const id = decoded_token.id
        req.token = token
        req.student = { id }
        next()

    }catch(err){
        res.status(500).send({ err })
    }
}

module.exports = studentAuthentication