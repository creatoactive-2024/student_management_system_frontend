import React, { useState, useEffect } from "react";
import { Button, Form, Input, Select } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PlusOutlined } from "@ant-design/icons";
import "../admin-styles/createAccount.css";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "antd";
const { Meta } = Card;

const { Option } = Select;

const TransactionForm = () => {
  const [customerId, setCustomerId] = useState("");
  const [customerData, setCustomerData] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [transactionType, setTransactionType] = useState("deposit");
  const [amount, setAmount] = useState("");
  const [accountBalance, setAccountBalance] = useState(null);

  const fetchCustomerData = async (customerId) => {
    try {
      // Reset accountBalance when fetching data for a new customer
      setAccountBalance(null);
  
      const response = await fetch(
        `http://localhost:5005/getSavingAccountList/${customerId}`
      );
      if (response.ok) {
        const data = await response.json();
        setCustomerData(data.data);
        if (!data.data.customerAccounts || data.data.customerAccounts.length === 0) {
          toast.error("Customer doesn't have a savings account");
        } else {
          toast.success("Customer data loaded successfully.");
        }
      } else {
        toast.error("Customer not found");
        setCustomerData(null);
      }
    } catch (error) {
      console.error("Error fetching customer data:", error);
      toast.error("An error occurred while fetching customer data");
      setCustomerData(null);
    }
  };
  

  useEffect(() => {
    if (customerId.length === 4) {
      // Only fetch customer data when the customer ID is complete (4 digits)
      fetchCustomerData(customerId);
    }
  }, [customerId]);

  const handleTransactionSubmit = async () => {
    if (!customerId || !selectedAccount || !amount) {
      toast.error("Please fill in all required fields");
      return;
    }
  
    if (!customerData || !customerData.customerAccounts || customerData.customerAccounts.length === 0) {
      toast.error("Customer doesn't have a savings account");
      return;
    }
  
    const requestData = {
      customerID: customerId,
      accountNumber: selectedAccount,
      accountType: "Savings", // Replace with actual account type logic
      transactionType,
      amount: parseFloat(amount).toFixed(2),
    };
  
    try {
      const response = await fetch("http://localhost:5005/transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        toast.success("Transaction successful");
        console.log("responseData", responseData);
        console.log("responseData", responseData.data.accountBalance);
        setAccountBalance(responseData.data.accountBalance);
  
        // Update the UI with transaction details, e.g., responseData.data
        // You can also update the account balance if available
        // Reset the form
        setSelectedAccount("");
        setTransactionType("deposit");
        setAmount("");
      } else {
        toast.error("Transaction failed");
      }
    } catch (error) {
      console.error("Error making transaction:", error);
      toast.error("An error occurred while making the transaction");
    }
  };
  
  return (
    <div style={{ width: "100%" }}>
      <h2 style={{ textAlign: "center" }}>Savings Account Transaction</h2>
      <br />
      <hr />
      <br />
      <Form
  onFinish={(e) => handleTransactionSubmit(e)} // Pass the event object
  style={{ maxWidth: 600, margin: "auto" }}
      >
        {customerData && customerData.basicDetails && (
          <Card
            hoverable
            style={{
              width: 440,
              margin: "auto",
            }}
            cover={
              <img
                style={{
                  width: 100,
                  margin: "auto",
                }}
                src={`http://localhost:5005/uploads/${customerData.basicDetails.passportImg}`}
                alt="Passport"
              />
            }
          >
            <Meta
              style={{ textAlign: "center" }}
              title="Customer Information"
              description={customerData.basicDetails.email}
            />
            <br />
            <div>
              <p style={{ textAlign: "center", fontSize:"14px" }}>
                Name: {customerData.basicDetails.firstname}{" "}
                {customerData.basicDetails.lastname}
              </p>
              <p style={{ textAlign: "center", fontSize:"14px" }}>
                Mobile: {customerData.basicDetails.mobile}
              </p>
              <p style={{ textAlign: "center", fontSize:"14px" }}>
                Account Type: {customerData.customerAccounts[0].accountType}
              </p>
            </div>
          </Card>
        )}

        <br />
        <Form.Item label="Customer ID">
          <Input
            type="text"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            maxLength={4} // Limit input to 4 characters
          />
        </Form.Item>

        <Form.Item label="Transaction Type">
          <Select
            value={transactionType}
            onChange={(value) => setTransactionType(value)}
          >
            <Option value="deposit">Deposit</Option>
            <Option value="withdraw">Withdraw</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Account">
          <Select
            value={selectedAccount}
            onChange={(value) => setSelectedAccount(value)}
          >
            <Option value="">Select Account</Option>
            {customerData && customerData.customerAccounts ? (
              customerData.customerAccounts.map((account) => (
                <Option
                  key={account.accountNumber}
                  value={account.accountNumber}
                >
                  {account.accountNumber}
                </Option>
              ))
            ) : (
              <Option value="" disabled>
                No Savings Accounts Found
              </Option>
            )}
          </Select>
        </Form.Item>
        <Form.Item label="Amount">
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>

        {customerData && customerData.customerAccounts && customerData.customerAccounts.length === 0 && (
          <p style={{ textAlign: "center" }}>
            No savings accounts found for this customer
          </p>
        )}

        {accountBalance !== null && (
          <p style={{ textAlign: "center" }}>
            Account Balance: {accountBalance}
          </p>
        )}
      </Form>
    </div>
  );
};

export default TransactionForm;
