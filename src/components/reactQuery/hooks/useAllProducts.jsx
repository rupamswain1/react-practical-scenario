import {useQuery} from 'react-query'

const fetchProducts=()=>{
    return fetch('https://fakestoreapi.com/products').then(res=>res.json())
}

function useAllProducts({onSuccess,onError,select}) {
    const result=useQuery('allProducts',fetchProducts,{
        onSuccess,
        onError,
        select:select
    })
    console.log(select);
    return result;
    
}

export default useAllProducts
