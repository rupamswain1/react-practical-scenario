import React,{useState} from 'react'
import {useQuery} from 'react-query'

const fetchProducts=()=>{
    return fetch('https://fakestoreapi.com/products').then(res=>res.json())
}
function RefetchOnMount() {
    const [toggle,setToggle]=useState(true)
    const {isLoading,data,status}=useQuery('title',fetchProducts,{
        staleTime:5000,
        refetchOnMount:true, //refetches the api whenever the screens is opened and data is stale, like switching to different application and opening the browser again - refetch on mount needs to be set true, watch network tab in console
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

export default RefetchOnMount
