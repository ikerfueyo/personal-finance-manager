import React from 'react';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <header className="App-header">
          <h1>Personal Finance Manager</h1>
        </header>
        <Navbar />
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
