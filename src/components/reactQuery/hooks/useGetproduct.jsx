import {useQuery} from 'react-query';

const getProduct=({queryKey})=>{
    console.log(queryKey);
    const prodId=queryKey[1].prodId;
    return fetch(`https://fakestoreapi.com/products/${prodId}`).then(res=>res.json())
}

const useGetProduct=(prodId)=>{
   console.log(prodId);
   return useQuery([`product-${prodId.prodId}`,prodId],getProduct)
}

export default useGetProduct;