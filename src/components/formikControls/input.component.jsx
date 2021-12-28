import React from 'react'
import {Field, ErrorMessage} from 'formik'
import ErrorText from './errorText.component'
function Input({name, label, ...rest}) {
    return (
        <div className='form-element'>
            <label htmlFor={name}>{label}</label>
            <Field id={name} name={name} {...rest}/>
            <ErrorMessage name={name} component={ErrorText}/>
        </div>
    )
}

export default Input
