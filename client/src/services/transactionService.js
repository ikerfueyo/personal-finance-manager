import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Adjust based on backend URL

export const createTransaction = async (transactionData) => {
  try {
    const response = await axios.post(`${API_URL}/transaction`, transactionData);
    return response.data;
  } catch (error) {
    console.error('Error creating transaction:', error);
    throw error;
  }
};

export const fetchTransactions = async () => {
  try {
    const response = await axios.get(`${API_URL}/transaction`);
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};
