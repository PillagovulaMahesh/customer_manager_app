// src/components/CustomerList.js
import React, { useEffect, useState } from 'react';
import API from '../api';

const CustomerList = ({ onEdit, onSelect }) => {
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    try {
      const res = await API.get('/customers');
      setCustomers(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async id => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      await API.delete(`/customers/${id}`);
      fetchCustomers();
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div>
      <h2>Customer List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(c => (
            <tr key={c.id}>
              <td>{c.first_name} {c.last_name}</td>
              <td>{c.phone_number}</td>
              <td>
                <button onClick={() => onSelect(c)}>View</button>
                <button onClick={() => onEdit(c)}>Edit</button>
                <button onClick={() => handleDelete(c.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
