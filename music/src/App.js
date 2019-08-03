import React from 'react';
import router from './router'
import './App.css';
import {BrowserRouter as Router,
NavLink,} from 'react-router-dom'
import Components from './components'

function App() {

 return (
     <nav>
       <Router>
           <Components.navRoute></Components.navRoute>
            <Components.nav></Components.nav>
       </Router>
     </nav>

 )
}

export default App;
