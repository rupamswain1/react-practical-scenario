import React from 'react'
import useAllProducts from '../hooks/useAllProducts'
import {Link} from 'react-router-dom'
function QuerryById({match}) {

    const {isLoading,data,status}=useAllProducts({});
    console.log(data,isLoading,status);
    return (
        <div> Querry By ID Example       
            {isLoading?
                <div>Loading....</div>   
            :
                <ol>
                    {
                        data.map(prod=>{
                            return(<li><Link to={`${match.path}/product/${prod.id}`}>{prod.title}</Link></li>)
                        })
                    }
                </ol>
                
            }

        </div>
    )
}

export default QuerryById
