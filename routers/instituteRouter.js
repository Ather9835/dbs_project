const express = require('express')
const jwt = require('jsonwebtoken')
const oracledb = require('oracledb')

const router = new express.Router()

router.post('/new_login', async (req, res) => {
    try{
        const facultyCredentials = req.body
        console.log(facultyCredentials.email)

        //Get faculty details
        const conn = await oracledb.getConnection()
        var query = 'SELECT id FROM users WHERE '+
                        'email = \''+facultyCredentials.email+'\' AND password = \''+facultyCredentials.password+'\''
        console.log(query)
        const result = await conn.execute(query)
        const resultSet = result.rows
        console.log(resultSet.length)
        await conn.close()

        if(result.rows.length === 0)
        {
            //Invalid login credentials
            res.status(401).send({ err: 'Invalid credentials' })
        }
        else
        {
            const facultyId = resultSet[0][0]
            const token = await jwt.sign({id: facultyId}, 'dbs_university_project', {expiresIn: "2 days"})
            res.send({ token })
        }

    }catch(err){
        res.status(500).send({ err })
    }
})

router.post('/new_register', async (req, res) => {
    try{
        const facultyCredentials = req.body
        console.log(facultyCredentials.email)



        //Get faculty details
        const conn = await oracledb.getConnection()
        var query = 'insert into student values (\''+facultyCredentials.roll + '\',\'' + facultyCredentials.name + '\',\''+ facultyCredentials.dept + '\',\'' + facultyCredentials.batch + '\',\'' + facultyCredentials.email+'\')'
        console.log(query)
        const result = await conn.execute(query)
        await conn.close()

        if(result.rows.length === 0)
        {
            //Invalid login credentials
            res.status(401).send({ err: 'Invalid credentials' })
        }
        else
        {
            res.status(200).send({ err: 'Successful' })
        }

    }catch(err){
        res.status(500).send({ err })
    }
})



module.exports = router