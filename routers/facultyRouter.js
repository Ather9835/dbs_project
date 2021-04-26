const express = require('express')
const jwt = require('jsonwebtoken')
const oracledb = require('oracledb')
const facultyAuth = require('../middleware/facultyAuth')

const router = new express.Router()

router.post('/faculty_login', async (req, res) => {
    try{
        const facultyCredentials = req.body

        //Get faculty details
        const conn = await oracledb.getConnection()
        var query = 'SELECT id FROM Instructor NATURAL JOIN Instructor_auth WHERE '+
                        'email = \''+facultyCredentials.email+'\' AND password = \''+facultyCredentials.password+'\''
        const result = await conn.execute(query)
        const resultSet = result.rows
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

router.get('/faculty_info', facultyAuth, async (req, res) => {
    try{
        const facultyId = req.faculty.id

        const conn = await oracledb.getConnection()
        var query = 'SELECT name, specialization, EXTRACT(YEAR FROM joining_date) AS joining_year, department_name '+ 
                        'FROM Instructor WHERE id = '+facultyId;
        const resultSet = (await conn.execute(query)).rows
        query = 'SELECT course_name FROM Course NATURAL JOIN Instr_course WHERE instructor_id = '+facultyId
        const resultSetCourseList = (await conn.execute(query)).rows
        const facultyCourseList = []
        resultSetCourseList.forEach(course => {
            facultyCourseList.push(course[0])
        })
        const facultyInfo = {
            facultyName: resultSet[0][0],
            facultyYearOfJoining: resultSet[0][1],
            facultyDepartment: resultSet[0][2],
            facultyCourseList
        }
        
        await conn.close()
        res.send({
            facultyInfo
        })

    }catch(e){
        res.status(500).send({err:e})
    }
})

router.get('/faculty_logout', facultyAuth, (req, res) => {
    req.session.destroy()
    res.status(500).send({ })
})

module.exports = router