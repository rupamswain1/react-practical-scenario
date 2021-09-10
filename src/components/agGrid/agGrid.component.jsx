import React,{useState,useEffect} from 'react'
import TopNavigationBar from '../UI-elements/topNavigationBar/topNavigationBar.component';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
function AgGridComponent({columnData,rowData,defaultColumnDef,fetchData}) {
    const[columns,setColumns]=useState(columnData);
    const [gridApi,setGridApi]=useState(null);
    const [gridColumnApi,setGridColumnApi]=useState(null)
    useEffect(()=>{console.log('rendering')},[columns])
   
    //For Excel Export
    const onGridReady=async (params)=>{
        setGridApi(params.api)
        console.log(params.columnApi)
        setGridColumnApi(params.columnApi)
        const data=await fetchData();
        console.log(data)
        params.api.applyTransaction({add:data})
        console.log(gridColumnApi)
    }
    //Excel Export
    const exportData=()=>{
        gridApi.exportDataAsCsv();
    }
    //row selection
    const onSelectionChanged=(event)=>{
        console.log(event.api.getSelectedRows())
    }
    const setColumnVisibility=(event)=>{
        this.agGrid.columnApi.setColumnsVisible('title', true);
        //gridOptions.columnApi.setColumnVisible() 
        gridColumnApi.setColumnVisibility(event.target.className,!event.target.checked)
        // let modiFiedCols=columns.map((col)=>{
        //     if(col.field===event.target.name){
        //         col['hide']=!event.target.checked
        //     }
        //     return col;
        // })
        // setColumns(new Array(...modiFiedCols))
        // console.log(columns)
        // console.log(event.target.name)
        // console.log(!event.target.checked)
    }
    return (
        <React.Fragment>
            <TopNavigationBar exportData={exportData} defaultColumns={columns} setColumnVisibility={setColumnVisibility}/>
            <div className="ag-theme-alpine" style={{height: '89vh', width: '100vw'}}>
                    
                        <AgGridReact 
                             
                            columnDefs={columns} 
                            defaultColDef={defaultColumnDef} 
                            onGridReady={onGridReady}
                            enableBrowserTooltips={true}
                            tooltipShowDelay={{tooltipShowDelay:2}} 
                            rowSelection={'single'}
                            onSelectionChanged={onSelectionChanged}
                            pagination={true}
                            paginationPageSize={15}
                        >
                            <AgGridColumn field="id"></AgGridColumn>
                        </AgGridReact>
                    
            </div>
        </React.Fragment>
    )
}

export default AgGridComponent
