import React, { useState, useEffect } from 'react';
import { fetchTransactions } from '../services/transactionService';

const TransactionList = ({ newTransaction }) => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');

  // Fetch transactions when component mounts
  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const data = await fetchTransactions();
        setTransactions(data);
      } catch (error) {
        setError('No transactions yet.');
      }
    };

    loadTransactions();
  }, []);

  // Add newTransaction to list when it changes
  useEffect(() => {
    if (newTransaction) {
      setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
    }
  }, [newTransaction]);

  return (
    <div className="transaction-list">
      <h3>Transaction History</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            {transaction.date}: {transaction.category} - ${transaction.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
