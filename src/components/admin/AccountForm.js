import React, { useState, useEffect } from "react";
import { Row, Col, Breadcrumb } from 'antd';
import { Link } from "react-router-dom";
import axios from "axios"; // Import Axios
import { ToastContainer, toast } from "react-toastify";
import AccountDetails from './AccountDetails';
import { useAccountContext } from '../../context/AccountContext';


import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
} from "antd";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


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

const AccountForm = () => {
  const { customerID } = useParams();
  const [form] = Form.useForm();
  const [accountType, setAccountType] = useState("");

  const navigate = useNavigate();

  const { setStep2Data } = useAccountContext();

  
  const [formData, setFormData] = useState({
    customerID: customerID, // Set customerID with the value from URL parameters
    // ...other common fields
  });

   // Update the customerID in the formData state when the URL parameter changes
   useEffect(() => {
    setFormData({
      ...formData,
      customerID: customerID,
    });
  }, [customerID]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onFinish = async (values) => {
    try {
      let requestData = { ...values };
      requestData.customerID = customerID;
      let response;
      switch (values.accountType) {
        // case "Saving-Account":
        //   requestData = {
        //     ...requestData,
        //     accountType: values.accountType,
        //     initialDepositAmt: values.initialDepositAmt,
        //     // ...additional fields specific to SavingAccount

        //   };
        //   response =  await axios.post("http://localhost:5005/savingAccount/step2", requestData);
        //   break;
          case "Savings":
            requestData = {
              ...requestData,
              accountType: values.accountType,
              initialDepositAmt: values.initialDepositAmt,
              // ...additional fields specific to SavingAccount
  
            };
            response =  await axios.post("http://localhost:5005/savingAccount/step2", requestData);
            break;
        case "FD-Account":
          requestData = {
            ...requestData,
            accountType: values.accountType,
            FDAmount: values.FDAmount,
            interestRateFD: values.interestRateFD,
            termDurationFD: values.termDurationFD,

            // ...additional fields specific to FDAccount
          };
          response = await axios.post("http://localhost:5005/FDAccount/step2", requestData);
          break;
        case "RD-Account":
          requestData = {
            ...requestData,
            accountType: values.accountType,
            monthlyDepositAmtRD:values.monthlyDepositAmtRD,
            interestRateRD: values.interestRateRD,
            termDurationRD: values.termDurationRD,

            // ...additional fields specific to RDAccount
          };
          response = await axios.post("http://localhost:5005/RDAccount/step2", requestData);
          break;
        case "Loan-Account":
          requestData = {
            ...requestData,
            accountType: values.accountType,
              interestRateLoan : values.interestRateLoan,
              loanAmount : values.loanAmount,
              numberOfDays : values.numberOfDays,
              pygmyDailyAmount : values.pygmyDailyAmount,

            // ...additional fields specific to LoanAccount
          };
          response = await axios.post("http://localhost:5005/loanAccount/step2", requestData);
          break;
          case "pygmy-Account":
      // const interestRateDecimal = parseFloat(values.interestRate) / 100; // Convert to decimal
      requestData = {
        ...requestData,
        accountType: values.accountType,
        interestRate: values.interestRate, // Send as a decimal
        pygmyDailyAmount: values.pygmyDailyAmount,
        numberOfDays: values.numberOfDays,
        // agentNamePygmyCollection: values.agentNamePygmyCollection,
        // ...additional fields specific to pygmyAccount
      };
      console.log("before",requestData);

      response = await axios.post("http://localhost:5005/pygmyAccount/step2", requestData);
      console.log("after",requestData);
      break;
          
        default:
          // Handle default case or show an error
          break;
      }
      console.log('Response from API:', response);

// After receiving the response from your API POST request

if (response && response.data) {
  // Update step2Data in the context with the response data
  const dataFromStep2 = response.data;
  setStep2Data(dataFromStep2);
  console.log("start",dataFromStep2.accountNumber)

  form.resetFields();
  setAccountType(null);
  // setFormData(values); 
  // Update the state with form data
  navigate(`/admindashboard/createaccount/accountForm/${customerID}/AccountDetails`);
  toast.success("Account is created successfully"); // Use toast.success for success message

} else {
  // Handle the case when the response does not contain data
  console.error("API error: Response data is missing or empty");
  toast.error("Failed to create an account");
}
    } catch (error) {
      console.error("API error:", error);
      toast.error("Failed to create an account");
    }
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }} defaultValue="+91">
        <Option value="+91">+91</Option>
      </Select>
    </Form.Item>
  );

  const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select style={{ width: 70 }} defaultValue="Rs.">
        <Option value="Rs.">₹</Option>
      </Select>
    </Form.Item>
  );

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
        <h1 className="heading">Account Details</h1>

        <Form.Item
          name="accountType"
          label="Account Type"
          rules={[
            {
              required: true,
              message: "Please select account type!",
            },
          ]}
        >
          <Select
            placeholder="Select account type"
            value={accountType}
            onChange={(value) => {
              setAccountType(value);
            }}
          >
            {/* <Option value="Savings-Account">Saving Account</Option> */}
            <Option value="FD-Account">FD Account</Option>
            <Option value="RD-Account">RD Account</Option>
            <Option value="Loan-Account">Loan Account</Option>
            <Option value="pygmy-Account">Pygmy Account</Option>
            <Option value="Savings">Savings</Option>

          </Select>
        </Form.Item>

        {/* {accountType === "Savings-Account" && (
          <>
            <Form.Item
              value={formData.specificField1}
              onChange={handleInputChange}
              name="initialDepositAmt"
              label="Initial Deposit"
              rules={[
                { required: true, message: "Please input initial amount!" },
              ]}
            >
              <InputNumber
                addonAfter={suffixSelector}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </>
        )} */}
         {accountType === "Savings" && (
          <>
            <Form.Item
              value={formData.specificField1}
              onChange={handleInputChange}
              name="initialDepositAmt"
              label="Initial Deposit"
              rules={[
                { required: true, message: "Please input initial amount!" },
              ]}
            >
              <InputNumber
                addonAfter={suffixSelector}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </>
        )}

        {accountType === "pygmy-Account" && (
          <>
            <Form.Item
              value={formData.specificField1}
              onChange={handleInputChange}
              name="pygmyDailyAmount"
              label="Daily Deposit Amount"
              rules={[
                { required: true, message: "Please input initial amount!" },
              ]}
            >
              <InputNumber
                addonAfter={suffixSelector}
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item
              name="interestRate"
              label="Interest Rate-Pygmy"
              rules={[
                {
                  required: true,
                  message: "Please select Interest Rate!",
                },
              ]}
            >
              <Select placeholder="Select pygmy interest">
                <Option value="3">3%</Option>
              
              </Select>
            </Form.Item>


            <Form.Item
              name="numberOfDays"
              label="Pygmy Duration"
              rules={[
                {
                  required: true,
                  message: "Please select Interest Rate!",
                },
              ]}
            >
              <Select placeholder="Select pygmy interest">
                <Option value="60">Daily (60 Days)</Option>
                <Option value="90">Daily (90 Days)</Option>
                <Option value="180">Daily (180 Days)</Option>
                <Option value="365">Daily (365 Days)</Option>

              
              </Select>
            </Form.Item>

            {/* <Form.Item
              value={formData.specificField1}
              onChange={handleInputChange}
              name="numberOfDays"
              label="Pygmy Duration in Months"
              rules={[
                { required: true, message: "Please input pygmy duration!" },
              ]}
            >
              <InputNumber
                // addonAfter={suffixSelector}
                style={{ width: "100%" }}
              />
            </Form.Item> */}

            

            {/* <Form.Item
        name="agentNamePygmyCollection"
        label="Agent Name"
        rules={[
          {
            required: true,
            message: "Please input agent name!",
          },
        ]}
      >
        <Input />
      </Form.Item> */}
          </>
        )}

        {accountType === "RD-Account" && (
          <>
            <Form.Item
              value={formData.specificField1}
              onChange={handleInputChange}
              name="monthlyDepositAmtRD"
              label="Monthly Amount Pay"
              rules={[
                { required: true, message: "Please input initial amount!" },
              ]}
            >
              <InputNumber
                addonAfter={suffixSelector}
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item
              name="interestRateRD"
              label="Interest Rate-RD"
              rules={[
                {
                  required: true,
                  message: "Please select Interest Rate!",
                },
              ]}
            >
              <Select placeholder="Select RD interest">
                <Option value="10%">10%</Option>
                <Option value="9%">9%</Option>
              </Select>
            </Form.Item>

            <Form.Item
              value={formData.specificField1}
              onChange={handleInputChange}
              name="termDurationRD"
              label="Duration"
              rules={[
                { required: true, message: "Please input Fixed amount duration!" },
              ]}
            >
              <InputNumber
                // addonAfter={suffixSelector}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </>
        )}

        {accountType === "Loan-Account" && (
          <>
            {/* <Form.Item
              value={formData.specificField1}
              onChange={handleInputChange}
              name="loanAmount"
              label="Loan Amount"
              rules={[
                { required: true, message: "Please input initial amount!" },
              ]}
            >
              <InputNumber
                addonAfter={suffixSelector}
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item
              name="interestRateLoan"
              label="Interest Rate-Loan"
              rules={[
                {
                  required: true,
                  message: "Please select Interest Rate!",
                },
              ]}
            >
              <Select placeholder="Select Loan interest">
                <Option value="3.5%">3.5%</Option>
                <Option value="3%">3%</Option>
              </Select>
            </Form.Item>

            <Form.Item
              value={formData.specificField1}
              onChange={handleInputChange}
              name="LoanDuration"
              label="Duration"
              rules={[
                { required: true, message: "Please input Fixed amount duration!" },
              ]}
            >
              <InputNumber
                // addonAfter={suffixSelector}
                style={{ width: "100%" }}
              />
            </Form.Item> */}

                <Form.Item
                name="loanAmount"
                label="Loan Amount"
                rules={[
                  {
                    required: true,
                    message: "Please select Loan Amount!",
                  },
                ]}
              >
                <Select placeholder="Select Loan amount">
                  <Option value="10000">10000</Option>
                  <Option value="20000">20000</Option>
                  <Option value="30000">30000</Option>
                  <Option value="40000">40000</Option>
                  <Option value="50000">50000</Option>

                </Select>
              </Form.Item>  

  
              <Form.Item
                name="interestRateLoan"
                label="Interest Rate-Loan"
                rules={[
                  {
                    required: true,
                    message: "Please select Interest Rate!",
                  },
                ]}
              >
                <Select placeholder="Select Loan interest">
                  <Option value="10">10%</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="numberOfDays"
                label="Duration"
                rules={[
                  {
                    required: true,
                    message: "Please select duration to repay loan amount!",
                  },
                ]}
              >
                <Select placeholder="Select duration">
                  <Option value="100">100 days</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="pygmyDailyAmount"
                label="Daily Repay Pigmy Amount"
                rules={[
                  {
                    required: true,
                    message: "Please select daily repay loan pigmy amount!",
                  },
                ]}
              >
                <Select placeholder="Select daily repay pigmy amount">
                  <Option value="100">100 Rs. (daily)</Option>
                  <Option value="200">200 Rs. (daily)</Option>
                  <Option value="300">300 Rs. (daily)</Option>
                  <Option value="400">400 Rs. (daily)</Option>
                  <Option value="500">500 Rs. (daily)</Option>

                </Select>
              </Form.Item>

          </>
        )}

        {accountType === "FD-Account" && (
          <>
            <Form.Item
              value={formData.specificField1}
              onChange={handleInputChange}
              name="FDAmount"
              label="FD Amount"
              rules={[
                { required: true, message: "Please input Fixed amount!" },
              ]}
            >
              <InputNumber
                addonAfter={suffixSelector}
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item
              name="interestRateFD"
              label="Interest Rate-FD"
              rules={[
                {
                  required: true,
                  message: "Please select Interest Rate!",
                },
              ]}
            >
              <Select placeholder="Select FD interest">
                <Option value="10%">10%</Option>
                <Option value="9%">9%</Option>
              </Select>
            </Form.Item>

            <Form.Item
              value={formData.specificField1}
              onChange={handleInputChange}
              name="termDurationFD"
              label="Duration"
              rules={[
                { required: true, message: "Please input Fixed amount duration!" },
              ]}
            >
              <InputNumber
                // addonAfter={suffixSelector}
                style={{ width: "100%" }}
              />
            </Form.Item>


          </>
        )}

        <Form.Item
          name="nominee"
          label="Nominees"
          rules={[
            {
              required: true,
              message: "Please enter nominee!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" className="form-btn">
            Submit
          </Button>
        </Form.Item>


             

      </Form>
      <ToastContainer position="top-center" />
    </>
  );
}

export default AccountForm;
