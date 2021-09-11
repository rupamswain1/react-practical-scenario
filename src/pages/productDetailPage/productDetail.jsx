import React,{useState,useEffect} from 'react'
import {useParams} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import MenuIcon from '@material-ui/icons/Menu';
function ProductDetails() {
    const styles = 
{

media: {
  height: 0,
  paddingTop: '56.25%', // 16:9,
  marginTop:'30'
}
  };

    const [productData, setProductData]=useState(null);
    let {id}=useParams();
    useEffect(()=>{
        fetch(`https://fakestoreapi.com/products/${id}`)
        .then(res=>res.json())
        .then(data=>{
            setProductData(data)
            //document.title(productData.title)
        })
        
    },[id])
    console.log(productData)
    return (
        <div className='mainProductPage'>
            <div className='topBar'>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <Typography variant="h6" color="inherit">
                            {productData?productData.title:'Loading Name....'}
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
            {productData?
                <div className="productDataContainer">
                    <div clasName="imageBox">
                        <img width="300" height="400" src={productData?productData.image:"Loading"} alt={productData?productData.title:'Loading Name....'}></img>
                    </div>
                    <div className="detailsBox">
                        <div className="nameContainer">
                            {productData.title}
                        </div>
                        <div className="categoryContainer">
                            {productData.category}
                        </div>
                        <div className="descriptionContainer">
                            {productData.description}
                        </div>
                        <div className="ratingContainer">
                            {productData.rating.rate}
                        </div>
                        <div className="priceContainer">
                            {productData.price}
                        </div>

                    </div>
                </div>
                :
                "Loading Data..........."
            }
        </div>
    )
}

export default ProductDetails;
