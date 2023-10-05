import { Row, Col, Breadcrumb } from "antd";
import { Button, Form, Input, InputNumber, Select } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Result } from "antd";
import { Card } from "antd";
import { useLocation } from 'react-router-dom';


import { useAccountContext } from "../../context/AccountContext";
const { Meta } = Card;



const AccountDetails2 = () => {
  const { step1Data,accData } = useAccountContext();
  const navigate = useNavigate(); // Initialize the navigate function

  const location = useLocation();
  const { customerData } = location.state || {};


  const customerID = accData.customerID;

  const accountNumber = accData.accountNumber;
  console.log("acc no",accData.accountNumber)
  const accountType = accData.accountType;


   
  // Combine the base URL with the image filename
  const baseUrl = "http://localhost:5005/uploads/";
  const imageFilename = customerData?.basicDetails?.passportImg; // Replace with the actual field name
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
          <Button key="buy"  onClick={() => navigate("/admindashboard/existingCustomer")}>Go Back</Button>,
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
        <Meta style={{textAlign:"center"}} title="Customer Information" description={customerData?.basicDetails?.email} />
        <br />
        <div>
          <p style={{ textAlign: "center" }}>
            Name : {customerData?.basicDetails?.firstname} {customerData?.basicDetails?.lastname}
          </p>
          <p style={{ textAlign: "center" }}>Mobile Number : {customerData?.basicDetails?.mobile}</p>

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

export default AccountDetails2;
