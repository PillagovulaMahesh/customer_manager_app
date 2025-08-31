// src/pages/CustomerListPage.js
import React, { useState } from 'react';
import CustomerList from '../components/CustomerList';
import CustomerForm from '../components/CustomerForm';

const CustomerListPage = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleSave = () => {
    setEditingCustomer(null);
    setRefresh(prev => !prev);
  };

  return (
    <div>
      <h1>Customers</h1>

      <CustomerForm
        customer={editingCustomer}
        onSave={handleSave}
      />

      <CustomerList
        key={refresh} // forces refresh
        onEdit={setEditingCustomer}
        onSelect={setSelectedCustomer}
      />

      {selectedCustomer && (
        <div>
          <h2>Selected Customer:</h2>
          <p>{selectedCustomer.first_name} {selectedCustomer.last_name}</p>
          <p>Phone: {selectedCustomer.phone_number}</p>
        </div>
      )}
    </div>
  );
};

export default CustomerListPage;
