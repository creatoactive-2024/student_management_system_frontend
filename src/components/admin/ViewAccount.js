import React, { useEffect, useState } from 'react';
import '../admin-styles/viewAccount.css';
import {
  ExclamationCircleOutlined,
  EditOutlined,
  SearchOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const ViewAccount = () => {
  const [customerData, setCustomerData] = useState([]);

  useEffect(() => {
    // Make a GET request to your API endpoint to fetch the data
    fetch('http://localhost:5005/getAllCustAccData')
      .then((response) => response.json())
      .then((data) => setCustomerData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Customer and Account Data Table</h1>
      <table>
        <thead>
          <tr>
          <th>Customer ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Account Number</th>
            <th>Account Type</th>
            {/* Add more table headers for other account fields */}
          </tr>
        </thead>
        <tbody>
          {customerData.map((customerDataItem) => (
            customerDataItem.accounts.map((account) => (
              <tr key={account._id}>
                <td>{customerDataItem.customer.customerID}</td>
                <td>{`${customerDataItem.customer.firstname} ${customerDataItem.customer.lastname}`}</td>
                <td>{customerDataItem.customer.email}</td>
                <td>{customerDataItem.customer.mobile}</td>
                <td>{account.accountNumber}</td>
                <td>{account.accountType}</td>
                {/* Add more table data for other account fields */}
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAccount;
