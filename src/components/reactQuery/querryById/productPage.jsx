import React from 'react'
import {useParams, useParrms} from 'react-router-dom';
import useGetProduct from '../hooks/useGetproduct';
function ProductPage() {
    const prodId=useParams()
    const {isLoading,data}=useGetProduct(prodId)
    console.log(data);
    return (
        <div>
           {
               isLoading?
                <div> Loading ........</div>
                :
                <div>
                    <h1>{data.category}</h1>
                    <h2>{data.title}</h2>
                    <h3>{data.description}</h3>
                    <div>Price: <h2>{data.price}</h2></div>
                    <img src={data.image} alt='image' height='500px' width='500px'/>
                   
                </div>
           }
        </div>
    )
}

export default ProductPage
