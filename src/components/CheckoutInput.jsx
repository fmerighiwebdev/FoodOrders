import React from 'react'

function CheckoutInput({ className, name, type, onChange, children }) {
  return (
    <div className={className}>
      <label htmlFor={name}>{children}</label>
      <input type={type} name={name} onChange={onChange}></input>
    </div>
  );
}

export default CheckoutInput