import React from 'react'
import {Link} from 'react-router-dom'
import demo from './demo';
function ReactQuerry({match}) {
    console.log(match);
    return (
        <div>
           <ul>
               <li><Link to={`${match.path}/demo`} >Demo component</Link></li>
           </ul>
        </div>
    )
}

export default ReactQuerry
