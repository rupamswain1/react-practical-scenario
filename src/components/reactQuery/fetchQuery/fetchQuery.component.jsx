import React,{useState} from 'react'

import {useQuery} from 'react-query'

const fetchProducts=()=>{
    return fetch('https://fakestoreapi.com/products').then(res=>res.json())
}
function FetchQuery() {
    const [toggle,setToggle]=useState(true)
    const {isLoading,data,status}=useQuery('tit',fetchProducts,{
        cacheTime:500000,
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

export default FetchQuery
