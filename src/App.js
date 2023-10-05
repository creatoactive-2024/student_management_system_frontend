import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { EmployeeLogin, AdminLogin } from './components';
import { AnimatePresence } from 'framer-motion';
import EmployeeHome from './components/EmployeeHome';
import Dashboard from '../src/components/admin/Dashboard';
import CreateAccount from './components/admin/CreateAccount';
import { AccountProvider } from './context/AccountContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from './auth/firebaseConfig';
import PygmyCollectionTransaction from './components/admin/PygmyCollectionTransaction';
import ViewPigmyTransaction from './components/admin/ViewPigmyTransaction';
import ExistingCustomerNewAcc from './components/admin/ExistingCustomerNewAcc';
import CommonSidebar from './components/CommonSidebar';
import ViewAccount from './components/admin/ViewAccount';
import LoanPigmyRepay from './components/admin/LoanPigmyRepay';
import ViewLoanAccount from './components/admin/ViewLoanAccount';
import LoanAccStatus from './components/admin/LoanAccStatus';
import NewEmployee from './components/admin/NewEmployee';
import ViewEmployee from './components/admin/ViewEmployee';
import EmpStatus from './components/admin/EmpStatus';
import DepositWithdraw from './components/admin/DepositWithdraw';
import AccountForm from './components/admin/AccountForm';
import AccountDetails from './components/admin/AccountDetails';
import AccountDetails2 from './components/admin/AccountDetails2';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false); // Set loading to false once the authentication state is checked.
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (loading) {
    // You can render a loading spinner or some indication that the app is checking the authentication state.
    return <div>Loading...</div>;
  }

  return (
    // <Router>
      <AnimatePresence>
        <>
          <ToastContainer position="top-center" />

          <Routes>
            <Route path="/employeeLogin" element={<EmployeeLogin />} />
            <Route
              path="/employeeHome"
              element={user ? <EmployeeHome /> : <Navigate to="/employeeLogin" />}
            />
            <Route path="/admin" element={<AdminLogin />} />
            <Route
              path="/adminDashboard/*"
              element={
                user ? (
                  <AccountProvider>
                    <CommonSidebar />
                  </AccountProvider>
                ) : (
                  <Navigate to="/admin" />
                )
              }
            >
              <Route index element={<Dashboard />} />
              <Route
                path="createaccount"
                element={
                  user ? (
                    <AccountProvider>
                      <CreateAccount />
                    </AccountProvider>
                  ) : (
                    <Navigate to="/admin" />
                  )
                }
              />
              <Route
                path="createaccount/accountForm/:customerID"
                element={
                  user ? (
                    <AccountProvider>
                      <AccountForm />
                    </AccountProvider>
                  ) : (
                    <Navigate to="/admin" />
                  )
                }
              />
              <Route
                path="createaccount/accountForm/:customerID/AccountDetails"
                element={
                  user ? (
                    <AccountProvider>
                      <AccountDetails />
                    </AccountProvider>
                  ) : (
                    <Navigate to="/admin" />
                  )
                }
              />
              <Route
                path="existingCustomer/AccountDetails2"
                element={
                  user ? (
                    <AccountProvider>
                      <AccountDetails2 />
                    </AccountProvider>
                  ) : (
                    <Navigate to="/admin" />
                  )
                }
              />
              <Route
                path="existingCustomer"
                element={
                  user ? (
                    <AccountProvider>
                      <ExistingCustomerNewAcc />
                    </AccountProvider>
                  ) : (
                    <Navigate to="/admin" />
                  )
                }
              />
              <Route
                path="viewaccount"
                element={
                  user ? (
                    <AccountProvider>
                      <ViewAccount />
                    </AccountProvider>
                  ) : (
                    <Navigate to="/admin" />
                  )
                }
              />
              <Route
                path="LoanPigmyRepay"
                element={
                  user ? (
                    <AccountProvider>
                      <LoanPigmyRepay />
                    </AccountProvider>
                  ) : (
                    <Navigate to="/admin" />
                  )
                }
              />
              <Route
                path="viewLoanAccount"
                element={
                  user ? (
                    <AccountProvider>
                      <ViewLoanAccount />
                    </AccountProvider>
                  ) : (
                    <Navigate to="/admin" />
                  )
                }
              />
              <Route
                path="loanAccountStatus"
                element={
                  user ? (
                    <AccountProvider>
                      <LoanAccStatus />
                    </AccountProvider>
                  ) : (
                    <Navigate to="/admin" />
                  )
                }
              />
              <Route
                path="createNewEmployee"
                element={
                  user ? (
                    <AccountProvider>
                      <NewEmployee />
                    </AccountProvider>
                  ) : (
                    <Navigate to="/admin" />
                  )
                }
              />
              <Route
                path="viewEmployee"
                element={
                  user ? (
                    <AccountProvider>
                      <ViewEmployee />
                    </AccountProvider>
                  ) : (
                    <Navigate to="/admin" />
                  )
                }
              />
              <Route
                path="empStatus"
                element={
                  user ? (
                    <AccountProvider>
                      <EmpStatus />
                    </AccountProvider>
                  ) : (
                    <Navigate to="/admin" />
                  )
                }
              />
              <Route
                path="depositWithdraw"
                element={
                  user ? (
                    <AccountProvider>
                      <DepositWithdraw />
                    </AccountProvider>
                  ) : (
                    <Navigate to="/admin" />
                  )
                }
              />
              <Route
                path="pygmyCollection"
                element={
                  user ? (
                    <AccountProvider>
                      <PygmyCollectionTransaction />
                    </AccountProvider>
                  ) : (
                    <Navigate to="/admin" />
                  )
                }
              />
              <Route
                path="viewPigmyTransactions"
                element={
                  user ? (
                    <AccountProvider>
                      <ViewPigmyTransaction />
                    </AccountProvider>
                  ) : (
                    <Navigate to="/admin" />
                  )
                }
              />
            </Route>
          </Routes>
        </>
      </AnimatePresence>
    // </Router>
  );
}

export default App;
