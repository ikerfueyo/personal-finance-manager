import React, { useState } from 'react';
import { createTransaction } from '../services/transactionService';

const TransactionForm = ({ onSubmit }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const newTransaction = await createTransaction({ amount, category, date });
      setAmount('');
      setCategory('');
      setDate('');
      if (onSubmit) {
        onSubmit(newTransaction);
      }
    } catch (error) {
      setError('Error creating transaction');
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="alert alert-danger">{error}</div>}
      
      <div className="form-group">
        <label>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
};

export default TransactionForm;
