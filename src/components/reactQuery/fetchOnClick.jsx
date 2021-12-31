import React,{useState} from 'react'
import {useQuery} from 'react-query'
const fetchProducts=()=>{
    return fetch('https://fakestoreapi.com/products').then(res=>res.json())
}
function FetchOnClick() {
    const [toggle,setToggle]=useState(true)
    const {isLoading,data,status,isFetching,refetch}=useQuery('fetchOnclick',fetchProducts,{
       enabled:false
    })
    console.log(isLoading,data,status,isFetching,refetch);
    return (
        <div>
            <button onClick={refetch}>Fetch</button>
            {
                (isFetching )?<span>Loading....</span>:                    
                    data?
                        <ul>
                            {data.map(ele=>{
                                return(
                                    <li>{ele.id}{' > '}{ele.title}</li>
                                )
                            })}
                        </ul>
                    :null
                
            }
            
        </div>
    )
}

export default FetchOnClick
