import React from 'react'
import {Field,ErrorMessage} from 'formik';
import ErrorText from './errorText.component';

function CheckBox({label,name,options, ...rest}) {
    return (
        <>
            <label htmlFor={name}>{label}</label>
            <div className='form-element radioBtn'>
            <Field name={name} {...rest}>
                {
                    ({field})=>{
                       
                        return(
                            options.map(option=>{
                                return(
                                <div className='singleContent'>
                                    <label htmlFor={option.value}>{option.value}</label>
                                    <input type='checkbox' id={option.value} {...field} value={option.value} checked={field.value.includes(option.value)}/>
                                </div>
                                )
                            })
                        )
                    }
                }
            </Field>
            
            </div>
            <ErrorMessage name={name} component={ErrorText}/>
        </>
    )
}

export default CheckBox
