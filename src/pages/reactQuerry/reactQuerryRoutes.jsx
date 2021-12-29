import React from 'react'
import {Switch,Route} from 'react-router-dom'
import ReactQuerry from './reactQuerry.component'
import demo from './demo';
function ReactQuerryRoutes({match}) {
    return (
        <Switch>
                <Route path={`${match.path}/demo`} component={demo}/>
               <Route path={`${match.path}`} component={ReactQuerry}/>
               
        </Switch>
    )
}

export default ReactQuerryRoutes
