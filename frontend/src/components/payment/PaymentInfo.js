import React from 'react'
import './PaymentInfo.css'
import CreditCardForm from './CreditCardForm'
const PaymentInfo = ({selectedMethod, selectedCard, onMethodChange}) => {
  const handlePurchase = async () => {
    try {
      //rediredct to payment page

      window.location.href = ('/purchase');
      
    } catch (error) {
      console.error("Error purchasing games:", error);
      alert("Error processing the purchase");
    }
  };
  return (
    <div className='paymentinfo'>
        <div className='options'>
            <label htmlFor="methods">Please select a payment method</label>
            <select 
            name="methods"
            id="methods"
            value={selectedMethod}
            onChange={onMethodChange}>
                <option value="visa">Visa</option>
                <option value="mastercard">Master Card</option>
                <option value="maestro">Maestro</option>
                <option value="unionpay">Union Pay</option>
            </select>
        </div>
        <div className='carddetails'>
            <p>Enter Credit Card Details</p>
            <CreditCardForm card={selectedCard} />
        </div>

        <div className='billingdetails'>
          <p>Billing Information</p>
          <div className='billinginfo'>
          <div class="name-fields">
        <div class="input-group">
            <label for="fname">First Name</label>
            <input type="text" id="fname" name="firstname"  />
        </div>
        <div class="input-group">
            <label for="lname">Last Name</label>
            <input type="text" id="lname" name="lastname"  />
        </div>
      `</div>
        <div className='input-group'>
          <label for="address">Address</label>
          <input type="text" id='address' name='address' />
        </div>
        <div className='input-group'>
        <label for="number">Mobile Number</label>
        <input type="number" id='number' name='number' />
      </div>
          </div>
        </div>
        <p style={{color:'white'}}>You'll have a chance to review your order before it's placed.</p>
        <button className='continueBtn' onClick={handlePurchase}>Continue</button>
    </div>
  )
}

export default PaymentInfo