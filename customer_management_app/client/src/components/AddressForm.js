// src/components/AddressForm.js
import React, { useState, useEffect } from 'react';
import API from '../api';

const AddressForm = ({ customerId, address, onSave }) => {
  const [formData, setFormData] = useState({
    address_details: '',
    city: '',
    state: '',
    pin_code: ''
  });

  useEffect(() => {
    if (address) setFormData(address);
  }, [address]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (address) {
        await API.put(`/addresses/${address.id}`, formData);
      } else {
        await API.post('/addresses', { ...formData, customer_id: customerId });
      }
      onSave();
      setFormData({ address_details: '', city: '', state: '', pin_code: '' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="address_details" value={formData.address_details} onChange={handleChange} placeholder="Address" required />
      <input name="city" value={formData.city} onChange={handleChange} placeholder="City" required />
      <input name="state" value={formData.state} onChange={handleChange} placeholder="State" required />
      <input name="pin_code" value={formData.pin_code} onChange={handleChange} placeholder="Pin Code" required />
      <button type="submit">{address ? 'Update' : 'Add'} Address</button>
    </form>
  );
};

export default AddressForm;
