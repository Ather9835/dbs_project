import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import '../../css/home.css'

function Navigation({ setFormType })
{
  
  return (
    
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <div id="nav-container">
                        <div id="nav-data-container">
                            <ul class="navbar-nav mr-auto">
                                    <li class="nav-item active">
                                            <button
                                            class="nav-link"
                                            onClick={() => { setFormType('home') }}
                                            >
                                                    Home <span class="sr-only">(current)</span>
                                            </button>
                                    </li>
                                    <li class="nav-item">
                                            <button
                                            class="nav-link"
                                            >
                                                Faculty
                                            </button>
                                    </li>
                                    <li class="nav-item">
                                            <button
                                            class="nav-link"
                                            >
                                                About
                                            </button>
                                    </li>
                                    
                            </ul>
                        </div>
                        <div id="nav-form-container">
                            <ul class="navbar-nav mr-auto">
                                    <li class="nav-item">
                                        <div style={{
                                            height: "100%",
                                            padding: "15% 0",
                                            paddingRight: "1rem",
                                            fontWeight: "bold",
                                            color: "white"
                                        }}>
                                            Login
                                        </div>
                                    </li>
                                    <li class="nav-item">
                                            <Button
                                             variant="success"
                                             onClick={() => { setFormType('student') }}
                                             >
                                                Student
                                            </Button>
                                    </li>
                                    <li class="nav-item">
                                             <Button
                                             variant="success"
                                             onClick={() => { setFormType('faculty') }}
                                             >
                                                 Faculty
                                            </Button>
                                    </li>
                                    <li class="nav-item">
                                             <Button
                                             variant="success"
                                             onClick={() => { setFormType('institute') }}
                                             >
                                                 Institute
                                            </Button>
                                    </li>
                            </ul>
                        </div>
                    </div>
                </div>
        </nav>
    
  );
}

export default Navigation;
