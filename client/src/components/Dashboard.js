import React, { useState } from 'react';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';

const Dashboard = () => {
  const [newTransaction, setNewTransaction] = useState(null);
  const handleTransactionSubmit = (newTransaction) => {
    setNewTransaction(newTransaction);
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <TransactionForm />
      <TransactionList limit={5} />
    </div>
  );
};

export default Dashboard;
