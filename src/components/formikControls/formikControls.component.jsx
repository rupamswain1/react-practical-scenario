import React from 'react';
import Input from './input.component';
import TextArea from './textArea.component';
import Select from './select.component';
import Radio from './radio.component';
import CheckBox from './checkBox.component';
import Datepicker from './datepicker.component';
import './formikControls.style.scss'
const FormikControl=({control,...rest})=>{
    switch (control){
        case 'input':
            return(<Input {...rest}/>)
        case 'textarea':
            return(<TextArea {...rest}/>)
        case 'select':
            return(<Select {...rest}/>)
        case 'radio':
            return(<Radio {...rest}/>)
        case "checkbox":
            return(<CheckBox {...rest}/>)
        case 'date':
            return(<Datepicker {...rest}/>)
        default: return null
    }
}

export default FormikControl;