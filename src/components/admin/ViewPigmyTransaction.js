// import React, { useEffect, useState } from 'react';

// const ViewPigmyTransaction = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);

//   useEffect(() => {
//     // Fetch data from the API when the component mounts
//     fetch('http://localhost:5005/getPygmyTransactions')
//       .then((response) => response.json())
//       .then((data) => {
//         setTransactions(data);
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);

//   const paginate = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const renderPagination = () => {
//     const totalPages = Math.ceil(transactions.length / itemsPerPage);
//     if (totalPages <= 1) return null;

//     const paginationItems = [];

//     // Render Previous Page button
//     if (currentPage > 1) {
//       paginationItems.push(
//         <button key="prev" onClick={() => paginate(currentPage - 1)}>
//           <i className="fas fa-chevron-left"></i>
//         </button>
//       );
//     }

//     // Render page numbers
//     for (let i = 1; i <= totalPages; i++) {
//       paginationItems.push(
//         <button
//           key={i}
//           onClick={() => paginate(i)}
//           className={i === currentPage ? 'active' : ''}
//         >
//           {i}
//         </button>
//       );
//     }

//     // Render Next Page button
//     if (currentPage < totalPages) {
//       paginationItems.push(
//         <button key="next" onClick={() => paginate(currentPage + 1)}>
//           <i className="fas fa-chevron-right"></i>
//         </button>
//       );
//     }

//     return <div className="pagination">{paginationItems}</div>;
//   };

//   return (
//     <div>
//       <h1>Pygmy Transactions</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Customer ID</th>
//             <th>Transaction ID</th>
//             <th>Amount</th>
//             <th>Date</th>
//             <th>Final Balance</th>
//             <th>Remaining Balance</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {transactions
//             .slice(
//               (currentPage - 1) * itemsPerPage,
//               currentPage * itemsPerPage
//             )
//             .map((transaction) => (
//               <tr key={transaction._id}>
//                 <td>{`${transaction.basicDetails.firstname} ${transaction.basicDetails.lastname}`}</td>
//                 <td>{transaction.customerID}</td>
//                 <td>{transaction.transactionID}</td>
//                 <td>{transaction.amount}</td>
//                 <td>{new Date(transaction.datecreated).toLocaleDateString()}</td>
//                 <td>{transaction.totalFinalBalance}</td>
//                 <td>{transaction.remainingBalance}</td>
//                 <td>{transaction.basicDetails.status}</td>
//               </tr>
//             ))}
//         </tbody>
//       </table>
//       {renderPagination()}
//     </div>
//   );
// };

// export default ViewPigmyTransaction;


import React, { useEffect, useState } from 'react';

const ViewPigmyTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetch('http://localhost:5005/getPygmyTransactions')
      .then((response) => response.json())
      .then((data) => {
        setTransactions(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(transactions.length / itemsPerPage);
    if (totalPages <= 1) return null;

    return (
      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={currentPage === i + 1 ? 'active' : ''}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    );
  };

  return (
    <div>
      <h1>Pygmy Transactions</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Customer ID</th>
            <th>Account Number</th>
            <th>Transaction ID</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Balance with interest</th>
            <th>Remaining Balance</th>
            <th>Account Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions
            .slice(
              (currentPage - 1) * itemsPerPage,
              currentPage * itemsPerPage
            )
            .map((transaction) => (
              <tr key={transaction._id}>
                <td>{`${transaction.basicDetails.firstname} ${transaction.basicDetails.lastname}`}</td>
                <td>{transaction.customerID}</td>
                <td>{transaction.accountNumber}</td>

                <td>{transaction.transactionID}</td>
                <td>{transaction.amount}</td>
                <td>
                  {new Date(transaction.datecreated).toLocaleDateString()}
                </td>
                <td>{transaction.totalFinalBalance}</td>
                <td>{transaction.remainingBalance}</td>
                <td>{transaction.accountDetails.status}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {renderPagination()}
      <style>
        {`
          .pagination {
            display: flex;
            list-style: none;
            padding: 0;
            margin-top: 20px;
          }
          
          .pagination button {
            padding: 5px 10px;
            margin-right: 5px;
            border: 1px solid #ccc;
            background-color: #fff;
            cursor: pointer;
          }
          
          .pagination button.active {
            background-color: #007bff;
            color: #fff;
          }
          
          .pagination button:disabled {
            cursor: not-allowed;
          }
          th,td{
            text-align:center;
          }
        `}
      </style>
    </div>
  );
};

export default ViewPigmyTransaction;

