import React,{useState} from 'react'
import {useQuery} from 'react-query'
const fetchProducts=()=>{
    return fetch('https://fakestoreapi.com/products').then(res=>res.json())
}
function ReactQueryPolling() {
    const [toggle,setToggle]=useState(true)
    const {isLoading,data,status}=useQuery('title',fetchProducts,{
        refetchInterval:2000 , //refetching interval will poll the api after the provided milliseconds, by default polling remains active when the window is not in focus       
        refetchIntervalInBackground:false //setting refetchIntervalInBackground to false will stop the polling in the background
    })
    console.log(status);
    return (
        <div>
            <button onClick={()=>setToggle(!toggle)}>toggle display</button>
            {toggle?
                isLoading?<span>Loading....</span>:
                    <ul>
                        {data.map(ele=>{
                            return(
                                <li>{ele.id}{' > '}{ele.title}</li>
                            )
                        })}
                    </ul>
                :<div>Click on toggle display</div>
            }
            
        </div>
    )
}

export default ReactQueryPolling
