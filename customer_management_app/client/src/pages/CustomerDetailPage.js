// src/pages/CustomerDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';
import AddressList from '../components/AddressList';
import AddressForm from '../components/AddressForm';

const CustomerDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [editingAddress, setEditingAddress] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const fetchCustomer = async () => {
    try {
      const res = await API.get(`/customers/${id}`);
      setCustomer(res.data);
    } catch (err) {
      console.error(err);
      navigate('/customers');
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, [id, refresh]);

  const handleAddressSave = () => {
    setEditingAddress(null);
    setRefresh(prev => !prev);
  };

  const handleAddressDelete = async (addressId) => {
    if (window.confirm('Delete this address?')) {
      await API.delete(`/addresses/${addressId}`);
      setRefresh(prev => !prev);
    }
  };

  return (
    <div>
      {customer && (
        <>
          <h1>Customer Details</h1>
          <p><strong>Name:</strong> {customer.first_name} {customer.last_name}</p>
          <p><strong>Phone:</strong> {customer.phone_number}</p>

          <h2>Addresses</h2>
          <AddressForm
            customerId={customer.id}
            address={editingAddress}
            onSave={handleAddressSave}
          />
          <AddressList
            customerId={customer.id}
            onEdit={setEditingAddress}
            onDelete={handleAddressDelete}
          />
        </>
      )}
    </div>
  );
};

export default CustomerDetailPage;
