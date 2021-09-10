import React,{useState,useEffect} from 'react'
import {AgGridColumn, AgGridReact} from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
function AgGridComponent() {
    const [data,setData]=useState();
    useEffect(()=>{
        fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>setData(json))
    },[])
    const columns=[
        {
            headerName:'Id',
            field:'id'
        },
        {
            headerName:'Title',
            field:'title'
        },
        {
            headerName:'Price',
            field:'price'
        },
        {
            headerName:'Price',
            field:'price'
        },
        {
            headerName:'Category',
            field:'category'
        },
        // {
        //     headerName:'Rating',
        //     field:'rating'
        // }
    ]
    
    return (
        <div className="ag-theme-alpine" style={{height: 1000, width: 5000}}>
                {data?
                    <AgGridReact rowData={data} columnDefs={columns}>
                        <AgGridColumn field="id"></AgGridColumn>
                    </AgGridReact>
                :
                <div>Loading</div> }   
        </div>
    )
}

export default AgGridComponent
