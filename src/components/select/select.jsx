import React, { useId } from 'react'
import './select.css'
function Select({
    options,
    label,
    classname='choose',
    ...props
},ref){
    const id = useId();

  return (
    <div>
        {label && <label htmlFor={id}></label>}
        <select {...props} id={id} ref={ref} className={`${classname}`}>
            {options?.map((option) => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    </div>
  )
}

export default React.forwardRef(Select)