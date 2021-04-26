import React, {useState, useEffect} from 'react'
import Cookies from 'universal-cookie'
import{Button, Form,Col,Row,Container,Table}  from 'react-bootstrap';


export default function Grades()
{

    const [student, changeStudent] = useState([])
    const getGradesContentsem1 = student => {
            let content = [];
            for (let i = 0; i < student.length; i++) {
              const item = student[i];
              content.push(<tr><td>{item.courseno}</td><td>{item.coursename}</td><td>{item.semester}</td></tr>);}
      return content;
   }

 

    const getUser = async () => {
        const token = (new Cookies()).get('idToken')
        const res = await fetch('http://localhost:5000/student_course', {
            method:'GET',
            headers:{
                'Authorization':'Bearer '+ token
            }
        })
        const data = await res.json()
        //clearconsole.log(data)
        console.log(data.courseList)
        changeStudent(
            data.courseList
        )

    }

    
    useEffect(() => {
        if(student.length === 0)
        {
            getUser()
        }
        
    })

    let c =1;
    
    return (
          <Container>
                        <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                            <th>Course No</th>
                            <th>Course Name</th>
                            <th>Semester</th>
                            </tr>
                        </thead>
                        <tbody>
                        { getGradesContentsem1(student) }
            
                        </tbody>
                        </Table>
               
             
              
              
              
              
          </Container> 

        
    );
}

