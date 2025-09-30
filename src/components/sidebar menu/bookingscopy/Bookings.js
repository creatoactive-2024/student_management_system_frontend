// import React, { useState, useEffect } from "react";
// import { Button, Table, Input, Space, Modal, Breadcrumb, message, Form } from "antd";

// import BookingForm from "./BookingForm";
// import axios from "axios";
// import baseURL from "../../../config";
// import { Link } from "react-router-dom";
// // import { fetchDataCommon } from "../commonComponents/GetDataApi";
// import { Spin } from "antd";
// import {
//   AddEditDeleteDeactivate,
//   AddEditDeleteDeactivateAll,
//   CsvExcelImport,
//   FiltersDropdown,
//   SearchInputnew,
// } from "../../sidebar menu/commonComponents/ButtonsDropdown";
// import moment from "moment";
// import { fetchDataCommon } from "../commonComponents/GetDataApi";
// import { handleDelete } from "../commonComponents/DeleteApi";
// import { FieldListDropdown } from "../commonComponents/FieldListDropdown";

// const Bookings = () => {
//   const [selectedRowKeys, setSelectedRowKeys] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [newModalVisible, setNewModalVisible] = useState(false);
//   const [data, setData] = useState([]); // State to store fetched data
//   const [selectedRecordId, setSelectedRecordId] = useState(null);
//   const [editingRecordData, setEditingRecordData] = useState(null);
//   const [editModalVisible, setEditModalVisible] = useState(false);
//   const [selectedRecordIdToDelete, setSelectedRecordIdToDelete] =
//     useState(null);
//   const [deleteModalVisible, setDeleteModalVisible] = useState(false);
//   const [error, setError] = useState(null);
//   const [form] = Form.useForm();
// const [formValues, setFormValues] = useState({});

//   const [salespersonList, setSalespersonList] = useState([]);
// const [transformedData, setTransformedData] = useState([]);


// const [searchText, setSearchText] = useState("");
// const [filteredData, setFilteredData] = useState([]);


// //filter start
// //filter end

//  const fetchSalesperson = async () => {
//     try {
//       const responseData = await FieldListDropdown(
//         "overviewadmins",
//         "first_name"
//       );
//       if (responseData) {
//         // Extract course levels and construct objects with value and label properties
//         const Name = responseData
//           .map((firstname) => ({
//             value: firstname._id, // Use the appropriate property for the value
//             label: firstname.first_name, // Use the appropriate property for the label
//           }))
//           .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically

//         setSalespersonList(Name);
//       }
//     } catch (error) {
//       console.error("Error fetching firstname:", error);
//     }
//   };

//  const fetchData = async () => {
//     // Call the common delete API with the selected record IDs
//     await fetchDataCommon("bookinghubspotdatas", setData, setSelectedRowKeys, setLoading);
//   };

//   useEffect(() => {
//     fetchData();
//     fetchSalesperson(); 
//   }, []); // Empty dependency array ensures the effect runs only once on mount

//   const start = () => {
//     setLoading(true);
//     // ajax request after empty completing
//     setTimeout(() => {
//       setSelectedRowKeys([]);
//       setLoading(false);
//     }, 1000);
//   };

// // Apply filtering whenever transformedData OR searchText changes
// useEffect(() => {
//   if (!searchText) {
//     setFilteredData(transformedData); // no search → show all
//     return;
//   }

//   const lowercased = searchText.toLowerCase();

//   const filtered = transformedData.filter((item) => {
//     return (
//       (item.firstname && item.firstname.toLowerCase().includes(lowercased)) ||
//       (item.surname && item.surname.toLowerCase().includes(lowercased)) ||
//       (item.email && item.email.toLowerCase().includes(lowercased)) ||
//       (item.phone && String(item.phone).toLowerCase().includes(lowercased)) ||
//       (item.studentid && String(item.studentid).toLowerCase().includes(lowercased)) ||
//       (item.salesperson && item.salesperson.toLowerCase().includes(lowercased)) ||
//       (item.lead && item.lead.toLowerCase().includes(lowercased))
//     );
//   });

//   setFilteredData(filtered);
// }, [searchText, transformedData]);


//     const onSelectChange = (newSelectedRowKeys, selectedRows) => {
//     console.log("selectedRowKeys changed: ", newSelectedRowKeys);
//     setSelectedRowKeys(newSelectedRowKeys);

//     // Assuming the first selected row contains the desired record ID
//     if (selectedRows.length > 0) {
//       setSelectedRecordId(selectedRows[0]._id);
//     } else {
//       setSelectedRecordId(null);
//     }
//   };
  

//   const rowSelection = {
//     selectedRowKeys,
//     onChange: onSelectChange,
//     fixed: true,
//   };
//   const onSelectChange1 = (selectedKeys) => setSelectedRowKeys(selectedKeys);

