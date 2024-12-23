import React, { useEffect, useState } from 'react';
import '../../styles/sellerstyles/SellerTransactions.css';
// import SalesInfo from '../SalesInfo';
const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:3000";
const SellerSalesInfo = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`${baseUrl}/seller/transactions`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // If you're using authentication cookies
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Parse the JSON response

        if (Array.isArray(data)) {
          setTransactions(data); // Only set if data is an array
        } else {
          setError('Invalid response format');
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch transactions'); // Set error message
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return <p>Loading transactions...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="seller-transaction-page">
      <h1>Recent Transactions</h1>
      <div className="seller-transaction-container">
        <table className="seller-transaction-table">
          <thead>
            <tr>
              <th>Buyer</th>
              <th>Seller</th>
              <th>Amount ($)</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <tr key={transaction._id}>
                  <td className="seller-highlight">{transaction.buyer.email}</td>
                  <td className="seller-highlight">{transaction.seller}</td>
                  <td className="seller-highlight">{transaction.amount.toFixed(2)}</td>
                  <td>{new Date(transaction.date).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No transactions found.</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="seller-recent-customers">
          <h2>Recent Customers</h2>
          <ul>
            {transactions.slice(0, 5).map((transaction, index) => (
              <li key={index}>{transaction.buyer.username}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SellerSalesInfo;
