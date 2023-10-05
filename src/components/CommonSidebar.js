import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import applogo from "../components/img/logo.png";
import applogo2 from "../components/img/pygmy.png";


import { Outlet } from "react-router-dom";
import {
  AiFillDashboard,
  AiOutlineMedium,
  AiOutlineRocket,
  AiOutlineFileDone,
  AiOutlineBook,
  AiOutlineDollarCircle,
  AiOutlineUser,
  AiOutlineHome,
  AiOutlineUserAdd,
  AiOutlineLogout,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { auth } from '../auth/firebaseConfig';  // Import your Firebase auth instance


import { Layout, Menu, theme } from "antd";
// import "./commonsidebar.css";

const { Header, Sider, Content } = Layout;

const CommonSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = async () => {
    try {
      // Sign out the user using Firebase auth
      await auth.signOut();

      // Navigate to the login page
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };


  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        className="Sidebar w-1"
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ backgroundColor: "white" }}
        width={300}
      >
       <div className="logo" style={{ backgroundColor: "white", display: "flex", justifyContent: "center" }}>
  <h2 className="text-white fs-5 text-center py-3 mb-0  d-flex justify-center">
    {!collapsed ? (
      <span className="sm-logo">
        <img src={applogo} alt="Small App Logo" style={{ width: 130 }} />
      </span>
    ) : (
      <span className="lg-logo">
        <img src={applogo} alt="Big App Logo" style={{ width: 70 }} />
      </span>
    )}
  </h2>
</div>


        <div className="sidebar-wrapper">
          <div className="sidebar-menu">
            <Menu
              theme="light"
              mode="inline"
              defaultSelectedKeys={[""]}
              onClick={({ key }) => {
                if (key === "logout") {
                  handleLogout();

                } else {
                  navigate(key);
                }
              }}
              items={[
                {
                  key: "",
                  icon: <AiFillDashboard />,
                  label: "Dashboard",
                },
                {
                  key: "Account Management",
                  icon: <AiOutlineUser />,
                  label: "Account Management",
                  children: [
                    {
                      key: "createaccount",
                      icon: <AiOutlineUserAdd />,
                      label: "Create New Account",
                    },
                    {
                      key: "existingCustomer",
                      icon: <AiOutlineUserAdd />,
                      label: "Create Existing Customer ",
                    },
                    {
                      key: "viewaccount",
                      icon: <AiOutlineUserAdd />,
                      label: "View Account",
                    },
                  ],
                },
                {
                  key: "pygmyAccount",
                  icon: <AiOutlineDollarCircle />,
                  label: "Pygmy Accounts",
                  children: [
                    {
                      key: "pygmyCollection",
                      icon: <AiOutlineDollarCircle />,
                      label: "Pygmy Collections",
                    },
                    {
                      key: "viewPigmyTransactions",
                      icon: <AiOutlineDollarCircle />,
                      label: "View Transactions",
                    },
                   
                    {
                      key: "statement",
                      icon: <AiOutlineDollarCircle />,
                      label: "Statement",
                    },
                  ],
                },
                {
                  key: "loanManagement",
                  icon: <AiOutlineRocket />,
                  label: "Loan Management",
                  children: [
                    {
                      key: "LoanPigmyRepay",
                      icon: <AiOutlineRocket />,
                      label: "Loan Pigmy Transactions",
                    },
                    {
                      key: "viewLoanAccount",
                      icon: <AiOutlineRocket />,
                      label: "View Loan Account",
                    },
                    {
                      key: "loanAccountStatus",
                      icon: <AiOutlineRocket />,
                      label: "Loan Account Status",
                    },
                  ],
                },


                {
                  key: "savingsAccount",
                  icon: <AiOutlineDollarCircle />,
                  label: "Savings Account",
                  children: [
                    {
                      key: "depositWithdraw",
                      icon: <AiOutlineDollarCircle />,
                      label: "Deposit/Withdraw",
                    },
                    {
                      key: "viewTransactions",
                      icon: <AiOutlineDollarCircle />,
                      label: "View Transactions",
                    },
                   
                    {
                      key: "statement",
                      icon: <AiOutlineDollarCircle />,
                      label: "Statement",
                    },
                  ],
                },
                

                {
                  key: "reports",
                  icon: <AiOutlineFileDone />,
                  label: "Reports",
                  children: [
                    {
                      key: "accountReports",
                      icon: <AiOutlineFileDone />,
                      label: "Account Reports",
                    },
                    {
                      key: "loanReports",
                      icon: <AiOutlineFileDone />,
                      label: "Loan Reports",
                    },
                    {
                      key: "status",
                      icon: <AiOutlineFileDone />,
                      label: "Status",
                    },
                  ],
                },
                
                {
                  key: "employee",
                  icon: <WalletOutlined />,
                  label: "Employee",
                  children: [
                    {
                      key: "createNewEmployee",
                      icon: <WalletOutlined />,
                      label: "Create New Employee",
                    },
                    {
                      key: "viewEmployee",
                      icon: <WalletOutlined />,
                      label: "View Employee",
                    },
                    {
                      key: "empStatus",
                      icon: <WalletOutlined />,
                      label: "Employee Status",
                    },
                  ],
                },

                {
                  key: "logout",
                  icon: <AiOutlineLogout />,
                  label: "Logout",
                },
              ]}
            />
          </div>
        </div>
      </Sider>
      <Layout className="site-layout">
  <Header
    className="d-flex justify-content-between align-items-center"
    style={{
      padding: "15px",
      backgroundColor: "#EAF1FF",
      position: "relative",
    }}
  >
    {React.createElement(
      collapsed ? MenuFoldOutlined : MenuUnfoldOutlined,
      {
        className: "trigger",
        onClick: () => setCollapsed(!collapsed),
      }
    )}

    <div
      className="d-flex gap-3 align-items-center abc"
      style={{ position: "absolute", top: "50%", right: 16, transform: "translateY(-50%)" }}
    >
      <div>
        <img
          className="profimg"
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt=""
          width={60}
          style={{ borderRadius: "50%", marginRight: "8px" }}
        />
      </div>
      <div className="profdetail">
        <h5 className="name mb-1" style={{ marginTop: "30px" }}>Neeta</h5>
        <p className="name1 mb-0" style={{marginTop: "-26px"}}>Admin@gmail.com</p>
      </div>
    </div>
  </Header>
  <Content
    style={{
      margin: "24px 16px",
      padding: 24,
      minHeight: 280,
      background: colorBgContainer,
    }}
  >
    <Outlet />
  </Content>
</Layout>

    </Layout>
  );
};

export default CommonSidebar;
