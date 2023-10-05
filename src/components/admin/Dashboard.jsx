import { Row, Col } from 'antd';
import "../admin-styles/dashboard.css"
import React, { useState, useEffect } from 'react';



const Dashboard = () => {
  const [totalDepositAmount, setTotalDepositAmount] = useState(0);

  useEffect(() => {
    // Function to fetch the total deposit amount from your API
    const fetchTotalDepositAmount = async () => {
      try {
        const response = await fetch('http://localhost:5005/totalDepositAmount'); // Replace with your API URL
        const data = await response.json();
        setTotalDepositAmount(data.totalDepositAmount);
      } catch (error) {
        console.error('Error fetching total deposit amount:', error);
      }
    };

    // Fetch the initial total deposit amount
    fetchTotalDepositAmount();

    // Periodically fetch and update the total deposit amount (every 5 seconds in this example)
    const interval = setInterval(() => {
      fetchTotalDepositAmount();
    }, 5000);

    return () => {
      // Clear the interval when the component unmounts
      clearInterval(interval);
    };
  }, []);

    return (
        <>
    <div className="container">
        <div className="box">
            <div className='innerBox'><h1 className='CountDash'>500</h1></div>
        <div className='innerBox'><p>Number of Accounts Active</p></div>
        </div>
        <div className="box">
        <div className='innerBox'><h1 className='CountDash'>454</h1></div>
        <div className='innerBox'><p>Number of Loan Accounts</p></div>
        </div>
        <div className="box">
        <div className='innerBox'><h1 className='CountDash'>{totalDepositAmount}</h1></div>
        <div className='innerBox'><p>Total Savings deposits</p></div>
        </div>
        <div className="box">
        <div className='innerBox'><h1 className='CountDash'>45154</h1></div>
        <div className='innerBox'><p>Total Loan Amount</p></div>
        </div>
        <div className="box">
        <div className='innerBox'><h1 className='CountDash'>54554</h1></div>
        <div className='innerBox'><p>Total Revenue</p></div>
        </div>
        <div className="box">
        <div className='innerBox'><h1 className='CountDash'>03659</h1></div>
        <div className='innerBox'><p>Total Earn Intrest</p></div>
        </div>

    </div>









      {/* <Row>
        <div className='container'>
          <div className='innerContainer'>
            <Col>
              <div className='DashCard'>
                <h1 className='CountDash'>totalCount</h1>
              </div>
              <div className='DashCardLabel1'>
                <h1>No. of Cohousy Users</h1>
              </div>
            </Col>
          </div>
          <div className='innerContainer'>
            <Col>
              <div className='DashCard'>
                <h1 className='CountDash'>property</h1>
              </div>
              <div className='DashCardLabel2'>
                <h1>No. of Properties</h1>
              </div>
            </Col>
          </div>
        </div>
      </Row>
      <Row>
        <div className='container'>
          <div className='innerContainer'>
            <Col>
              <div className='DashCard'>
                <h1 className='CountDash'>visit</h1>
              </div>
              <div className='DashCardLabel3'>
                <h1>New Visit Request</h1>
              </div>
            </Col>
          </div>
          <div className='innerContainer'>
            <Col>
              <div className='DashCard'>
                <h1 className='CountDash'>booking</h1>
              </div>
              <div className='DashCardLabel4'>
                <h1>New Booking Request</h1>
              </div>
            </Col>
          </div>
        </div>
      </Row> */}
    </>
    );
};

export default Dashboard;