//   const hasSelected = selectedRowKeys.length > 0;



  
//   const handleNewModalOpen = () => {
//     form.resetFields();
//     setSelectedRecordId(null); 
//     setNewModalVisible(true);
//     handleNewButtonClick();
//     setSelectedRowKeys([]);
    
//   };

//   const handleNewModalCancel = () => {
//     setNewModalVisible(false);
//   };

//   const handleNewModalOk = () => {
//     // Handle logic when submitting the new form
//     setNewModalVisible(false);
//   };

//  const columns = [
//    {
//       title: "ID",
//       dataIndex: "_id",
//       key: "_id",
//       render: () => null,
//       fixed: "left",
//       width: 0,
//     },
//   {
//     title: "Student ID",
//     dataIndex: "studentid",
//     key: "studentid",
//   },
//   {
//     title: "Salesperson",
//     dataIndex: "salesperson",
//     key: "salesperson",
//   },
//   {
//     title: "Lead",
//     dataIndex: "lead",
//     key: "lead",
//   },
//   {
//     title: "Surname",
//     dataIndex: "surname",
//     key: "surname",
//   },
//   {
//     title: "First name",
//     dataIndex: "firstname",
//     key: "firstname",
//   },
//   {
//     title: "Gender",
//     dataIndex: "gender",
//     key: "gender",
//   },
//   {
//     title: "E-mail",
//     dataIndex: "email",
//     key: "email",
//   },
//   {
//     title: "Phone",
//     dataIndex: "phone",
//     key: "phone",
//   },
//   {
//     title: "Birthdate",
//     dataIndex: "dob",
//     key: "dob",
//     render: (text, record) =>
//       record.dob ? moment(record.dob).format("DD-MM-YYYY") : "",
//   },
//   {
//     title: "Nationality",
//     dataIndex: "nationality",
//     key: "nationality",
//   },
//   {
//     title: "Country of Birth",
//     dataIndex: "country_birth",
//     key: "country_birth",
//   },
//   {
//     title: "Country of Residence",
//     dataIndex: "country_residence",
//     key: "country_residence",
//   },
//   {
//     title: "Mother tongue",
//     dataIndex: "mother_tongue",
//     key: "mother_tongue",
//   },
//   // 🔹 Address
//   {
//     title: "Address",
//     dataIndex: "address_address",
//     key: "address_address",
//   },
//   {
//     title: "ZIP / Postal code",
//     dataIndex: "address_zipcode",
//     key: "address_zipcode",
//   },
//   {
//     title: "City",
//     dataIndex: "address_city",
//     key: "address_city",
//   },
//   {
//     title: "State",
//     dataIndex: "address_state",
//     key: "address_state",
//   },
//   {
//     title: "Country",
//     dataIndex: "address_country",
//     key: "address_country",
//   },
//   // 🔹 Billing
//   {
//     title: "Billing Address",
//     dataIndex: "billing_address",
//     key: "billing_address",
//   },
//   {
//     title: "Billing ZIP",
//     dataIndex: "billing_zipcode",
//     key: "billing_zipcode",
//   },
//   {
//     title: "Billing City",
//     dataIndex: "billing_city",
//     key: "billing_city",
//   },
//   {
//     title: "Billing State",
//     dataIndex: "billing_state",
//     key: "billing_state",
//   },
//   {
//     title: "Billing Country",
//     dataIndex: "billing_country",
//     key: "billing_country",
//   },
//   // 🔹 Booking Info
//   {
//     title: "Booking Date",
//     dataIndex: "bookingdate",
//     key: "bookingdate",
//     render: (text, record) =>
//       record.bookingdate ? moment(record.bookingdate).format("DD-MM-YYYY") : "",
//   },
//   {
//     title: "Status",
//     dataIndex: "status",
//     key: "status",
//   },
//   // 🔹 Course
//   {
//     title: "Course Category",
//     dataIndex: "category",
//     key: "category",
//   },
//   {
//     title: "Course",
//     dataIndex: "course",
//     key: "course",
//   },
//   {
//     title: "Level",
//     dataIndex: "level",
//     key: "level",
//   },
//   {
//     title: "No. of Weeks",
//     dataIndex: "no_of_weeks",
//     key: "no_of_weeks",
//   },
//   {
//     title: "Course Start",
//     dataIndex: "course_from_date",
//     key: "course_from_date",
//     render: (text, record) =>
//       record.course_from_date
//         ? moment(record.course_from_date).format("DD-MM-YYYY")
//         : "",
//   },
//   {
//     title: "Course End",
//     dataIndex: "course_to_date",
//     key: "course_to_date",
//     render: (text, record) =>
//       record.course_to_date
//         ? moment(record.course_to_date).format("DD-MM-YYYY")
//         : "",
//   },
//   // 🔹 Accommodation
//   {
//     title: "Accommodation",
//     dataIndex: "accommodation",
//     key: "accommodation",
//   },
//   {
//     title: "Room",
//     dataIndex: "room",
//     key: "room",
//   },
//   {
//     title: "Board",
//     dataIndex: "board",
//     key: "board",
//   },
//   {
//     title: "Accommodation Weeks",
//     dataIndex: "no_of_weeks_accommodation",
//     key: "no_of_weeks_accommodation",
//   },
//   {
//     title: "Accommodation From",
//     dataIndex: "accommodation_from_date",
//     key: "accommodation_from_date",
//   },
//   {
//     title: "Accommodation To",
//     dataIndex: "accommodation_to_date",
//     key: "accommodation_to_date",
//   },
//   // 🔹 Visa / Passport
//   {
//     title: "Student Visa",
//     dataIndex: "student_visa",
//     key: "student_visa",
//     render: (val) => (val ? "Yes" : "No"),
//   },
//   {
//     title: "Passport Number",
//     dataIndex: "passport_number",
//     key: "passport_number",
//   },
//   {
//     title: "Passport Valid From",
//     dataIndex: "passport_from",
//     key: "passport_from",
//   },
//   {
//     title: "Passport Valid Until",
//     dataIndex: "passport_until",
//     key: "passport_until",
//   },
//   {
//     title: "Visa From",
//     dataIndex: "visa_from",
//     key: "visa_from",
//   },
//   {
//     title: "Visa Until",
//     dataIndex: "visa_until",
//     key: "visa_until",
//   },
//   {
//     title: "Visa Status",
//     dataIndex: "visa_status",
//     key: "visa_status",
//   },
//   {
//     title: "Visa Type",
//     dataIndex: "visa_type",
//     key: "visa_type",
//   },
// ];



