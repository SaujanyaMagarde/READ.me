import React,{useId} from 'react'
import './input.css'
const Input = React.forwardRef(function Input ({
    label,
    type = "text",
    className = "input-field",
    ...props
},ref){
    const id = useId()
    return(
        <div className="input-container">
            {label && <label className='' htmlFor={id}>{label}</label>}
            <input type={type} className={className} ref={ref} {...props} id={id}/>
        </div>
    )
})

export default Input