import React from 'react'
import DateView from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import {Field,ErrorMessage} from 'formik';
import ErrorText from './errorText.component';
function Datepicker({label, name,...rest}) {
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <Field name={name}>
                {
                    ({form,field})=>{
                        const {setFieldValue}=form;
                        const {value}=field;
                        return <DateView id={name} {...field} {...rest} selected={value} onChange={val=>setFieldValue(name,val)}/>
                    }
                }
            </Field>
            <ErrorMessage name={name} component={ErrorText}/>
        </div>
    )
}

export default Datepicker
