import React from 'react'
import './formikExample.style.scss';
function FormikExample() {
    return (
        <div className='formikForm'>
            <form className='formlink__form'>
                <label htmlFor='name'>Name</label>
                <input type='text' id='name' name='name'/>

                <label htmlFor='email'>Email</label>
                <input type='email' id='email' name='email'/>

                <label htmlFor='age'>Age</label>
                <input type='number' id='age' name='age'/>

                <button className='submitButton'>Submit</button>
            </form>
        </div>
    )
}

export default FormikExample