// useEffect(() => {
//   if (!data || data.length === 0 || salespersonList.length === 0) return;

//   const mapped = data.map((entry) => {
//     const salespersonObj = salespersonList.find(
//       (s) => String(s.value) === String(entry.salesperson)  // ensure type match
//     );

//     return {
//       _id: entry._id || null,
//       studentid: entry.studentid,
//       salesperson: salespersonObj ? salespersonObj.label : entry.salesperson, // show name
//       lead: entry.lead,
//       firstname: entry.firstname,
//       surname: entry.surname,
//       phone: entry.phone,
//       email: entry.email,
//       gender: entry.gender,
//       dob: entry.dob,
//       nationality: entry.nationality,
//       country_birth: entry.country_birth,
//       country_residence: entry.country_residence,
//       mother_tongue: entry.mother_tongue,
//       // Address
//       address_address: entry.address_address,
//       address_zipcode: entry.address_zipcode,
//       address_city: entry.address_city,
//       address_state: entry.address_state,
//       address_country: entry.address_country,
//       // Billing
//       billing_address: entry.billing_address,
//       billing_zipcode: entry.billing_zipcode,
//       billing_city: entry.billing_city,
//       billing_state: entry.billing_state,
//       billing_country: entry.billing_country,
//       // Booking Info
//       bookingdate: entry.bookingdate,
//       status: entry.status,
//       // Course
//       category: entry.category,
//       course: entry.course,
//       level: entry.level,
//       no_of_weeks: entry.no_of_weeks,
//       course_from_date: entry.course_from_date,
//       course_to_date: entry.course_to_date,
//       // Accommodation
//       accommodation: entry.accommodation,
//       room: entry.room,
//       board: entry.board,
//       no_of_weeks_accommodation: entry.no_of_weeks_accommodation,
//       accommodation_from_date: entry.accommodation_from_date,
//       accommodation_to_date: entry.accommodation_to_date,
//       // Visa / Passport
//       student_visa: entry.student_visa,
//       passport_number: entry.passport_number,
//       passport_from: entry.passport_from,
//       passport_until: entry.passport_until,
//       visa_from: entry.visa_from,
//       visa_until: entry.visa_until,
//       visa_status: entry.visa_status,
//       visa_type: entry.visa_type,
//     };
//   });

//   setTransformedData(mapped);
// }, [data, salespersonList]);

//   const visibleColumns = columns.filter(
//     (column) => column.dataIndex !== "_id"
//   );

//   const handleEditModalOpen = () => {
//     setEditModalVisible(true);
//   };

//   const handleEditModalCancel = () => {
//     setEditModalVisible(false);
//   };

//   const handleEditModalOk = () => {
//     // Handle logic when submitting the edit form
//     setEditModalVisible(false);
//   };


// const handleEditButtonClick = async () => {
//     try {
//       console.log("Selected Row Keys:", selectedRowKeys);
//       console.log("Selected Record ID Before Fetch:", selectedRecordId);

