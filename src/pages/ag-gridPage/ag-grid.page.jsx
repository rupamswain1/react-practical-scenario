import React from 'react'
import AgGridComponent from '../../components/agGrid/agGrid.component';
import {Link} from 'react-router-dom'
const AgGrid=()=>{
    
    const fetchData=async()=>{
        const res=await  fetch('https://fakestoreapi.com/products');
        const json=await res.json();
        const data=json.map((d)=>{
            d.rating=d['rating'].rate;
            d.title={name:d.title,id:d.id}
            return {...d}
        })
        return data;
    }
 
    const columns=[
        {
            headerName:'Id',
            field:'id',
            checkboxSelection:true,
            hide:false
        },
        {
            headerName:'Title',
            filter:"agTextColumnFilter",
            field:'title',
            tooltipField:"title",
            hide:false,
            //cell renderer framework will render custom component on grid
            //params are the data added to column
            cellRendererFramework:(params)=>{
                console.log(params)
               return(<Link to={`/product/${params.value.id}`}>{params.value.name}</Link>)
            }
        },
        {
            headerName:'Price',
            field:'price',
            hide:false
        },
        {
            headerName:'Price',
            field:'price',
            hide:false
        },
        {
            headerName:'Category',
            field:'category',
            hide:false
            
        },
        {
            headerName:'Rating',
            field:'rating',
            cellStyle:(params)=>{
               return params.value<3?{borderLeft:'1px red solid'}:{borderRight:'2px green solid'}
               //there is a function to return className based on condition and we can define our own classNmae
               //https://www.youtube.com/watch?v=KnKO7EOp_dM&list=PLqhnP4YYLcb4X3AgmW699wyAhoP2SYf5j&index=4
            }
        }
    ]
    //sortable defines if the columns can be sorted or not
    //Editable decides if columns can be edited or not
    //filter decides if the filter can be applied or not
    //flex spans the tABLE in entire page
    const defaultColumnDef={
        sortable:true, editable:false, filter:true,enableRowGroup: true,flex:1
    }
    return(
        <React.Fragment>
            <div>
                <AgGridComponent columnData={columns} fetchData={fetchData} defaultColumnDef={defaultColumnDef}/>
            </div>
        </React.Fragment>
    )
}
export default AgGrid;
