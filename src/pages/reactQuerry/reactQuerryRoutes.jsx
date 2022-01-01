import React from 'react'
import {Switch,Route,Link} from 'react-router-dom'
import ReactQuerry from './reactQuerry.component'
import ReactQuerryError from '../../components/reactQuery/reactQuerryError'
import RefetchOnMount from '../../components/reactQuery/refetchOnMount';
import RefetchOnWindowFocus from '../../components/reactQuery/refetchOnWindowFocus';
import ReactQueryPolling from '../../components/reactQuery/reactQueryPolling';
import FetchOnClick from '../../components/reactQuery/fetchOnClick';
import SuccessAndErrorCallback from '../../components/reactQuery/successAndErrorCallback';
import DataTransformation from '../../components/reactQuery/dataTransformation';
import QuerryById from '../../components/reactQuery/querryById/querryById';
import ProductPage from '../../components/reactQuery/querryById/productPage';
import {QueryClientProvider, QueryClient} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
import FetchQuery from '../../components/reactQuery/fetchQuery/fetchQuery.component'
function ReactQuerryRoutes({match}) {
    return (
        <Switch>
            <QueryClientProvider client={new QueryClient}>
                <h3><Link to={`${match.path}`}>Back to Home</Link></h3>
                
                <Route exact path={`${match.path}/querryById`} component={QuerryById}/>
                <Route path={`${match.path}/dataTransformation`} component={DataTransformation}/>
                <Route path={`${match.path}/successAndError`} component={SuccessAndErrorCallback}/>
                <Route path={`${match.path}/fetchOnclick`} component={FetchOnClick}/>
                <Route path={`${match.path}/polling`} component={ReactQueryPolling}/>
                <Route path={`${match.path}/refertchOnWindowFocus`} component={RefetchOnWindowFocus}/>
                <Route path={`${match.path}/refertchOnMount`} component={RefetchOnMount}/>
                <Route path={`${match.path}/error`} component={ReactQuerryError}/>
                <Route path={`${match.path}/fetch`} component={FetchQuery}/>
                <Route exact path={`${match.path}`} component={ReactQuerry}/>
                <Route eact path={`${match.path}/querryById/product/:prodId`} component={ProductPage}/>
                <ReactQueryDevtools position='bottom' initialIsOpen={false}/>
            </QueryClientProvider>
        </Switch>
    )
}

export default ReactQuerryRoutes
