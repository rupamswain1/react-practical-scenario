import React from 'react'
import {useQuery} from 'react-query'

function ReactQuerryError() {
    const {isLoading,isError,error}=useQuery('err',()=>{
        return fetch('https://fakestoreapii.com/products').then(res=>res.json())
    })
    console.log(error);
    return (
        <div>
            {isLoading?<div>Loading.....</div>:
                isError?<h1>{error.message}</h1>:null
            }
        </div>
    )
}

export default ReactQuerryError
