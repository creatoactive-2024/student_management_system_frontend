import { Row, Col, Breadcrumb } from "antd";
import { Button, Form, Input, InputNumber, Select } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Result } from "antd";
import { Card } from "antd";

import { useAccountContext } from "../../context/AccountContext";
const { Meta } = Card;
const AccountDetails = () => {
  const { step1Data, step2Data } = useAccountContext();
  const navigate = useNavigate(); // Initialize the navigate function


  const customerID = step1Data.customerID;
  const customerName = step1Data.firstname;
  const customerLastName = step1Data.lastname;
  const mobileNumber = step1Data.mobile;
  const accountNumber = step2Data.accountNumber;
  console.log("acc no",step2Data.accountNumber)
  const accountType = step2Data.accountType;

  // Combine the base URL with the image filename
  const baseUrl = "http://localhost:5005/uploads/";
  const imageFilename = step1Data.passportImg; // Replace with the actual field name
  const imageUrl = baseUrl + imageFilename;

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="">Account Management</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/admindashboard/createaccount">Create Account</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Add Account</Breadcrumb.Item>
        <Breadcrumb.Item>Account Details</Breadcrumb.Item>
      </Breadcrumb>

      <Result
        status="success"
        title="Successfully New Account is Created!"
        subTitle="Ambreshwar Patsantha, Ambarwadi."
        extra={[
          <Button type="primary" key="console"           onClick={() => navigate("/admindashboard/createaccount")} // Use navigate to go to the desired page
          >
            Create New Account Again
          </Button>,
          // <Button key="buy">Create New Account Again</Button>,
        ]}
      />

      <h2 style={{ textAlign: "center" }}>Account Details</h2>

      <Card
        hoverable
        style={{
          width: 700,
          margin: "auto",
        }}
        cover={
          <img
            style={{
              width: 250,
              margin: "auto",
              marginTop: "10px",
            }}
            src={imageUrl}
            alt="Passport"
          />
        }
      >
        {/* <Meta style={{textAlign:"center"}} title="Customer Information" description={customerData.basicDetails.email} /> */}
        <br />
        <div>
          <p style={{ textAlign: "center" }}>
            Name : {customerName} {customerLastName}
          </p>
          <p style={{ textAlign: "center" }}>Mobile Number : {mobileNumber}</p>

          {/* <p style={{textAlign:"center"}}>Email: {customerData.basicDetails.email}</p> */}
          <p style={{ textAlign: "center" }}>
            Account Number : {accountNumber}
          </p>
          <p style={{ textAlign: "center" }}>Account Type : {accountType}</p>
          <p style={{ textAlign: "center" }}>Customer Id : {customerID}</p>
        </div>
      </Card>

    
    </>
  );
};

export default AccountDetails;
