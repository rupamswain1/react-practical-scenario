import React from 'react'
import {Formik, Form, Field, ErrorMessage, FieldArray, FastField} from 'formik';
import * as yup from 'yup';
import './formikComponent.style.scss'
function FormikComponent() {
    const initialValue={
        name:'',
        email:'',
        age:'',
        address:'',
        social:{ //Nested objects
            instagram:'',
            facebook:''
        },
        phoneNumber:['',''], //Array objects
        toDoList:['']
    }
    const onSubmit=(values)=>{
        console.log('submit values',values);
        setTimeout(()=>{
           // onSubmitProps.setSubmitting(false)
        },2000)
    }
    const onSubmit2=(values)=>{
        console.log('submit values');
        setTimeout(()=>{
           // onSubmitProps.setSubmitting(false)
        },2000)
    }
    const validationSchema=yup.object({
        name:yup.string().required('Name is Required'),
        email:yup.string().email('email should be an email').required('email is required'),
        age:yup.number().required('age is required').min(18,'age should be above 18'),
        address:yup.string().required('address is required'),
        
    })
    const validationSchema2=yup.object({
        name:yup.string().required('Name is Required'),
        email:yup.string().email('email should be an email').required('email is required'),
        //age:yup.number().required('age is required').min(18,'age should be above 18'),
        // /address:yup.string().required('address is required'),
        
    })
   
   
    return (
        <div className='formikForm'>
            <Formik 
                initialValues={initialValue}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
                /*currently formik runs validation when user makes some changes, when tabs out i.e:on blur, or on submit*/
                    /*validateOnChange={false} this will prevent error validation whenever we type or remve text from input field*/
                    /*validationOnBlur={false} this will prevent error validation when user moves to another field*/
                
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
                    {/*when we use the normal field then the field will re render even if we enter data in any other field, but FastField only rerenders when data is entered into the same field*/}
                    <FastField name='address'>
                        {
                            props=>{
                                const {field,form,meta}=props;
                                //console.log('render props',props);
                                console.log('address render');
                                return(
                                    <>
                                        <input type='text' id='address' {...field}/>
                                        {meta.touched && meta.error?<div>{meta.error}</div>:null}
                                    </>
                                )
                            }
                        }
                    </FastField>

                    <h2 clasName='heading'>Nested Object example</h2>
                    <lable htmlFor='facebook'>Facebook</lable>
                    <Field type='text' id='facebook' name='social.facebook'/>    
                    <lable htmlFor='instagram'>Instagram</lable>
                    <Field type='text' id='instagram' name='social.instagram'/>  

                    <h2 clasName='heading'>Array Object example</h2>
                    <lable htmlFor='primaryPhone'>Primary Phone</lable>
                    <Field type='number' id='primaryPhone' name='phoneNumber[0]'/>    
                    <lable htmlFor='secondaryNumber'>Secondary Number</lable>
                    <Field type='number' id='secondaryNumber' name='phoneNumber[1]'/>

                    {/*Field array example*/}
                    <h2 clasName='heading'>Field Array example</h2>
                    <FieldArray name='toDoList'>
                        {
                            fieldArrayProps=>{
                                //console.log(fieldArrayProps);
                                const {push,remove,form} =fieldArrayProps;
                                const {values}=form
                                const {toDoList} =values;
                                return(
                                    <div>
                                        {
                                            toDoList.map((item,index)=>(
                                                <div key={index}>
                                                    <Field name={`toDoList[${index}]`}/>
                                                    {
                                                        index>0 && (
                                                            <button type='button' onClick={()=>remove(index)}>-</button>
                                                        )
                                                    }
                                                     <button type='button' onClick={()=>push()}>+</button>
                                                </div>
                                            ))
                                        }
                                    </div>
                                )
                            }
                        }
                    </FieldArray>

                    <button className='submitButton'>Submit</button>
                    
                    
                </Form>
                
            </Formik>
            <br></br>
         
            <Formik
                initialValues={initialValue}
                onSubmit={onSubmit2}
                validationSchema={validationSchema2}
                className='formikForm'
                
            >
            {
                formik=>{
                   console.log(formik);
                    return(
                        <div className='formlink__form'>
                            <h2>Manual validation and visit</h2>
                            <lable htmlFor='name'>Name</lable>
                            <Field type='text' id='name' name='name'/>
                            <ErrorMessage name='name'/>

                            <lable htmlFor='email'>Email</lable>
                            <Field type='text' id='email' name='email'/>
                            <ErrorMessage name='email'/> 
                            <br></br>
                            <button type='button' onClick={()=>formik.validateField('name')}>Validate Name</button>
                            <button type='button' onClick={()=>formik.setTouched({name:true})}>Touch Name</button>
                            <button type='button' onClick={()=>formik.validateForm()}>Validate Form</button>
                            <button type='button' onClick={()=>formik.setTouched({name:true, email:true})}>Touch All</button>

                            <div>Disable submit button for invalid values</div>
                            <button type='submit' disabled={!(formik.isValid)}>Disbale for invalid inputs</button>
                            <div>Disable submit button on submit process in progress</div>
                            <button type='submit' disabled={formik.isSubmitting}>Disbale for Submission</button>
                        </div>
                    )
                }
            }
            
            </Formik>
        </div>
    )
}

export default FormikComponent
