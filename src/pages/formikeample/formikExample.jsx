import React from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';
import './formikExample.style.scss';
function FormikExample() {
    const validationSchema=yup.object({
        name:yup.string().required('Name is Required'),
        email:yup.string().email('email should be an email').required('email is required'),
        age:yup.number().required('age is required').min(18,'age should be above 18')
    })
    const formik=useFormik({
        initialValues:{
            name:'',
            email:'',
            age:''
        },
        onSubmit:values=>{console.log(values);},
        validationSchema

        //#the below validation can be replaced with a library 'yup', refer to const validationSchema and it replaces the below code

        // validate:values=>{ //validation rules for the fields
        //     let errors={};
        //     if(!values.name){
        //         errors.name='this is required'
        //     }
        //     if(!values.email){errors.email='email is required'}
        //     if(!values.age){
        //         errors.age='age is required'
        //     }
        //     else if(values.age<18){
        //         errors.age='age should be greater than 18'
        //     }

        //     return errors;
        // }
    })
  // console.log(formik.touched);//formik.touched will keep record of values of field that are visited
   //the onBlur,onChange,value method can be replaced with ...formil.getFieldProps(name of field)
    return (
        <div className='formikForm' onSubmit={formik.handleSubmit} onBlur={formik.handleBlur}>
            <form className='formlink__form' onChange={formik.handleChange}>
                <label htmlFor='name'>Name</label>
                <input type='text' id='name' name='name' value={formik.values.name}/>
                {formik.touched.name && formik.errors.name?<div>{formik.errors.name}</div>:null}
                <label htmlFor='email'>Email</label>
                <input type='email' id='email' name='email' value={formik.values.email}/>
                {formik.touched.email && formik.errors.email?<div>{formik.errors.email}</div>:null}
                <label htmlFor='age'>Age</label>
                
                <input type='number' id='age' name='age' {...formik.getFieldProps('age')}/>
                {formik.touched.age && formik.errors.age?<div>{formik.errors.age}</div>:null}
                <button className='submitButton'>Submit</button>
            </form>
        </div>
    )
}

export default FormikExample
