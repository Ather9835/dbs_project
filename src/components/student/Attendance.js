import React, {useState, useEffect} from 'react'
import Cookies from 'universal-cookie'
import{Button, Form,Col,Row,Container,Table}  from 'react-bootstrap';

function Attendance()
{

    const [student, changeStudent] = useState(
        [])

    const getGradesContentsem1 = student => {
            let content = [];
            for (let i = 0; i < student.length; i++) {
              const item = student[i];
              content.push(<tr><td>{item.course}</td><td>{item.count}</td><td>{item.total}</td></tr>);}
      return content;
   }

    const getUser = async () => {
        const token = (new Cookies()).get('idToken')
        const res = await fetch('http://localhost:5000/student_attendance', {
            method:'GET',
            headers:{
                'Authorization':'Bearer '+ token
            }
        })
        const data = await res.json()
        //clearconsole.log(data)
        changeStudent(
            data.attendanceList
        )
    }

    
    useEffect(() => {
        if(student.length === 0)
        {
            getUser()
        }
        
    })
    
    
    return (
        <Container>
                      <Table striped bordered hover variant="dark">
                      <thead>
                          <tr>
                          <th>Course No</th>
                          <th>Count</th>
                          <th>Total</th>
                          </tr>
                      </thead>
                      <tbody>
                      { getGradesContentsem1(student) }
          
                      </tbody>
                      </Table>
             
           
            
            
            
            
        </Container> 

        
    );
}

export default Attendance;