// import React from 'react';
// import { useState } from 'react';
// import axios from "axios"; // Import Axios
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Row, Col, Breadcrumb} from 'antd';

// import AccountDetails from './AccountDetails';

// import {
//   Button,
//   Checkbox,
//   Form,
//   Input,
//   InputNumber,
//   Select,
//   Upload,
//   Radio,
//   DatePicker,
// } from "antd";
// import { PlusOutlined } from "@ant-design/icons";
// import "../admin-styles/createAccount.css";
// import { Link, useNavigate } from "react-router-dom";

// const normFile = (e) => {
//   if (Array.isArray(e)) {
//     return e;
//   }
//   return e?.fileList;
// };

// const { TextArea } = Input;
// const { Option } = Select;

// const formItemLayout = {
//   labelCol: {
//     xs: { span: 24 },
//     sm: { span: 8 },
//   },
//   wrapperCol: {
//     xs: { span: 24 },
//     sm: { span: 16 },
//   },
// };

// const tailFormItemLayout = {
//   wrapperCol: {
//     xs: {
//       span: 24,
//       offset: 0,
//     },
//     sm: {
//       span: 16,
//       offset: 8,
//     },
//   },
// };
// const LoanPigmyRepay = () => {

//       const [form] = Form.useForm();
//   const [formData, setFormData] = useState(null); // State to hold form data

//   const onFinish = async (values) => {
//     console.log("Received values of form: ", values);
//   }

//   return (
//     <>
//       <Breadcrumb>
//          <Breadcrumb.Item>
//            <Link to="">Loan Management</Link>
//          </Breadcrumb.Item>
//          <Breadcrumb.Item>Loan Pigmy Transaction</Breadcrumb.Item>
//        </Breadcrumb>
//      <Form
//       {...formItemLayout}
//       form={form}
//       name="register"
//       onFinish={onFinish}
//       initialValues={{ residence: ["zhejiang", "hangzhou", "xihu"] }}
//       style={{ maxWidth: 600 }}
//       scrollToFirstError
//     >
//       <hr></hr>
//       <h1 className="heading">Loan Pigmy Collection</h1>

//       <Form.Item
//       label="Account Number"
//       name="accountNumber"
//       rules={[
//           {
//             required: true,
//             message: "Please enter account number!",
//           },
//         ]}
//       >
//           <Input
//             type="text"
//             // value={customerId}
//             // onChange={(e) => setCustomerId(e.target.value)}
//             maxLength={4} // Limit input to 4 characters
//             placeholder='Enter Account Number'
//           />
//         </Form.Item>
//         <Form.Item
//         label="Amount"
//         name="amount"
//         rules={[
//             {
//               required: true,
//               message: "Please enter amount!",
//             },
//           ]}>
//           <Input
//             type="number"
//             // value={amount}
//             // onChange={(e) => setAmount(e.target.value)}
//           />
//         </Form.Item>

//         <Form.Item
//               name="interestRate"
//               label="Interest Rate-Loan"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please select Interest Rate!",
//                 },
//               ]}
//             >
//               <Select placeholder="Select Loan interest">
//                 <Option value="10">10%</Option>

//               </Select>
//             </Form.Item>

//             <Form.Item
//               name="numberOfDays"
//               label="Pygmy Duration"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please select Interest Rate!",
//                 },
//               ]}
//             >
//               <Select placeholder="Select pygmy interest">
//                 <Option value="100">Daily (100 Days)</Option>

//               </Select>
//             </Form.Item>

//         <Form.Item style={{ width: "100%", textAlign: "center" }}>
//           <Button type="primary" htmlType="submit" >
//             Submit
//           </Button>
//         </Form.Item>

// </Form>
//     <ToastContainer position="top-center" />
//     </>
//   )
// };

// export default LoanPigmyRepay

import React, { useState, useEffect } from "react";
import { Button, Form, Input, Select } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Result } from "antd";

const { Meta } = Card;

const { Option } = Select;

