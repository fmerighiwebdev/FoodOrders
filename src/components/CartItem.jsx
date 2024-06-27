import React from 'react'

function CartItem({ item }) {
  return (
    <li className='cart-item'>
        <p>{item.name} - num X ${item.price}</p>
        <div className='cart-item-actions'>
            
        </div>
    </li>
  )
}

export default CartItem