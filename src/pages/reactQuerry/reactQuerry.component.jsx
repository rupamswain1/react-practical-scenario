import React from 'react'
import {Link} from 'react-router-dom'
import demo from './demo';
function ReactQuerry({match}) {
    console.log(match);
    return (
        <div>
           <ul>
               <li><Link to={`${match.path}/fetch`} >React Query Fetch Example</Link></li>
               <li><Link to={`${match.path}/error`} >React Query Error Example</Link></li>
           </ul>
        </div>
    )
}

export default ReactQuerry