const LoanPigmyRepay = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const [customerId, setCustomerId] = useState("");
  const [customerData, setCustomerData] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [transactionType, setTransactionType] = useState("deposit");
  const [amount, setAmount] = useState("");
  const [totalAmountPaidByCust, setTotalAmountPaidByCust] = useState(null);
  const [remainingBalance, setRemainingBalance] = useState(null);
  const [remainingDays, setRemainingDays] = useState(null);


  const [selectedAccountDetails, setSelectedAccountDetails] = useState(null);

  const [formVisible, setFormVisible] = useState(true);
  const [showAmountField, setShowAmountField] = useState(true);
  const [transactionDone, setTransactionDone] = useState(false); // New state for tracking successful transactions

  const handleGoBack = () => {
    // Use window.location.reload() to refresh the page
    window.location.reload();
  };

  const fetchCustomerData = async (customerId) => {
    try {
      const response = await fetch(
        `http://localhost:5005/loanAccountList/${customerId}`
      );

      if (response.ok) {
        const data = await response.json();
        setCustomerData(data.data);
        if (
          !data.data.customerAccounts ||
          data.data.customerAccounts.length === 0
        ) {
          toast.error("Customer doesn't have a Pigmy account");
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

  const fetchAccountDetails = async (accountNumber) => {
    try {
      const response = await fetch(
        `http://localhost:5005/getPygmyData/${accountNumber}`
      );

      if (response.ok) {
        const data = await response.json();
        setSelectedAccountDetails(data);
      } else {
        toast.error("Account details not found");
        setSelectedAccountDetails(null);
      }
    } catch (error) {
      console.error("Error fetching account details:", error);
      toast.error("An error occurred while fetching account details");
      setSelectedAccountDetails(null);
    }
  };

  useEffect(() => {
    if (customerId.length === 4) {
      fetchCustomerData(customerId);
    }
  }, [customerId]);

  const handleTransactionSubmit = async () => {
    if (!customerId || !selectedAccount) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (
      !customerData ||
      !customerData.customerAccounts ||
      customerData.customerAccounts.length === 0
    ) {
      toast.error("Customer doesn't have a Pigmy account");
      return;
    }

    // Fetch selected account details
    const selectedAccountData = selectedAccountDetails || {};
    console.log("numberOfDays", selectedAccountData);

    // Update the requestData object to include interestRate and paidAmountByCust
    const requestData = {
      customerID: customerId,
      accountNumber: selectedAccount,
      accountType: "loan", // Replace with actual account type logic
      transactionType,
      amount: parseFloat(amount).toFixed(2),
      interestRate: selectedAccountData.interestRate || 0, // Default to 0 if not available
      totalRepayByCust: selectedAccountData.totalRepayByCust || 0, // Default to 0 if not available
      numberOfDays: selectedAccountData.numberOfDays || 0, // Default to 0 if not available
      accountCreationDate: selectedAccountData.accountCreationDate || 0, // Default to 0 if not available

      // Include other relevant data from selectedAccountDetails
    };

    try {
      const response = await fetch(
        "http://localhost:5005/loanPygmyRepayTrasactions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        toast.success("Transaction done successfully");

        // Update account balance and final account balance
        setTotalAmountPaidByCust(responseData.totalRepaidByCustomer);
        setRemainingBalance(responseData.data.remainingBalance);
        setRemainingDays(responseData.data.daysRemaining);

        // Mark the transaction as done
        setTransactionDone(true);

        // Only for "Close Account" transactions, show the "Account Closed Successfully" message
        if (transactionType === "closed") {
          setFormVisible(false); // Hide the form after successful submission
        }
      } else {
        toast.error("Transaction failed");
        // Get the error message from the response
        const alertResponse = await response.json();

        // Display the error message in an alert
        alert(alertResponse.error);
      }
    } catch (error) {
      console.error("Error making transaction:", error);
      toast.error("An error occurred while making the transaction");
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <h2 style={{ textAlign: "center" }}>Pigmy Account Transaction</h2>
      <br />
      <hr />
      <br />
      {formVisible && ( // Only render the form when formVisible is true
        <Form
          onFinish={handleTransactionSubmit}
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
                <p style={{ textAlign: "center", fontSize: "14px" }}>
                  Name: {customerData.basicDetails.firstname}{" "}
                  {customerData.basicDetails.lastname}
                </p>
                <p style={{ textAlign: "center", fontSize: "14px" }}>
                  Mobile: {customerData.basicDetails.mobile}
                </p>
                <p style={{ textAlign: "center", fontSize: "14px" }}>
                  Account Type: {customerData.customerAccounts[0].accountType}
                </p>
              </div>
              {/* Customer Information Card */}
            </Card>
          )}

{selectedAccountDetails && (
            <Card
              hoverable
              style={{
                width: 440,
                margin: "auto",
                marginTop: 20,
              }}
            >
              <Meta title="Account Details" style={{ textAlign: "center" }} />
              <br></br>
              <p
                style={{
                  fontSize: "14px",
                  color: "black",
                  textAlign: "center",
                }}
              >
                Account Number: {selectedAccountDetails.accountNumber}
              </p>
              <p
                style={{
                  fontSize: "14px",
                  color: "black",
                  textAlign: "center",
                }}
              >
                Interest Rate: {selectedAccountDetails.interestRateLoan}
              </p>
              <p
                style={{
                  fontSize: "14px",
                  color: "black",
                  textAlign: "center",
                }}
              >
                Loan repay Pigmy daily Amount:{" "}
                {selectedAccountDetails.pygmyDailyAmount}
              </p>
              <p
                style={{
                  fontSize: "14px",
                  color: "black",
                  textAlign: "center",
                }}
              >
                Paid Amount By Cust: {selectedAccountDetails.totalRepayByCust}
              </p>

              {/* Add more fields as needed */}
            </Card>
          )}
          <br></br>

          
          <Form.Item label="Customer ID">
            <Input
              type="text"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              maxLength={4}
            />
          </Form.Item>

          <Form.Item label="Transaction Type">
            <Select
              value={transactionType}
              onChange={(value) => {
                setTransactionType(value);
                // Toggle the visibility of the amount field based on the transaction type
                setShowAmountField(value !== "closed");
              }}
            >
              <Option value="deposit">Deposit</Option>
              <Option value="closed">Close Account</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Account">
            <Select
              value={selectedAccount}
              onChange={(value) => {
                setSelectedAccount(value);
                // Fetch account details when an account is selected
                fetchAccountDetails(value);
              }}
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
                  No Pigmy Accounts Found
                </Option>
              )}
            </Select>
          </Form.Item>
         

          {showAmountField &&
            transactionType === "deposit" && ( // Render the amount field conditionally
              <Form.Item label="Amount">
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </Form.Item>
            )}

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>

          {customerData &&
            customerData.customerAccounts &&
            customerData.customerAccounts.length === 0 && (
              <p style={{ textAlign: "center" }}>
                No savings accounts found for this customer
              </p>
            )}
          {transactionDone && transactionType !== "closed" && (
            <>
              <p style={{ textAlign: "center" }}>
                Transaction Done Successfully!
              </p>
              <p style={{ textAlign: "center" }}>
                Account remaining balance: {remainingBalance}

              </p>
              <p style={{ textAlign: "center" }}>
                Total amount paid by customer : {totalAmountPaidByCust}

              </p>
              <p style={{ textAlign: "center" }}>
                Total Remaining days : {remainingDays}

              </p>
              <Button type="primary" key="console" onClick={handleGoBack}>
                Go Back
              </Button>
            </>
          )}
        </Form>
      )}

      {/* Display the "Account Closed Successfully" message for "Close Account" transactions */}
      {transactionType === "closed" && transactionDone && (
        <Result
          status="success"
          title="Successfully Pygmy Account Is Closed!"
          subTitle="Ambreshwar Patsantha, Ambarwadi."
          extra={[
            <Button type="primary" key="console" onClick={handleGoBack}>
              Go Back
            </Button>,
          ]}
        />
      )}
    </div>
  );
};

export default LoanPigmyRepay;
