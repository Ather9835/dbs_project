import React, { useState } from 'react'
import Cookies from 'universal-cookie'
import { Redirect } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import '../../css/faculty.css'

export default function Navigation() {

    const [isLoggedIn, changeLoggedStatus] = useState(true)
    
    const logout = () => {
        const cookie = new Cookies()
        cookie.remove('idToken')    
        changeLoggedStatus(false)
    }

    return (
        isLoggedIn===false?
        <Redirect to="/" />:
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div id="nav-container">
                <div id="nav-data-container">
                    <ul class="navbar-nav mr-auto">
                            <li class="nav-item">
                                    <button
                                    class="nav-link"
                                    >
                                        
                                    </button>
                            </li>              
                    </ul>
                </div>
                <div id="nav-logout-container">
                        <Button
                        variant="danger"
                        onClick={logout}
                        >
                            Log out
                        </Button>
                </div>
            </div>
        </nav>
    )
}
