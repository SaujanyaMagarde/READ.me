import React from 'react'
import './button.css'
function Button({
    children,
    classname="logout-button",
    ...props
} ) {
  return (
    <button className={`${classname}`} {...props}>{children}</button>
  )
}

export default Button