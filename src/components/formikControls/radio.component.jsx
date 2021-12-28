import React from 'react'
import {Field, ErrorMessage} from 'formik'
import ErrorText from './errorText.component'

function Radio({name,label,options,...rest}) {
    return (
        <>
        <label htmlFor={label}>{label}</label>
        <div className='form-element radioBtn'>
            
            <Field name={name} {...rest}>
                {
                    ({field})=>{
                        return options.map(option=>{
                            return(
                                <div className='singleContent'>
                                    <label htmlFor={option.value}>{option.key}</label>
                                    <input type='radio' id={option.value} {...field} value={option.value} checked={field.value==option.value} />
                                </div>
                            )
                            
                        })
                    }
                }
            </Field>
           
        </div>
        <ErrorMessage name={name} component={ErrorText}/>
        </>
    )
}

export default Radio
