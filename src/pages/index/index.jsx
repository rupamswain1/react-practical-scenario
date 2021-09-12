import React from 'react'
import AgGridComponent from '../../components/agGrid/agGrid.component';
import {Link} from 'react-router-dom'
function Index() {
    const customLinkRender=(params)=>{
        console.log(params)
        return(<Link to={`/${params.value}`}>{params.value}</Link>)
    }
    const columns=[{
        headerName:'S.No',
        field:'sno'
    },
    {
        headerName:"Page Name",
        field:'pageName',
        cellRendererFramework:customLinkRender,
    }
    ]

    const fetchData=async()=>{
        const data=[
            {sno:1,pageName:'AG-Grid'}
        ]
        return data;
    }
    const defaultColumnDef={
        sortable:true, editable:false, filter:true,enableRowGroup: true,flex:1
    }
    let pageName="Index"
    document.title=pageName
    return (
        <React.Fragment>
            <div>
                <AgGridComponent pagename={pageName} columnData={columns} fetchData={fetchData} defaultColumnDef={defaultColumnDef}/>
            </div>
        </React.Fragment>
    )
}

export default Index
