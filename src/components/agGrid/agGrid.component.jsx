import React,{useState,useEffect} from 'react'
import TopNavigationBar from '../UI-elements/topNavigationBar/topNavigationBar.component';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
const AgGridComponent=({columnData,rowData,defaultColumnDef,fetchData})=>{
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const[columns,setColumns]=useState(columnData);
    
    //For Excel Export
    
    const onGridReady = (params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
        fetchData().then(data=>{
            params.api.applyTransaction({add:data})
    
            
        });
        console.log(gridApi);
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
    function setColumnVisibility(event,params){
        //console.log(params)
        //this.agGrid.columnApi.setColumnsVisible('title', true);
         
        gridApi.setColumnVisibility(event.target.className,!event.target.checked)
        
    }
    return (
        <React.Fragment>
            <TopNavigationBar exportData={exportData} defaultColumns={columns} setColumnVisibility={setColumnVisibility}/>
            <div className="ag-theme-alpine" style={{height: '89vh', width: '100vw'}}>
                    
                        <AgGridReact 
                             
                            columnDefs={columns} 
                            defaultColDef={defaultColumnDef} 
                            sideBar={{ toolPanels: ['columns'] }}
                            rowGroupPanelShow={'always'}
                            debug={true}
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
