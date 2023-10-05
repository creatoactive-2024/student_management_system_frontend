// import React from 'react';
import React, { useState } from 'react';
import axios from "axios"; // Import Axios
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Row, Col, Breadcrumb} from 'antd';

import AccountDetails from './AccountDetails';

import { useAccountContext } from '../../context/AccountContext';

import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  Radio,
  DatePicker,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "../admin-styles/createAccount.css";
import { Link, useNavigate } from "react-router-dom";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const { TextArea } = Input;
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const CreateAccount = () => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState(null); // State to hold form data

  const { setStep1Data } = useAccountContext();
  const { setImageData } = useAccountContext();


  const navigate = useNavigate();
  // const history = useHistory();
  const handleNavigation = (customerID) => {
    // Use navigate to go to the second step form and include customerID as a URL parameter
    navigate(`/admindashboard/createaccount/accountForm/${customerID}`);
  };



  const onFinish = async (values) => {
    console.log("Received values of form: ", values);

    // ... Your other form submission logic ...

    const formData = new FormData();
    formData.append("firstname", values.firstName); // Use correct key 'firstName'
    formData.append("middleName", values.middleName); // Use correct key 'lastName'
    formData.append("lastname", values.lastName);
    formData.append("email", values.email);
    formData.append("gender", values.gender);
    formData.append("aadhar", values.aadhar);
    const dobString = values.dob.toISOString();
    formData.append("dob", dobString);
   
    formData.append("mobile", values.phone);
   
    formData.append("deposit", values.deposit);
    formData.append("country", values.country);
    formData.append("district", values.district);
    formData.append("taluka", values.taluka);
    formData.append("village", values.village);
    formData.append("address", values.address);
    formData.append("pincode", values.pincode);
   
    formData.append("passportImg", values.passportImg[0].originFileObj);
    formData.append("pancardImg", values.pancardImg[0].originFileObj);
    formData.append("adharImg", values.adharImg[0].originFileObj);
    formData.append("signImg", values.signImg[0].originFileObj);


    // ... Append other form data ...

    try {
      const response = await axios.post(
        "http://localhost:5005/createAccount/step1",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Use 'multipart/form-data' for FormData
          },
        }
      );

      if (response.status === 200) {
        const data1 = response.data; // Use response.data instead of response.json()
        console.log("image:", data1.passportImg);

        setStep1Data(data1);
        console.log("Response from server:", data1);
        toast.success("Basic Details saved successfully"); 
        // Use toast.success for success message
        navigate("/admindashboard/createaccount/accountForm");
        const customerID = data1.customerID; // Replace this with the actual field name from your response

        // Use the handleNavigation function to navigate to the second step form
        handleNavigation(customerID);
        setFormData(values); // Update the state with form data

      } else {
        console.error("Error:", response.statusText);
        toast.error("An error occurred"); // Use toast.error for error message
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred"); // Use toast.error for error message
    }
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }} defaultValue="+91">
        <Option value="+91">+91</Option>
        {/* <Option value="87">+87</Option> */}
      </Select>
    </Form.Item>
  );

  const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select style={{ width: 70 }} defaultValue="Rs.">
        <Option value="Rs.">₹</Option>
        {/* <Option value="CNY">¥</Option> */}
      </Select>
    </Form.Item>
  );

  const validateAadhar = (_, value) => {
    if (!value || /^\d{12}$/.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(
      new Error("Please enter a valid 12-digit Aadhar number")
    );
  };

  return (
    <>
     <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="">Account Management</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Create Account</Breadcrumb.Item>
      </Breadcrumb>
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{ residence: ["zhejiang", "hangzhou", "xihu"] }}
      style={{ maxWidth: 600 }}
      scrollToFirstError
    >
      <hr></hr>
      <h1 className="heading">Basic Details</h1>

      {/* Add First Name, Middle Name, and Last Name fields */}
      <Form.Item
        name="firstName"
        label="First Name"
        rules={[
          {
            required: true,
            message: "Please input your first name!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="middleName" label="Middle Name">
        <Input />
      </Form.Item>

      <Form.Item
        name="lastName"
        label="Last Name"
        rules={[
          {
            required: true,
            message: "Please input your last name!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "The input is not a valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="gender"
        label="Gender"
        rules={[
          {
            required: true,
            message: "Please select gender",
          },
        ]}
      >
        <Radio.Group>
          <Radio value="female"> Female </Radio>
          <Radio value="male"> Male </Radio>
          <Radio value="other"> Other </Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        name="aadhar"
        label="Aadhar Card Number"
        rules={[
          {
            required: true,
            message: "Please enter your Aadhar card number",
          },
          {
            validator: validateAadhar,
          },
        ]}
      >
        <Input placeholder="Enter Aadhar card number" />
      </Form.Item>

      <Form.Item
        name="dob"
        label="Date Of Birth"
        rules={[
          {
            required: true,
            message: "Please select Date Of Birth",
          },
        ]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[{ required: true, message: "Please input your phone number!" }]}
      >
        <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
      </Form.Item>
     
      

      {/* Add more fields here for District, Taluka, Village, Country, State, Pincode, and Address */}
      {/* ... */}

      <Form.Item
        name="country"
        label="Country"
        rules={[
          {
            required: true,
            message: "please enter Country name",
          },
        ]}
      >
        <Input defaultValue="India" />
      </Form.Item>
      <Form.Item
        name="district"
        label="District"
        rules={[
          {
            required: true,
            message: "please enter District name",
          },
        ]}
      >
        <Input defaultValue="Parbhani" />
      </Form.Item>
      <Form.Item
        name="taluka"
        label="Taluka"
        rules={[
          {
            required: true,
            message: "please enter Taluka name",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="village"
        label="Village"
        rules={[
          {
            required: true,
            message: "please enter Village name",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="address"
        label="Address"
        rules={[
          {
            required: true,
            message: "please enter your address.",
          },
        ]}
      >
        {/* <Input  /> */}
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item
        name="pincode"
        label="Pincode"
        rules={[
          { required: true, message: "Please input your pincode!" },
          { pattern: /^\d{6}$/, message: "Pincode must be 6 digits long." },
        ]}
      >
        <Input />
      </Form.Item>
<hr></hr>
<h3 style={{marginLeft:"100px"}}>Upload Doccuments</h3><br></br>

      <Form.Item
        name="passportImg"
        label="Passport Photo"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        rules={[
          {
            required: true,
            message: "Please upload passport photo.",
          },
        ]}
      >
        <Upload action="/uploads" listType="picture-card">
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
      </Form.Item>

      <Form.Item
        name="pancardImg"
        label="Pan Card Photo"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        rules={[
          {
            required: true,
            message: "Please upload pan card photo.",
          },
        ]}
      >
        <Upload action="/uploads" listType="picture-card">
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
      </Form.Item>

      <Form.Item
        name="adharImg"
        label="Adhar Card Photo"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        rules={[
          {
            required: true,
            message: "Please upload adhar card photo.",
          },
        ]}
      >
        <Upload action="/uploads" listType="picture-card">
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
      </Form.Item>

      <Form.Item
        name="signImg"
        label="Signature Photo"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        rules={[
          {
            required: true,
            message: "Please upload signature photo.",
          },
        ]}
      >
        <Upload action="/uploads" listType="picture-card">
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
      </Form.Item>





         <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" className="form-btn">
          Next
        </Button>
      </Form.Item>

      


{/* Display AccountDetails component with formData */}
{formData && <AccountDetails formData={formData} />}

    </Form>
    <ToastContainer position="top-center" />
    </>
  );
};

export default CreateAccount;
