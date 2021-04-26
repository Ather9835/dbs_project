import React, { useState, useRef } from 'react';
import { Redirect } from 'react-router-dom'
import Cookies from 'universal-cookie'
import 'bootstrap/dist/css/bootstrap.min.css';
import{Button, Form,Col,Row,Container}  from 'react-bootstrap';

function Student()
{
    const [isLoggedIn, changeLoggedStatus] = useState(false)

    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const loginStudent = async (e) => {
        e.preventDefault()
        const email = emailRef.current.value
        const password = passwordRef.current.value
        const res = await fetch('http://localhost:5000/student_login', {
            method: 'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify({email, password})
        })
        const data = await res.json()
        if(!data.err)
        {
            const token = data.token
            const cookie = new Cookies()
            cookie.set('idToken', token, { path:'/' })
            changeLoggedStatus(true)
        }
    }
  
  return (
        isLoggedIn===true?
        <Redirect to="/student"/>:
        <Container className="my-4">
                <div class="text-center my-5 font-weight-bold">Login as student</div>
        <Row>
                <Col></Col>
                <Col xs={6}>

                        <Form onSubmit={loginStudent}>
                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="2" />
                                        <Col sm="8">
                                        <Form.Control type="text" placeholder="Email" ref={emailRef} />
                                        </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                        <Form.Label column sm="2" />
                                        <Col sm="8">
                                        <Form.Control type="password" placeholder="Password" ref={passwordRef} />
                                        </Col>
                                </Form.Group>
                                <div class="text-center">
                                        <Button variant="primary" type="submit">
                                                Submit
                                        </Button>
                                </div>
                        </Form>
                </Col>
                <Col></Col>
        </Row>
        </Container> 
    
  );
}

export default Student;