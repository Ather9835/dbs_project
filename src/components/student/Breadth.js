import React, {useState, useEffect,useRef} from 'react'
import Cookies from 'universal-cookie'
import { Redirect } from 'react-router-dom'
import{Button, Form,Col,Row,Container,Table}  from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';



export default function Breadth()
{
    const [isLog, changeLog] = useState(false)
    const [student, changeStudent] = useState([])
    const [isfetched, changeFetchstatus] = useState(false)
    let Breadth = [];
    let fir = ["One","Two","Three"]
    let f;
    
    function gotChange()
    {
        console.log('In gotChange')
        changeLog(true)
        
    } 
    const setPreference = async (e) => {
        e.preventDefault()
        
        const fbr = e.target.One.value
        const sbr = e.target.Two.value
        const tbr = e.target.Three.value
        //console.log(fbr)
        
        const fname = student[0].courseno;
        const sname = student[1].courseno;
        const tname = student[2].courseno;
        changeLog(true)
        var obj = {fname,sname,tname,fbr,sbr,tbr}
        const token = (new Cookies()).get('idToken')
        const res = await fetch('http://localhost:5000/student_set', {
            method: 'POST',
            headers:{
                'Authorization':'Bearer '+ token,
                'Content-type':'application/json'
            },
            body:JSON.stringify(obj)
        })
        const data = await res.json()
        
        console.log(isLog)
        changeLog(true)
        console.log(isLog)
        
        if(!data.err)
        {
            //changeUploaded(true)'
        }
    }


    const getGradesContentsem1 = student => {
            let content = [];
            for (let i = 0; i < student.length; i++) {
              const item = student[i];
              Breadth.push(item.courseno);
              content.push(<Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column sm={2}>
              {item.name}
              </Form.Label>
              <Col sm={10}>
              <Form.Control type="text" placeholder="Preference No" name={fir[i]}/>
              </Col>
          </Form.Group>);}
      return content;
   }

 

    const getUser = async () => {
        f=0;
        const token = (new Cookies()).get('idToken')
        const res = await fetch('http://localhost:5000/student_breadth', {
            method:'GET',
            headers:{
                'Authorization':'Bearer '+ token
            }
        })
        const data = await res.json()
        
        console.log(data)
        console.log(data.total)
        if(data.total >= 3 || data.sem !=2)
        {
            changeLog(true)
        }
        else
        {
            changeStudent(
                data.breadthList
        )

        }
        
        changeFetchstatus(true)
     
    }


    const getUpload = async (e) => {
        const token = (new Cookies()).get('idToken')
        const res = await fetch('http://localhost:5000/student_check', {
            method:'GET',
            headers:{
                'Authorization':'Bearer '+ token
            }
        })
        const data = await res.json()
        //clearconsole.log(data)
        console.log(data)
        if(data.a>=3)
        {
            changeLog(true)
        }
        
        getUser()
        
     
    }

    
    useEffect(() => {
        if(isfetched === false)
        {
            getUser()
            
        }
        
    },[isfetched])
    
    return (
          <Container>
              
               <hr></hr>
               {isLog === true? <div><h1>Already alloted</h1></div>:
               <Form onSubmit = {setPreference}>
                 
                    {getGradesContentsem1(student)}

          
                    
                

                <Form.Group as={Row}>
                    <Col sm={{ span: 10, offset: 2 }}>
                    <Button type="submit">Submit</Button>
                    </Col>
                </Form.Group>
                </Form>
                 }
                
              
              
              
              
          </Container>

        
    );
}