//       if (!selectedRecordId) {
//         // No record selected, show a message
//         Modal.warning({
//           title: "Please Select a Record",
//           content: "Please select a record to edit.",
//         });
//         return;
//       }

//       if (selectedRowKeys.length > 1) {
//         // More than one record selected, show a message
//         Modal.warning({
//           title: "Select Only One Record",
//           content: "Please select only one record at a time for editing.",
//         });
//         return;
//       }

//       // Send the selected record ID in the request body
//       const response = await axios.post(`${baseURL}/getdata`, {
//         collectionName: "bookinghubspotdatas",
//         id: selectedRecordId,
//       });

//       // The response.data should contain the data for the selected record
//       console.log("API Response for Edit:", response.data);

//       // Set the editing record data
//       setEditingRecordData(response.data);

//       // Open the edit modal
//       handleEditModalOpen();
//     } catch (error) {
//       console.error("Error fetching data for edit:", error);
//       // Handle the error (show a message or return)
//     }
//   };


//  const handleDeleteButtonClick = () => {
//      if (selectedRowKeys.length === 0) {
//        // No record selected, show a warning message
//        message.warning("Please select records to delete.");
//      } else {
//        // Records are selected, show the delete confirmation modal
//        setDeleteModalVisible(true);
//      }
//    };
 
   
   
//    const handleDeleteModalOk = async () => {
//      // Call the common delete API with the selected record IDs
//      await handleDelete(
//        "bookinghubspotdatas",
//        selectedRowKeys,
//        fetchData,
//        setDeleteModalVisible
//      );
//    };
 
//    const handleDeleteModalCancel = () => {
//      // Close the delete confirmation modal without performing the deletion
//      setDeleteModalVisible(false);
//    };

//   const CancelBothModel= () =>{
//     setNewModalVisible(false);
//     setEditModalVisible(false);
//   }
//   const handleNewButtonClick = () => {
//     form.resetFields(); // Reset form fields when clicking "New"
//   };

//   return (
//     <>
//       <Breadcrumb>
//         <Breadcrumb.Item>
//           <Link to="">Bookings</Link>
//         </Breadcrumb.Item>
//       </Breadcrumb>
//       <hr />
//       <div>
//         <div
//           style={{
//             marginBottom: 16,
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <Space>
// <SearchInputnew onSearch={setSearchText} />
//           </Space>

        
//         </div>
//  <div
//           style={{
//             marginBottom: 16,
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
        

//           <Space>
           
//             <AddEditDeleteDeactivateAll
//               onClickNew={handleNewModalOpen}
//               onClickEdit={handleEditButtonClick}
//               onClickDelete={handleDeleteButtonClick}
//             />{" "}
//           </Space>
//         </div>
//         <Modal
//           title="Add New Booking"
//           visible={newModalVisible}
//           onOk={handleNewModalOk}
//           onCancel={handleNewModalCancel}
//           width={1000} // Set your preferred width value
//           style={{
//             top: 20,
//           }}
//           footer={null} // Set footer to null to remove buttons
//         >
//           <BookingForm
//           form={form}
//             formValues={formValues}
//             setNewModalVisible={setNewModalVisible}
//             handleNewModalCancel={handleNewModalCancel}
//             CancelBothModel={CancelBothModel}
//             fetchData={fetchData}
//             setSelectedRecordId={setSelectedRecordId}

//           />
//         </Modal>

//         <Modal
//           title="Edit Booking"
//           visible={editModalVisible}
//           onOk={handleEditModalOk}
//           onCancel={handleEditModalCancel}
//           width={1000}
//           style={{
//             top: 20,
//           }}
//           footer={null} // Set footer to null to remove buttons
//         >
//           <BookingForm
//          selectedRecordId={selectedRecordId}
//             recordData={editingRecordData}
//             setEditModalVisible={setEditModalVisible}
//             fetchData={fetchData}
//             handleNewModalCancel={handleNewModalCancel}
//             CancelBothModel={CancelBothModel}
//             setSelectedRecordId={setSelectedRecordId}
//           />
//         </Modal>

//         {/* Delete Confirmation Modal */}
//         <Modal
//           title="Delete Confirmation"
//           visible={deleteModalVisible}
//           onOk={handleDeleteModalOk}
//           onCancel={handleDeleteModalCancel}
//           okText="Delete"
//           cancelText="Cancel"
//         >
//           <p>Are you sure you want to delete the selected records?</p>
//         </Modal>

//         <h5>Personal Details</h5>

//        <Spin spinning={loading}>
//   <Table
//     rowSelection={{
//       selectedRowKeys,
//       onChange: onSelectChange,
//       fixed: true,
//     }}
//     columns={visibleColumns}
//     dataSource={filteredData}   // 🔹 filtered data
//     rowKey={(record) => record._id}
//     scroll={{ x: "max-content" }}
//   />
// </Spin>
//       </div>
//     </>
//   );
// };

