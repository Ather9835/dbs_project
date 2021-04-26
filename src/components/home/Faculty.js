import React, { useState, useRef } from 'react'
import { Redirect } from 'react-router-dom'
import Cookies from 'universal-cookie'

import 'bootstrap/dist/css/bootstrap.min.css'
import{Button, Form,Col,Row,Container}  from 'react-bootstrap';

function Faculty()
{
    const [errMessageStatus, modifyErrStatus] = useState(false)
    const [isLoggedIn, modifyLoggedStatus] = useState(false)

    const emailInputRef = useRef(null)
    const passwordInputRef = useRef(null)

    const submitForm = async function(e){
        
        e.preventDefault()
        const email = emailInputRef.current.value
        const password = passwordInputRef.current.value

        const res = await fetch('http://localhost:5000/faculty_login', {
            method: 'POST',
            headers:{
                'Content-type':'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        const data = await res.json()
        const tokenCookie = new Cookies()
        tokenCookie.set('idToken', data.token, { path: '/' })
        
        if(data.err)
            modifyErrStatus(true)
        else
        {
            modifyErrStatus(false)
            modifyLoggedStatus(true)
        }

    }

    return (
            isLoggedIn===true?
            <Redirect to = "/faculty"/>:
            <Container className="my-4">
                    <div class="text-center my-5 font-weight-bold">Login as faculty</div>
                    <Row>
                            <Col></Col>
                            <Col xs={6}>
                                    <Form onSubmit={submitForm}>
                                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                                    <Form.Label column sm="2" />
                                                    <Col sm="8">
                                                            <Form.Control
                                                            type="text"
                                                            placeholder="Email"
                                                            ref={emailInputRef}
                                                            />
                                                    </Col>
                                            </Form.Group>

                                            <Form.Group as={Row} controlId="formPlaintextPassword">
                                                    <Form.Label column sm="2" />
                                                    <Col sm="8">
                                                            <Form.Control
                                                            type="password"
                                                            placeholder="Password"
                                                            ref={passwordInputRef}
                                                            />
                                                    </Col>
                                            </Form.Group>
                                            
                                            <div class="text-center">
                                                    {
                                                        errMessageStatus===true?
                                                        <span className="err-message">Invalid credentials</span>:
                                                        <div/>
                                                    }
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

export default Faculty;