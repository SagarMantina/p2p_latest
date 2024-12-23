import React from 'react'
import { useState } from 'react'
import './PaymentPage.css'
import PaymentMethods from '../components/payment/PaymentMethods'
import PaymentInfo from '../components/payment/PaymentInfo'
import Header from './Header'
import Footer from './Footer'


const PaymentPage = () => {

    const [selectedMethod, setSelectedMethod] = useState('visa');
    const [selectedcard,setSelectedCard] = useState('visa')

    const handleMethodClick = (methodName) => {
        setSelectedCard(methodName)
        setSelectedMethod(methodName); // Update the selected payment method when clicked
    };

    const handleMethodChange = (event) => {
        setSelectedCard(event.target.value.toLowerCase())
        setSelectedMethod(event.target.value); // Update state when dropdown changes
    };

    const paymentmethods = [
        {
            name:"visa",
            image:'https://upload.wikimedia.org/wikipedia/commons/1/16/Former_Visa_%28company%29_logo.svg',
        },
        {
            name:'mastercard',
            image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0VD7niPs0xBDnK5Wer3xTr7D_AV_TouN_LA&s",
        },
        {
           name:"maestro",
           image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlbbKx4PwB9RankOUuUXPA6iAl0xxrF6oFDQ&s",
        },{
            name:"unionpay",
            image:"https://upload.wikimedia.org/wikipedia/commons/1/1b/UnionPay_logo.svg"
        }
    ]
  return (
  <>
  <Header />
  <div className='paymentpagemain'>
        <h1>Payment Method</h1>
       <div className="paymentpagebody">
       <PaymentInfo selectedMethod={selectedMethod} selectedCard={selectedcard} onMethodChange={handleMethodChange} />
       <PaymentMethods paymentmethods={paymentmethods} onMethodClick={handleMethodClick} />
       </div>
    </div>
    <Footer />
  </>
  )
}

export default PaymentPage