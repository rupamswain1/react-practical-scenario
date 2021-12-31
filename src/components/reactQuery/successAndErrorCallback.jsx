import React,{useState} from 'react'
import {useQuery} from 'react-query'
const fetchProducts=()=>{
    return fetch('https://fakestoreapi.com/products').then(res=>res.json())
}
function SuccessAndErrorCallback() {
    const [toggle,setToggle]=useState(false)
    const onSuccess=(data)=>{
        setToggle(true)
        console.log('Data fetch success');
        console.log(data);
    }
    const onError=(error)=>{
        setToggle('Error Occured')
        console.log('Error Occured');
        console.log(error);
    }
    const {isLoading,data,status}=useQuery('title',fetchProducts,{
        onSuccess,onError
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
            <div>{toggle+''}</div>
            
        </div>
    )
}

export default SuccessAndErrorCallback
