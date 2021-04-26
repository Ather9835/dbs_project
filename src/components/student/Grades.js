import React, {useState, useEffect} from 'react'
import Cookies from 'universal-cookie'
import{Button, Form,Col,Row,Container,Table}  from 'react-bootstrap';


export default function Grades()
{

    const [student, changeStudent] = useState([])
    const getGradesContentsem1 = student => {
            let content = [];
            let prev=0;
            let sum = 0;
            for (let i = 0; i < student.length; i++) {
              const item = student[i];
              
              if(item.semester == 1){
                 sum = sum + (item.credit*item.grad);
                 prev= prev + item.credit;
                 content.push(<tr><td>{item.courseno}</td><td>{item.grad}</td><td>{item.semester}</td><td>{item.credit}</td></tr>);}
            }
            content.push(<tr><td colSpan="3">Total SGPA</td><td>{sum/prev}</td></tr>)
      return content;
   }

   const getGradesContentsem2 = student => {
    let content = [];
    let prev=0;
    let sum = 0;
    for (let i = 0; i < student.length; i++) {
      const item = student[i];
      if(item.semester==2){
            sum = sum + (item.credit*item.grad);
            prev= prev + item.credit;
            content.push(<tr><td>{item.courseno}</td><td>{item.grad}</td><td>{item.semester}</td><td>{item.credit}</td></tr>);
      }
    }
      content.push(<tr><td colSpan="3">Total SGPA</td><td>{sum/prev}</td></tr>)
      return content;
    }


    const getsem = student => {
        let f = 1;
        for (let i = 0; i < student.length; i++) {
            const item = student[i];
            if(item.semester > f)
                f = item.semester;
            }
        return f;
    }

    const getUser = async () => {
        const token = (new Cookies()).get('idToken')
        const res = await fetch('http://localhost:5000/student_grade', {
            method:'GET',
            headers:{
                'Authorization':'Bearer '+ token
            }
        })
        const data = await res.json()
        //clearconsole.log(data)
        //console.log(data.gradeList)
        changeStudent(
            data.gradeList
        )

    }

    
    useEffect(() => {
        if(student.length === 0)
        {
            getUser()
        }
        
    })

    const no_sem = getsem(student)
    let c =1;
    
    return (
          <Container>
               {c++<=no_sem && 
                        <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                            <th>Course No</th>
                            <th>Grade</th>
                            <th>Semester</th>
                            <th>Credit</th>
                            </tr>
                        </thead>
                        <tbody>
                        { getGradesContentsem1(student) }
            
                        </tbody>
                        </Table>
               }
               {c++<=no_sem && 
                <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                    <th>Course No</th>
                    <th>Grade</th>
                    <th>Semester</th>
                    <th>Credit</th>
                    </tr>
                </thead>
                <tbody>
                 { getGradesContentsem2(student) }
    
                </tbody>
                </Table>
               }
             
              
              
              
              
          </Container> 

        
    );
}

