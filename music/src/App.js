import React from 'react';
import router from './router'
import './App.css';
import {
    BrowserRouter as Router,
    NavLink
} from 'react-router-dom'
import Components from './components'
import log from './comonentsWrap'
function App() {

 return (
     <div>
         <div>
             <Components.Search></Components.Search>
         </div>
         <div>

         </div>
         <nav>
             <Router>
                 <Components.navRoute></Components.navRoute>
                 <Components.nav></Components.nav>
             </Router>
         </nav>
     </div>
 )
}

export default App;
