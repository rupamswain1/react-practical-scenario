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
        return [
            {sno:1,pageName:'AG-Grid'},
            {sno:2,pageName:'Formik-Example1'},
            {sno:3,pageName:'Formik-Component'},
            {sno:4,pageName:'FormikForm'},
            {sno:4,pageName:'react-query'}
        ]
        
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
