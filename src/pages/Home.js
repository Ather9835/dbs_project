import React, { useState } from 'react'
import Navigation from '../components/home/Navigation'
import Student from '../components/home/Student'
import Faculty from '../components/home/Faculty'
import {Image} from 'react-bootstrap'
import '../css/home.css'

export default function Home() {
        const [formType, changeFormType] = useState('home')
        return (
                <div
                id="home-container"
                >
                        <Navigation setFormType={formType => { changeFormType(formType) }}/>
                        <div
                        id="home-img-container"
                        className={ formType==='home'?'clear-container':'blur-container' }
                        >
                                <Image
                                src="https://www.movieloci.com/img/1824-3-Idiots/37982-Imperial-College-of-Engineering.jpg"
                                fluid
                                width="75%"
                                height="75%"
                                />
                        </div>
                        {
                                formType === 'student'?
                                <Student />:
                                formType === 'faculty'?
                                <Faculty />:
                                <div />
                        }
                </div>
        )
}
