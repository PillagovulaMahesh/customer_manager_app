// src/components/AddressList.js
import React, { useEffect, useState } from 'react';
import API from '../api';

const AddressList = ({ customerId, onEdit, onDelete }) => {
  const [addresses, setAddresses] = useState([]);

  const fetchAddresses = async () => {
    try {
      const res = await API.get(`/addresses?customerId=${customerId}`);
      setAddresses(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (customerId) fetchAddresses();
  }, [customerId]);

  return (
    <div>
      <h3>Addresses</h3>
      <table>
        <thead>
          <tr>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Pin Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {addresses.map(addr => (
            <tr key={addr.id}>
              <td>{addr.address_details}</td>
              <td>{addr.city}</td>
              <td>{addr.state}</td>
              <td>{addr.pin_code}</td>
              <td>
                <button onClick={() => onEdit(addr)}>Edit</button>
                <button onClick={() => onDelete(addr.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddressList;
