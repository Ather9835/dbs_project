import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Route} from 'react-router-dom';

import Home from './pages/Home'
import Faculty from './pages/Faculty'
import Student from './pages/Student'


function App()
{
  
  return (
    <div>
        <BrowserRouter>
                <Route exact path="/"><Home /></Route>
                <Route path="/faculty"><Faculty /></Route>
                <Route path="/student"><Student /></Route>
        </BrowserRouter>
    
    </div>
    
   
  );
}

export default App;
