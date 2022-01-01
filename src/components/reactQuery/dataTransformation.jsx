import React from 'react'
import useAllProducts from './hooks/useAllProducts'

function DataTransformation() {
    const select=(data)=>{
        
        const products=data.map(prod=>prod.title)
        //console.log(products);
        return products;
    }
    const {isLoading,data,status}=useAllProducts({select:select});
    console.log(data);
    return (
        <div>        
                {isLoading?<span>Loading....</span>:
                    <ol>
                        {data.map(ele=>{
                            return(
                                <li>{ele}</li>
                            )
                        })}
                    </ol>
                
                    }

        </div>
    )
}

export default DataTransformation
