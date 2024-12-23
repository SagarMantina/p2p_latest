import React, { useState,useEffect } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import './CreditCardForm.css'

// Utility functions to format card data
function clearNumber(value = "") {
  return value.replace(/\D+/g, "");
}

export function formatCreditCardNumber(value) {
  if (!value) {
    return value;
  }

  const clearValue = clearNumber(value);

  // Limit the card number to 16 digits
  const limitedValue = clearValue.slice(0, 16);

  // Format the card number into groups of 4
  const nextValue = `${limitedValue.slice(0, 4)} ${limitedValue.slice(4, 8)} ${limitedValue.slice(8, 12)} ${limitedValue.slice(12, 16)}`;

  return nextValue.trim();
}

export function formatCVC(value, prevValue, allValues = {}) {
  const clearValue = clearNumber(value);
  let maxLength = 3; // Always use 3 digits for CVC now, regardless of card type

  return clearValue.slice(0, maxLength);
}

export function formatExpirationDate(value) {
  const clearValue = clearNumber(value);

  if (clearValue.length >= 3) {
    return `${clearValue.slice(0, 2)}/${clearValue.slice(2, 4)}`;
  }

  return clearValue;
}

export function formatFormData(data) {
  return Object.keys(data).map((d) => `${d}: ${data[d]}`);
}

const CreditCardForm = ({ card }) => {
  const [state, setState] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    issuer: card || 'maestro',
    focused: "",
    formData: null
  });

  useEffect(() => {
    // Reset the state when the card prop changes
    setState({
      number: "",
      name: "",
      expiry: "",
      cvc: "",
      issuer: card || 'visa',
      focused: "",
      formData: null
    });
  }, [card]);

  const handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      setState((prevState) => ({ ...prevState, issuer }));
    }
  };

  const handleInputFocus = (e) => {
    setState((prevState) => ({ ...prevState, focused: e.target.name }));
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;

    if (name === "number") {
      value = formatCreditCardNumber(value);
    } else if (name === "expiry") {
      value = formatExpirationDate(value);
    } else if (name === "cvc") {
      value = formatCVC(value, null, state);
    } else if (name === "name") {
      // Limit name to 26 characters
      value = value.slice(0, 26);
    }

    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Handle form submission logic here, e.g., API call or validation
    console.log('Form submitted with the following data:', state);
  };

  return (
    <div className='creditcardform'>
      <Cards
        number={state.number}
        expiry={state.expiry}
        name={state.name}
        cvc={state.cvc}
        focused={state.focused}
        preview={true}
        issuer={card}
        acceptedCards={['visa', 'mastercard', 'unionpay', 'maestro']}
        callback={handleCallback}
      />
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <input
            type="tel"
            name='number'
            className='form-control'
            placeholder='Card Number'
            pattern='[\d| ]{16,22}'
            required
            maxLength={16}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Name"
            maxLength={26} // Ensure no more than 26 characters
            required
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
        </div>
        <div className="row">
          <div className="col-6">
            <input
              type="tel"
              name="expiry"
              className="form-control"
              placeholder="Valid Thru"
              pattern="\d\d/\d\d"
              required
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>
          <div className="col-6">
            <input
              type="tel"
              name="cvc"
              className="form-control"
              placeholder="CVC"
              maxLength={3}
              pattern="\d{3,4}"
              required
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>
        </div>
        <input type="hidden" name="issuer" value={state.issuer} />
      </form>
    </div>
  );
};

export default CreditCardForm;