// export default Bookings;









import React, { useState, useEffect } from "react";
import { Button, Table, Input, Space, Modal, Breadcrumb, message, Form } from "antd";

import BookingForm from "./BookingForm";
import axios from "axios";
import baseURL from "../../../config";
import { Link } from "react-router-dom";
// import { fetchDataCommon } from "../commonComponents/GetDataApi";
import { Spin } from "antd";
import {
  AddEditDeleteDeactivate,
  AddEditDeleteDeactivateAll,
  CsvExcelImport,
  FiltersDropdown,
  SearchInputnew,
} from "../../sidebar menu/commonComponents/ButtonsDropdown";
import moment from "moment";
import { fetchDataCommon } from "../commonComponents/GetDataApi";
import { handleDelete } from "../commonComponents/DeleteApi";
import { FieldListDropdown } from "../commonComponents/FieldListDropdown";
import fileDownload from "js-file-download";
import PaymentModal from "./PaymentModal";
import CommunicationModal from "./CommunicationModal";

const Bookings = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newModalVisible, setNewModalVisible] = useState(false);
  const [data, setData] = useState([]); // State to store fetched data
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [editingRecordData, setEditingRecordData] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedRecordIdToDelete, setSelectedRecordIdToDelete] =
    useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [error, setError] = useState(null);
  const [form] = Form.useForm();
const [formValues, setFormValues] = useState({});

  const [salespersonList, setSalespersonList] = useState([]);
const [transformedData, setTransformedData] = useState([]);


const [searchText, setSearchText] = useState("");
const [filteredData, setFilteredData] = useState([]);


//filter start

const [filters, setFilters] = useState({});   // store filters centrally
const [lastPayload, setLastPayload] = useState(null);


//filter end

const [paymentModalVisible, setPaymentModalVisible] = useState(false);



const [communicationModalVisible, setCommunicationModalVisible] = useState(false);
const [templates, setTemplates] = useState([]);
const [selectedTemplate, setSelectedTemplate] = useState(null);


 const fetchSalesperson = async () => {
    try {
      const responseData = await FieldListDropdown(
        "overviewadmins",
        "first_name"
      );
      if (responseData) {
        // Extract course levels and construct objects with value and label properties
        const Name = responseData
          .map((firstname) => ({
            value: firstname._id, // Use the appropriate property for the value
            label: firstname.first_name, // Use the appropriate property for the label
          }))
          .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically

        setSalespersonList(Name);
      }
    } catch (error) {
      console.error("Error fetching firstname:", error);
    }
  };

