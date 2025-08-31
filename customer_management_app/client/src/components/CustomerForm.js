// src/components/CustomerForm.js
import React, { useState, useEffect } from 'react';
import API from '../api';

const CustomerForm = ({ customer, onSave }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone_number: ''
  });

  useEffect(() => {
    if (customer) setFormData(customer);
  }, [customer]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (customer) {
        await API.put(`/customers/${customer.id}`, formData);
      } else {
        await API.post('/customers', formData);
      }
      onSave();
      setFormData({ first_name: '', last_name: '', phone_number: '' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="first_name" value={formData.first_name} onChange={handleChange} placeholder="First Name" required />
      <input name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Last Name" required />
      <input name="phone_number" value={formData.phone_number} onChange={handleChange} placeholder="Phone Number" required />
      <button type="submit">{customer ? 'Update' : 'Add'} Customer</button>
    </form>
  );
};

export default CustomerForm;
