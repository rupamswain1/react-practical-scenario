import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as yup from 'yup';
import './formikComponent.style.scss'
function FormikComponent() {
    const initialValue={
        name:'',
        email:'',
        age:'',
        address:''
    }
    const onSubmit=values=>{
        console.log(values);
    }
    const validationSchema=yup.object({
        name:yup.string().required('Name is Required'),
        email:yup.string().email('email should be an email').required('email is required'),
        age:yup.number().required('age is required').min(18,'age should be above 18'),
        address:yup.string().required('address is required')
    })
    return (
        <div className='formikForm'>
            <Formik 
                initialValues={initialValue}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                <Form className='formlink__form'>
                    <label htmlFor='name'>Name</label>
                    <Field type='text' id='name' name='name'/>
                    <ErrorMessage name='name' component='div'/> {/*as the component is provided as div, it will render as a div elements, similarly a component can be added*/}
                    <label htmlFor='email'>Email</label>
                    <Field type='email' id='email' name='email'/>
                    <ErrorMessage name='email'>   {/*this is also a way to render error message*/}
                    {
                        error=><div>{error}</div> 
                    }    
                     </ErrorMessage>
                    <label htmlFor='age'>Age</label>
                    
                    <Field type='number' id='age' name='age'/>
                    <ErrorMessage name='age'/>
                    <lable htmlFor='address'>Address</lable>
                    <Field name='address'>
                        {
                            props=>{
                                const {field,form,meta}=props;
                                console.log('render props',props);
                                return(
                                    <>
                                        <input type='text' id='address' {...field}/>
                                        {meta.touched && meta.error?<div>{meta.error}</div>:null}
                                    </>
                                )
                            }
                        }
                    </Field>
                    <button className='submitButton'>Submit</button>

                </Form>
            </Formik>
        </div>
    )
}

export default FormikComponent
