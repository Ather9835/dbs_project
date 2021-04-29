import React, {useState, useEffect} from 'react'
import Cookies from 'universal-cookie'
import Navigation from '../components/student/Navigation'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button,Container} from 'react-bootstrap'
import Attendance from '../components/student/Attendance';
import Course from '../components/student/Course';
import Grades from '../components/student/Grades';
import Breadth from '../components/student/Breadth';
import Backlog from '../components/student/Backlog';


export default function Student() {

    const [student, changeStudent] = useState({
        studentName:'',
        studentBranch:'',
        studentCsem:''
    })

    const [last, changeLast] = useState('none');

    const getUser = async () => {
        const token = (new Cookies()).get('idToken')
        const res = await fetch('http://localhost:5000/student_info', {
            method:'GET',
            headers:{
                'Authorization':'Bearer '+ token
            }
        })
        const data = await res.json()
        changeStudent({
            studentName: data.studentName,
            studentBranch: data.studentBranch,
            studentCsem: data.studentCsem
        })
    }

    useEffect(() => {
        getUser()
    })

    

    return (
       
        <div>
             <Navigation /> 
             <Container>
                 <div>
                <h2>Name : {student.studentName}</h2><hr>
                </hr>
                <h3>Sem : {student.studentCsem}</h3>
                <h3>Batch : {student.studentBranch}</h3>
                
                </div>
                <div>
                                
                                    
                                            <Button
                                             variant="success"
                                             className="mx-2 my-2"
                                             onClick={() => { changeLast('attendance') }}
                                             >
                                                Attendance
                                            </Button>
                                   
                                  
                                             <Button
                                             variant="success"
                                             className="mx-2 my-2"
                                             onClick={() => { changeLast('courses') }}
                                             >
                                                 Courses
                                            </Button>
                                   
                                             <Button
                                             variant="success"
                                             className="mx-2 my-2"
                                             onClick={() => { changeLast('grades') }}
                                             >
                                                 Grades
                                            </Button>
                                            <Button
                                             variant="success"
                                             className="mx-2 my-2"
                                             onClick={() => { changeLast('breadth') }}
                                             >
                                                 View Breadth
                                            </Button>
                                            <Button
                                             variant="success"
                                             className="mx-2 my-2"
                                             onClick={() => { changeLast('backlog') }}
                                             >
                                                 Backlog
                                            </Button>
                                    
                            </div>
            </Container>
            {
                              last === 'attendance'?
                              <Attendance />:
                              last === 'courses'?
                              <Course />:
                              last === 'grades'?
                              <Grades />:
                              last === 'breadth'?
                              <Breadth />:
                              last === 'backlog'?
                              <Backlog />:
                              <div />
            }
            
        </div>
    )
}
