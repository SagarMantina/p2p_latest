import React from 'react'
import './PaymentMethods.css'

const PaymentMethods = ({paymentmethods , onMethodClick}) => {
  return (
    <div className='paymentmethods'>
    <h3>Payment Methods</h3>
    <p>We accept the follwoing secure payment methods:</p>
    <div className='paymentImages'>
        {paymentmethods.map((method,index)=>(
            <img 
            key={index}
            src={method.image} 
            alt={method.name}
            onClick={()=>onMethodClick(method.name)} />
        ))}
    </div>
</div>
  )
}

export default PaymentMethods