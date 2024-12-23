import React from 'react'
import { useEffect,useState } from 'react'
import Purchaseitems from '../components/purchase/Purchaseitems';
import './PurchasePage.css'
import { LoadingScreen } from '../components/LoadingScreen';
import Header from './Header';
import Footer from './Footer'

const PurchasePage = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [paymentSuccess,setpaymentSuccess] = useState(false);

    useEffect(()=>{
        const fetchReviewGames = async () => {
            try {
            } catch (error) {
                console.log(error)
                setError(error)
            }finally{
              setLoading(false)
            }
        }

        setTimeout(()=>{
                (async () => await fetchReviewGames())();
              },3000)
    },[])

    const onPayment = () => {
      setpaymentSuccess(true)
      setTimeout(() => {
        window.location.href = '/'
      }, 6000);
    }
    
    if (loading) {
    return <LoadingScreen />
    }

    if (error) {
      return <div>Error: {String(error)}</div>;
    }

  return (
   <>
   <Header />
   <div className='purchasepagemain'>
        <h1 style={{color:"white"}}>Payment Page</h1>
       <div className='purchasepagebody'>
        {!paymentSuccess ? (
           <Purchaseitems onPayment={onPayment}/>
        ): (
          <div className='paymentsuccess' >
            <video
            src="/payment.mp4" 
            autoPlay
            loop
            muted
        />
          <p>Your payment is Successful</p>
          </div>
      )}
       </div>
    </div>
    <Footer />
   </>
  )
}

export default PurchasePage