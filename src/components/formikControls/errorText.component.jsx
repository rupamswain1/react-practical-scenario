import React from 'react'

function ErrorText(props) {
    return (
        <div className='errorMessage'>
            {props.children}
        </div>
    )
}

export default ErrorText