const fetchData = async (filters = {}, search = "") => {
  try {
    setLoading(true);
   const payload = {
      collection: "bookinghubspotdata",
      filters,
      search,
      page: 1,
      limit: 50,
    };

    // store for reuse in export
    setLastPayload(payload);

    const res = await axios.post(`${baseURL}/bookings/filter`, payload);

setFilteredData((res.data.data || []).reverse());
  } catch (err) {
    console.error("Error fetching data", err);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchData();
    fetchSalesperson(); 
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

// Apply filtering whenever transformedData OR searchText changes
// useEffect(() => {
//   if (!searchText) {
//     setFilteredData(transformedData); // no search → show all
//     return;
//   }

//   const lowercased = searchText.toLowerCase();

//   const filtered = transformedData.filter((item) => {
//     return (
//       (item.firstname && item.firstname.toLowerCase().includes(lowercased)) ||
//       (item.surname && item.surname.toLowerCase().includes(lowercased)) ||
//       (item.email && item.email.toLowerCase().includes(lowercased)) ||
//       (item.phone && String(item.phone).toLowerCase().includes(lowercased)) ||
//       (item.studentid && String(item.studentid).toLowerCase().includes(lowercased)) ||
//       (item.salesperson && item.salesperson.toLowerCase().includes(lowercased)) ||
//       (item.lead && item.lead.toLowerCase().includes(lowercased))
//     );
//   });

//   setFilteredData(filtered);
// }, [searchText, transformedData]);


    const onSelectChange = (newSelectedRowKeys, selectedRows) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);

    // Assuming the first selected row contains the desired record ID
    if (selectedRows.length > 0) {
      setSelectedRecordId(selectedRows[0]._id);
    } else {
      setSelectedRecordId(null);
    }
  };
  

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    fixed: true,
  };
  const onSelectChange1 = (selectedKeys) => setSelectedRowKeys(selectedKeys);

  const hasSelected = selectedRowKeys.length > 0;



  
  const handleNewModalOpen = () => {
    form.resetFields();
    setSelectedRecordId(null); 
    setNewModalVisible(true);
    handleNewButtonClick();
    setSelectedRowKeys([]);
    
  };

  const handleNewModalCancel = () => {
    setNewModalVisible(false);
  };

  const handleNewModalOk = () => {
    // Handle logic when submitting the new form
    setNewModalVisible(false);
  };

 const columns = [
   {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      render: () => null,
      fixed: "left",
      width: 0,
    },
     {
    title: "Invoice Number",
    dataIndex: "payment_invoice_number",
    key: "payment_invoice_number",
  },
  {
    title: "Student ID",
    dataIndex: "studentid",
    key: "studentid",
  },
 {
  title: "Salesperson",
  dataIndex: "salesperson",
  key: "salesperson",
  render: (val) => {
    const sp = salespersonList.find((s) => String(s.value) === String(val));
    return sp ? sp.label : "-";
  }
}
,
  {
    title: "Lead",
    dataIndex: "lead",
    key: "lead",
  },
  {
    title: "Surname",
    dataIndex: "surname",
    key: "surname",
  },
  {
    title: "First name",
    dataIndex: "firstname",
    key: "firstname",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "E-mail",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Birthdate",
    dataIndex: "dob",
    key: "dob",
    render: (text, record) =>
      record.dob ? moment(record.dob).format("DD-MM-YYYY") : "",
  },
  {
    title: "Nationality",
    dataIndex: "nationality",
    key: "nationality",
  },
  {
    title: "Country of Birth",
    dataIndex: "country_birth",
    key: "country_birth",
  },
  {
    title: "Country of Residence",
    dataIndex: "country_residence",
    key: "country_residence",
  },
  {
    title: "Mother tongue",
    dataIndex: "mother_tongue",
    key: "mother_tongue",
  },
  // 🔹 Address
  {
    title: "Address",
    dataIndex: "address_address",
    key: "address_address",
  },
  {
    title: "ZIP / Postal code",
    dataIndex: "address_zipcode",
    key: "address_zipcode",
  },
  {
    title: "City",
    dataIndex: "address_city",
    key: "address_city",
  },
  {
    title: "State",
    dataIndex: "address_state",
    key: "address_state",
  },
  {
    title: "Country",
    dataIndex: "address_country",
    key: "address_country",
  },
  // 🔹 Billing
  {
    title: "Billing Address",
    dataIndex: "billing_address",
    key: "billing_address",
  },
  {
    title: "Billing ZIP",
    dataIndex: "billing_zipcode",
    key: "billing_zipcode",
  },
  {
    title: "Billing City",
    dataIndex: "billing_city",
    key: "billing_city",
  },
  {
    title: "Billing State",
    dataIndex: "billing_state",
    key: "billing_state",
  },
  {
    title: "Billing Country",
    dataIndex: "billing_country",
    key: "billing_country",
  },
  // 🔹 Booking Info
  {
    title: "Booking Date",
    dataIndex: "bookingdate",
    key: "bookingdate",
    render: (text, record) =>
      record.bookingdate ? moment(record.bookingdate).format("DD-MM-YYYY") : "",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  // 🔹 Course
  {
    title: "Course Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Course",
    dataIndex: "course",
    key: "course",
  },
  {
    title: "Level",
    dataIndex: "level",
    key: "level",
  },
  {
    title: "No. of Weeks",
    dataIndex: "no_of_weeks",
    key: "no_of_weeks",
  },
  {
    title: "Course Start",
    dataIndex: "course_from_date",
    key: "course_from_date",
    render: (text, record) =>
      record.course_from_date
        ? moment(record.course_from_date).format("DD-MM-YYYY")
        : "",
  },
  {
    title: "Course End",
    dataIndex: "course_to_date",
    key: "course_to_date",
    render: (text, record) =>
      record.course_to_date
        ? moment(record.course_to_date).format("DD-MM-YYYY")
        : "",
  },
  // 🔹 Accommodation
  {
    title: "Accommodation",
    dataIndex: "accommodation",
    key: "accommodation",
  },
  {
    title: "Room",
    dataIndex: "room",
    key: "room",
  },
  {
    title: "Board",
    dataIndex: "board",
    key: "board",
  },
  {
    title: "Accommodation Weeks",
    dataIndex: "no_of_weeks_accommodation",
    key: "no_of_weeks_accommodation",
  },
  {
    title: "Accommodation From",
    dataIndex: "accommodation_from_date",
    key: "accommodation_from_date",
  },
  {
    title: "Accommodation To",
    dataIndex: "accommodation_to_date",
    key: "accommodation_to_date",
  },
  // 🔹 Visa / Passport
  {
    title: "Student Visa",
    dataIndex: "student_visa",
    key: "student_visa",
    render: (val) => (val ? "Yes" : "No"),
  },
  {
    title: "Passport Number",
    dataIndex: "passport_number",
    key: "passport_number",
  },
  {
    title: "Passport Valid From",
    dataIndex: "passport_from",
    key: "passport_from",
  },
  {
    title: "Passport Valid Until",
    dataIndex: "passport_until",
    key: "passport_until",
  },
  {
    title: "Visa From",
    dataIndex: "visa_from",
    key: "visa_from",
  },
  {
    title: "Visa Until",
    dataIndex: "visa_until",
    key: "visa_until",
  },
  {
    title: "Visa Status",
    dataIndex: "visa_status",
    key: "visa_status",
  },
  {
    title: "Visa Type",
    dataIndex: "visa_type",
    key: "visa_type",
  },
  {
    title: "Payment Amount",
    dataIndex: "payment_amount",
    key: "payment_amount",
  },
  {
    title: "Payment Method",
    dataIndex: "payment_method",
    key: "payment_method",
  },
];



useEffect(() => {
  if (!data || data.length === 0 || salespersonList.length === 0) return;

  const mapped = data.map((entry) => {
    const salespersonObj = salespersonList.find(
      (s) => String(s.value) === String(entry.salesperson)  // ensure type match
    );

    return {
      _id: entry._id || null,
      payment_amount: entry.payment_amount || "",
      payment_method: entry.payment_method || "",
      payment_invoice_number: entry.payment_invoice_number || "",
      studentid: entry.studentid,
      salesperson: salespersonObj ? salespersonObj.label : entry.salesperson, // show name
      lead: entry.lead,
      firstname: entry.firstname,
      surname: entry.surname,
      phone: entry.phone,
      email: entry.email,
      gender: entry.gender,
      dob: entry.dob,
      nationality: entry.nationality,
      country_birth: entry.country_birth,
      country_residence: entry.country_residence,
      mother_tongue: entry.mother_tongue,
      // Address
      address_address: entry.address_address,
      address_zipcode: entry.address_zipcode,
      address_city: entry.address_city,
      address_state: entry.address_state,
      address_country: entry.address_country,
      // Billing
      billing_address: entry.billing_address,
      billing_zipcode: entry.billing_zipcode,
      billing_city: entry.billing_city,
      billing_state: entry.billing_state,
      billing_country: entry.billing_country,
      // Booking Info
      bookingdate: entry.bookingdate,
      status: entry.status,
      // Course
      category: entry.category,
      course: entry.course,
      level: entry.level,
      no_of_weeks: entry.no_of_weeks,
      course_from_date: entry.course_from_date,
      course_to_date: entry.course_to_date,
      // Accommodation
      accommodation: entry.accommodation,
      room: entry.room,
      board: entry.board,
      no_of_weeks_accommodation: entry.no_of_weeks_accommodation,
      accommodation_from_date: entry.accommodation_from_date,
      accommodation_to_date: entry.accommodation_to_date,
      // Visa / Passport
      student_visa: entry.student_visa,
      passport_number: entry.passport_number,
      passport_from: entry.passport_from,
      passport_until: entry.passport_until,
      visa_from: entry.visa_from,
      visa_until: entry.visa_until,
      visa_status: entry.visa_status,
      visa_type: entry.visa_type,
    };
  });

  setTransformedData(mapped);
}, [data, salespersonList]);

  const visibleColumns = columns.filter(
    (column) => column.dataIndex !== "_id"
  );

  const handleEditModalOpen = () => {
    setEditModalVisible(true);
  };

  const handleEditModalCancel = () => {
    setEditModalVisible(false);
  };

  const handleEditModalOk = () => {
    // Handle logic when submitting the edit form
    setEditModalVisible(false);
  };


const handleEditButtonClick = async () => {
    try {
      console.log("Selected Row Keys:", selectedRowKeys);
      console.log("Selected Record ID Before Fetch:", selectedRecordId);

      if (!selectedRecordId) {
        // No record selected, show a message
        Modal.warning({
          title: "Please Select a Record",
          content: "Please select a record to edit.",
        });
        return;
      }

      if (selectedRowKeys.length > 1) {
        // More than one record selected, show a message
        Modal.warning({
          title: "Select Only One Record",
          content: "Please select only one record at a time for editing.",
        });
        return;
      }

      // Send the selected record ID in the request body
      const response = await axios.post(`${baseURL}/getdata`, {
        collectionName: "bookinghubspotdatas",
        id: selectedRecordId,
      });

      // The response.data should contain the data for the selected record
      console.log("API Response for Edit:", response.data);

      // Set the editing record data
      setEditingRecordData(response.data);

      // Open the edit modal
      handleEditModalOpen();
    } catch (error) {
      console.error("Error fetching data for edit:", error);
      // Handle the error (show a message or return)
    }
  };


 const handleDeleteButtonClick = () => {
     if (selectedRowKeys.length === 0) {
       // No record selected, show a warning message
       message.warning("Please select records to delete.");
     } else {
       // Records are selected, show the delete confirmation modal
       setDeleteModalVisible(true);
     }
   };
 
   
   
   const handleDeleteModalOk = async () => {
     // Call the common delete API with the selected record IDs
     await handleDelete(
       "bookinghubspotdatas",
       selectedRowKeys,
       fetchData,
       setDeleteModalVisible
     );
   };
 
   const handleDeleteModalCancel = () => {
     // Close the delete confirmation modal without performing the deletion
     setDeleteModalVisible(false);
   };

  const CancelBothModel= () =>{
    setNewModalVisible(false);
    setEditModalVisible(false);
  }
  const handleNewButtonClick = () => {
    form.resetFields(); // Reset form fields when clicking "New"
  };

const handleExportExcel = async () => {
  if (!lastPayload) {
    console.warn("No payload available yet for export.");
    return;
  }

  try {
    // ✅ reuse same payload as filter
    const response = await axios.post(`${baseURL}/bookings/export`, lastPayload, {
      responseType: "blob",
    });

    fileDownload(response.data, "bookings_export.csv");
  } catch (err) {
    console.error("Export failed:", err);
  }
};

const handlePaymentClick = () => {
  if (!selectedRecordId) {
    message.warning("Please select a record first!");
    return;
  }
  setPaymentModalVisible(true);
};

// handle Communication button click
const handleCommunicationClick = () => {
  if (!selectedRecordId) {
     message.warning("Please select a record first!");
    return;
  }
  // Fetch templates or details via API here if needed
  fetch(`/api/templates/${selectedRecordId}`)
    .then(res => res.json())
    .then(data => setTemplates(data))
    .catch(err => console.error("Error fetching templates", err));

  setCommunicationModalVisible(true);
};


  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="">Bookings</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      <hr />
      <div>
        <div
          style={{
            marginBottom: 16,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Space>
<SearchInputnew
  filters={filters}
  setFilters={setFilters}
  searchText={searchText}
  setSearchText={setSearchText}
  onSearch={(val) => fetchData(filters, val)}
/>


          </Space>

        
        </div>
 <div
          style={{
            marginBottom: 16,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
        

          <Space>
  <AddEditDeleteDeactivateAll
    onClickNew={handleNewModalOpen}
    onClickEdit={handleEditButtonClick}
    onClickDelete={handleDeleteButtonClick}
    onClickExportExcel={handleExportExcel}
    onClickPayment={handlePaymentClick}
    onClickCommunication={handleCommunicationClick} // added
  />

  {/* Payment Modal */}
  <PaymentModal
    open={paymentModalVisible}
    onCancel={() => setPaymentModalVisible(false)}
    recordId={selectedRecordId}
  />

  {/* Communication Modal */}
  <CommunicationModal
    open={communicationModalVisible}
    onCancel={() => setCommunicationModalVisible(false)}
    recordId={selectedRecordId}
    templates={templates}
    selectedTemplate={selectedTemplate}
    setSelectedTemplate={setSelectedTemplate}
  />
</Space>

        </div>
        <Modal
          title="Add New Booking"
          visible={newModalVisible}
          onOk={handleNewModalOk}
          onCancel={handleNewModalCancel}
          width={1000} // Set your preferred width value
          style={{
            top: 20,
          }}
          footer={null} // Set footer to null to remove buttons
        >
          <BookingForm
          form={form}
            formValues={formValues}
            setNewModalVisible={setNewModalVisible}
            handleNewModalCancel={handleNewModalCancel}
            CancelBothModel={CancelBothModel}
            fetchData={fetchData}
            setSelectedRecordId={setSelectedRecordId}

          />
        </Modal>

        <Modal
          title="Edit Booking"
          visible={editModalVisible}
          onOk={handleEditModalOk}
          onCancel={handleEditModalCancel}
          width={1000}
          style={{
            top: 20,
          }}
          footer={null} // Set footer to null to remove buttons
        >
          <BookingForm
         selectedRecordId={selectedRecordId}
            recordData={editingRecordData}
            setEditModalVisible={setEditModalVisible}
            fetchData={fetchData}
            handleNewModalCancel={handleNewModalCancel}
            CancelBothModel={CancelBothModel}
            setSelectedRecordId={setSelectedRecordId}
          />
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          title="Delete Confirmation"
          visible={deleteModalVisible}
          onOk={handleDeleteModalOk}
          onCancel={handleDeleteModalCancel}
          okText="Delete"
          cancelText="Cancel"
        >
          <p>Are you sure you want to delete the selected records?</p>
        </Modal>

        <h5>Personal Details</h5>

      <Spin spinning={loading}>
  <Table
    rowSelection={{
      selectedRowKeys,
      onChange: onSelectChange,
      fixed: true,
    }}
    columns={visibleColumns}
    dataSource={filteredData}   // ✅ now uses API response
    rowKey={(record) => record._id}
    scroll={{ x: "max-content" }}
  />
</Spin>

      </div>
    </>
  );
};

export default Bookings;
