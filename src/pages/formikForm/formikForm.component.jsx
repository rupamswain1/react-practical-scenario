import React from 'react'
import {Formik, Form} from 'formik';
import FormikControl from '../../components/formikControls/formikControls.component';
import * as yup from 'yup';

import './formikForm.style.scss';
function FormikForm() {
    const options=[
        {key:'Select an Option', value:''},
        {key:'option 1', value:'Option 1'},
        {key:'option 2', value: 'Option 2'},
        {key:'option 3', value: 'Option 3'}
    ]
    const radioOptions=[
        {key:'option 1', value:'RadioOption 1'},
        {key:'option 2', value: 'RadioOption 2'},
        {key:'option 3', value: 'RadioOption 3'}
    ]
    const checkBoxOptions=[
        {key:'option 1', value:'CheckBoxOption 1'},
        {key:'option 2', value: 'CheckBoxOption 2'},
        {key:'option 3', value: 'CheckBoxOption 3'}
    ]
    const initialValue={
        email:'',
        description:'',
        selectOptions:'',
        radioOptions:'',
        checkboxOptions:[],
        birthDate:null
    };
    const validationSchema=yup.object({
        email:yup.string().email('the field should be an email').required('This field is required'),
        description:yup.string().required('This field is required'),
        selectOptions:yup.string().required('Select the appropriate option'),
        radioOptions:yup.string().required('choose one value'),
        checkboxOptions:yup.array().min(1,'Select at leas one checkbox'),
        birthDate:yup.date().required('Birth Date is required').nullable()
    })
    const onSubmit=()=>{console.log('submit pressed');}
    return (
        <div className='form-container'>
            <Formik
                initialValues={initialValue}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {
                   
                    formikProps=>{
                        console.log(formikProps);
                        return(
                            <Form>
                                <FormikControl control='input' type='email' label='Email' name='email'/>
                                <FormikControl control='textarea' type='text' label='Description' name='description'/>
                                <FormikControl control='select' options={options} label='Select' name='selectOptions'/>
                                <FormikControl control='radio' options={radioOptions} label='Radio buttons' name='radioOptions'/>
                                <FormikControl control='checkbox' options={checkBoxOptions} label='Checkboxes' name='checkboxOptions'/>
                                <FormikControl control='date' label='Birth Date' name='birthDate'/>
                                <button type='submit'>Submit</button>
                            </Form>
                        )
                    }
                }
            </Formik>
        </div>
    )
}

export default FormikForm;