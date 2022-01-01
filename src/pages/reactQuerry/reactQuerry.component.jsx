import React from 'react'
import {Link} from 'react-router-dom'

function ReactQuerry({match}) {
    console.log(match);
    return (
        <div>
           <ol>
               
               <li><Link to={`${match.path}/fetch`} >React Query Fetch Example</Link></li>
               <li><Link to={`${match.path}/error`} >React Query Error Example</Link></li>
               <li><Link to={`${match.path}/refertchOnMount`} >React Query RefetchOnMount Example</Link></li>
               <li><Link to={`${match.path}/refertchOnWindowFocus`} >React Query RefetchOnWindowFocus Example</Link></li>
               <li><Link to={`${match.path}/polling`} >React Query Polling Example</Link></li>
               <li><Link to={`${match.path}/fetchOnclick`} >React Query Fetch on Click Example</Link></li>
               <li><Link to={`${match.path}/successAndError`} >React Query Success and Error call back Example</Link></li>
               <li><Link to={`${match.path}/dataTransformation`} >React Query Data Transform and customHook Example</Link></li>
               <li><Link to={`${match.path}/querryById`} >React Query By Id Example</Link></li>
           </ol>
        </div>
    )
}

export default ReactQuerry
