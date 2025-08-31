// src/pages/CustomerFormPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CustomerForm from '../components/CustomerForm';
import API from '../api';

const CustomerFormPage = () => {
  const { id } = useParams(); // for edit
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    if (id) {
      API.get(`/customers/${id}`)
        .then(res => setCustomer(res.data))
        .catch(err => console.error(err));
    }
  }, [id]);

  const handleSave = () => {
    navigate('/customers'); // redirect back to list
  };

  return (
    <div>
      <h1>{id ? 'Edit' : 'Add'} Customer</h1>
      <CustomerForm customer={customer} onSave={handleSave} />
    </div>
  );
};

export default CustomerFormPage;
