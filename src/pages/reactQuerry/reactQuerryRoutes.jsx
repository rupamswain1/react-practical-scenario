import React from 'react'
import {Switch,Route,Link} from 'react-router-dom'
import ReactQuerry from './reactQuerry.component'
import ReactQuerryError from '../../components/reactQuery/reactQuerryError'
import {QueryClientProvider, QueryClient} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
import FetchQuery from '../../components/reactQuery/fetchQuery/fetchQuery.component'
function ReactQuerryRoutes({match}) {
    return (
        <Switch>
            <QueryClientProvider client={new QueryClient}>
                <h3><Link to={`${match.path}`}>Back to Home</Link></h3>
                <Route path={`${match.path}/error`} component={ReactQuerryError}/>
                <Route path={`${match.path}/fetch`} component={FetchQuery}/>
                <Route exact path={`${match.path}`} component={ReactQuerry}/>
                <ReactQueryDevtools position='bottom' initialIsOpen={false}/>
            </QueryClientProvider>
        </Switch>
    )
}

export default ReactQuerryRoutes
