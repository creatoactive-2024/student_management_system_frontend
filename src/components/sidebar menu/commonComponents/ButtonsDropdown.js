import React, { useState, useEffect } from "react";
import {
  Button,
  Space,
  Input,
  Upload,
  message,
  Select,
  Form,
  DatePicker,
  Drawer,
  Collapse,
  InputNumber,
  Tag,
} from "antd";
import {
  AiOutlineSearch,
  AiOutlineFilter,
  AiOutlinePlusCircle,
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineExclamationCircle,
  AiOutlineFileExcel,
  AiOutlineFileText,
  AiOutlineImport,
  AiOutlineDollarCircle,
  AiOutlineMail,
} from "react-icons/ai";
import { space } from "postcss/lib/list";
import { color } from "framer-motion";
import axios from "axios";
import baseURL from "./baseURL";
import { FieldListDropdown } from "./FieldListDropdown";
import fileDownload from "js-file-download";


const { Option } = Select; // Add this line to import the Option component
const { RangePicker } = DatePicker;
const { Panel } = Collapse;



//-----------------import export functions------------------
const handleCsvExport = () => {
  // Logic to export data as CSV
  message.success("CSV export logic goes here");
};

const handleExcelExport = () => {
  // Logic to export data as Excel
  message.success("Excel export logic goes here");
};

const handleImport = (file) => {
  // Logic to handle file import
  message.success(`File ${file.name} uploaded successfully`);
};

const importProps = {
  beforeUpload: (file) => {
    // Disable default upload behavior
    return false;
  },
  onChange: (info) => {
    if (info.file.status === "done") {
      handleImport(info.file.originFileObj);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const NewFilter = ({ onClick }) => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [labelValue, setLabelValue] = useState("");

  const handleDateChange = (dates) => {
    if (dates && dates.length === 2) {
      setFromDate(dates[0]);
      setToDate(dates[1]);
    }
  };

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setLabelValue((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  return (
    <Space>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ marginRight: "20px" }}>
          <RangePicker onChange={handleDateChange} />
        </div>
        <label style={{ marginRight: "10px" }}>Based On :</label>
        <div style={{ marginRight: "10px" }}>
          <DatePicker
            placeholder="Date of Complaint"
            value={labelValue["label1"]}
            onChange={(value) => handleInputChange(value, "label1")}
            style={{ width: 160 }}
          />
        </div>
        : :
        <div style={{ marginLeft: "10px" }}>
          <Select
            placeholder="-Area-"
            value={labelValue["label2"]}
            onChange={(value) => handleInputChange(value, "label2")}
            style={{ width: 160 }}
          >
            <Option value="option1">Option 1</Option>
            <Option value="option2">Option 2</Option>
            <Option value="option3">Option 3</Option>
          </Select>
        </div>
      </div>
    </Space>
  );
};

// const SearchInputnew = ({ onSearch }) => {
//   const [open, setOpen] = useState(false);

//   const showDrawer = () => setOpen(true);
//   const closeDrawer = () => setOpen(false);

//   return (
//     <>
//       <Space>
//         <Input
//           style={{ width: "300px" }}
//           placeholder="Enter name, phone, e-mail, or booking ID"
//           prefix={<AiOutlineSearch style={{ marginRight: 8 }} />}
//           onChange={(e) => onSearch(e.target.value)}
//           allowClear
//         />
//         <Button
//           type="primary"
//           icon={<AiOutlineFilter />}
//           style={{ marginLeft: 8 }}
//           onClick={showDrawer}
//         >
//           Filter
//         </Button>
//       </Space>

//       {/* 🔹 Drawer (Slider from right) */}
//       <Drawer
//         title="Advanced Filters"
//         placement="right"
//         onClose={closeDrawer}
//         open={open}
//         width={400}
//       >
//         {/* 🔹 Collapse with arrows */}
//         <Collapse accordion>
//           <Panel header="Booking Status" key="1">
//             <p>👉 Here you can add name, email, phone filters</p>
//           </Panel>
//           <Panel header="Course/Product Type" key="2">
//             <p>👉 Add booking date / status filters</p>
//           </Panel>
//           <Panel header="Dates" key="3">
//             <p>👉 Add course, level, weeks filters</p>
//           </Panel>
//           <Panel header="Teacher" key="4">
//             <p>👉 Add accommodation filters here</p>
//           </Panel>
//           <Panel header="Sales Manager" key="5">
//             <p>👉 Add visa & passport filters here</p>
//           </Panel>
//           <Panel header="Financial Data" key="6">
//             <p>👉 Add visa & passport filters here</p>
//           </Panel>
//         </Collapse>
//       </Drawer>
//     </>
//   );
// };



// const SearchInputnew = ({ onSearch }) => {
//   const [open, setOpen] = useState(false);
//   const [course, setCourse] = useState('');
//   const [weekdays, setWeekdays] = useState([]);
//     const [courses, setCourses] = useState([]);
//   const [salespersonList, setSalespersonList] = useState([]);

//   const showDrawer = () => setOpen(true);
//   const closeDrawer = () => setOpen(false);
//  const [form] = Form.useForm();


//   const fetchWeekdays = async (courseName) => {
//   try {
//     const response = await axios.post(`${baseURL}/get-weekdays`, {
//       courseName,
//     });

//     if (response.data.error) {
//       // Handle case where no matching classes found
//       setWeekdays([]);
//     } else {
//       // Set weekdays from response data
//       setWeekdays(response.data);
//     }
//   } catch (error) {
//     console.error('Error fetching weekdays:', error);
//     // Handle error case
//     setWeekdays([]);
//   }
// };

// const fetchCourses = async () => {
//     try {
//       const responseData = await FieldListDropdown("courses", "title_english");
//       if (responseData) {
//         // Extract category names from response data
//         const names = responseData.map((category) => ({
//           value: category._id, // Use the appropriate property for the value
//           label: category.title_english // Use the appropriate property for the label
//         }));
//         // const names = responseData.map((category) => category.title_english);
//         setCourses(names);
//       }
//     } catch (error) {
//       console.error("Error fetching courses", error);
//     }
//   };

//    const fetchSalesperson = async () => {
//       try {
//         const responseData = await FieldListDropdown(
//           "overviewadmins",
//           "first_name"
//         );
//         if (responseData) {
//           // Extract course levels and construct objects with value and label properties
//           const Name = responseData
//             .map((firstname) => ({
//               value: firstname._id, // Use the appropriate property for the value
//               label: firstname.first_name, // Use the appropriate property for the label
//             }))
//             .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically
  
//           setSalespersonList(Name);
//         }
//       } catch (error) {
//         console.error("Error fetching firstname:", error);
//       }
//     };

//   const handleCourseChange = async (value) => {
//   setCourse(value);

//   // Reset preferred_course_start_weekday field when course changes
//   form.setFieldsValue({
//     preferred_course_start_weekday: undefined,
//   });

//   // Fetch weekdays based on course
//   fetchWeekdays(value);
// };

//  const handleChange = (value) => {
//     console.log(`Selected value: ${value}`);
//   };

//  useEffect(() => {
//     fetchCourses();
//     fetchSalesperson();
//   }, []); 

//   return (
//     <>
//       <Space>
//         <Input
//           style={{ width: "300px" }}
//           placeholder="Enter name, phone, e-mail, or booking ID"
//           prefix={<AiOutlineSearch style={{ marginRight: 8 }} />}
//           onChange={(e) => onSearch(e.target.value)}
//           allowClear
//         />
//         <Button
//           type="primary"
//           icon={<AiOutlineFilter />}
//           style={{ marginLeft: 8 }}
//           onClick={showDrawer}
//         >
//           Filter
//         </Button>
//       </Space>

//       {/* 🔹 Drawer (Slider from right) */}
//       <Drawer
//         title="Advanced Filters"
//         placement="right"
//         onClose={closeDrawer}
//         open={open}
//         width={400}
//       >
//         {/* 🔹 Collapse with arrows */}
//         <Collapse accordion>
//           {/* Booking Status */}
//           <Panel header="Booking Status" key="1">
//             <Select style={{ width: "100%" }} placeholder="Select booking status">
//               <Option value="New – just added, no contact yet.">New – just added, no contact yet.</Option>
//               <Option value="In Progress – communication in progress.">In Progress – communication in progress.</Option>
//               <Option value="Trial Scheduled – a trial lesson is scheduled.">Trial Scheduled – a trial lesson is scheduled.</Option>
//               <Option value="Trial Completed – trial done, decision pending.">Trial Completed – trial done, decision pending.</Option>
//               <Option value="Enrolled – confirmed course participation, not started yet.">Enrolled – confirmed course participation, not started yet.</Option>
//               <Option value="Active – currently attending the course.">Active – currently attending the course.</Option>
//               <Option value="Paused – temporarily on hold (e.g. vacation).">Paused – temporarily on hold (e.g. vacation).</Option>
//               <Option value="Completed – finished the course successfully.">Completed – finished the course successfully.</Option>
//               <Option value="Declined / Not Enrolled – decided not to join.">Declined / Not Enrolled – decided not to join.</Option>
//               <Option value="Lost – inactive, no response.">Lost – inactive, no response.</Option>
//               <Option value="Deleted – removed manually or by mistake.">Deleted – removed manually or by mistake.</Option>
//             </Select>
//           </Panel>

//           {/* Course/Product Type */}
//           <Panel header="Course/Product Type" key="2">
//             <Select style={{ width: "100%" }} placeholder="Select course/product type" onChange={handleCourseChange}>
//               {courses.map((name) => (
//       <Option key={name._id} value={name.label}>
//         {name.label}
//       </Option>
//     ))}
//             </Select>
//           </Panel>

//           {/* Dates */}
//           <Panel header="Dates" key="3">
//             <div style={{ marginBottom: 12 }}>
//               <label>Booking Date:</label>
//               <RangePicker style={{ width: "100%" }} />
//             </div>
//             <div style={{ marginBottom: 12 }}>
//               <label>Check-in date:</label>
//               <RangePicker style={{ width: "100%" }} />
//             </div>
//             <div>
//               <label>Payment Date:</label>
//               <RangePicker style={{ width: "100%" }} />
//             </div>
//           </Panel>

         
          

//           {/* Sales Manager */}
//           <Panel header="Sales Manager" key="5">
//             <Select
//               mode="multiple"
//               style={{ width: "100%" }}
//               placeholder="Select sales managers"
//                showSearch
//               optionFilterProp="children"
//               onChange={handleChange}
//               filterOption={(input, option) =>
//                 option.children.toLowerCase().includes(input.toLowerCase())
//               }
//             >
//               {salespersonList.map((name) => (
//                 <Option key={name.value} value={name.value}>
//                   {name.label}
//                 </Option>
//               ))}
            
//               {/* 🔹 Add manager options manually */}
//             </Select>
//           </Panel>

//           {/* Financial Data */}
//           <Panel header="Financial Data" key="6">
//             <div style={{ marginBottom: 12 }}>
//               <label>Invoice No:</label>
//               <Input placeholder="Enter invoice no" />
//             </div>
//             <div style={{ marginBottom: 12 }}>
//               <label>Amount:</label>
//               <InputNumber style={{ width: "100%" }} placeholder="Enter amount" />
//             </div>
//             <div>
//               <label>Payment Method:</label>
//               <Select
//                 mode="multiple"
//                 style={{ width: "100%" }}
//                 placeholder="Select payment method"
//               >
//                 {/* 🔹 Add payment method options manually */}
//               </Select>
//             </div>
//           </Panel>
//         </Collapse>
//       </Drawer>
//     </>
//   );
// };


// const SearchInputnew = ({ onSearch }) => {
//   const [open, setOpen] = useState(false);
//   const [course, setCourse] = useState('');
//   const [weekdays, setWeekdays] = useState([]);
//   const [courses, setCourses] = useState([]);
//   const [salespersonList, setSalespersonList] = useState([]);

//   const [filters, setFilters] = useState({});
//   const [searchText, setSearchText] = useState("");

//   const showDrawer = () => setOpen(true);
//   const closeDrawer = () => setOpen(false);
//   const [form] = Form.useForm();

//   // 🔹 Live search (with pagination applied on API side)
//   // useEffect(() => {
//   //   onSearch({ searchText, filters });
//   // }, [searchText, filters]);
//   useEffect(() => {
//   if (searchText.trim() !== "") {
//     onSearch({ searchText, filters });
//   }
// }, [searchText]);

//   const fetchCourses = async () => {
//     try {
//       const responseData = await FieldListDropdown("courses", "title_english");
//       if (responseData) {
//         const names = responseData.map((category) => ({
//           value: category._id,
//           label: category.title_english,
//         }));
//         setCourses(names);
//       }
//     } catch (error) {
//       console.error("Error fetching courses", error);
//     }
//   };

//   const fetchSalesperson = async () => {
//     try {
//       const responseData = await FieldListDropdown("overviewadmins", "first_name");
//       if (responseData) {
//         const Name = responseData
//           .map((firstname) => ({
//             value: firstname._id,
//             label: firstname.first_name,
//           }))
//           .sort((a, b) => a.label.localeCompare(b.label));

//         setSalespersonList(Name);
//       }
//     } catch (error) {
//       console.error("Error fetching firstname:", error);
//     }
//   };

//   const handleCourseChange = (value) => {
//     setCourse(value);
//     form.setFieldsValue({ preferred_course_start_weekday: undefined });
//     setFilters((prev) => ({ ...prev, course: value }));
//   };

  
//   const handleStatusChange = (value) => {
//     setFilters((prev) => ({ ...prev, status: value }));
//   };

//   const handleSalespersonChange = (values) => {
//     setFilters((prev) => ({ ...prev, salesperson: values }));
//   };

//   // 🔹 Clear all filters
//   const clearAllFilters = () => {
//     setFilters({});
//     form.resetFields();
//   };

//   // 🔹 Apply filters
//   const applyFilters = () => {
//     onSearch({ searchText, filters });
//     closeDrawer();
//   };

//   // 🔹 Remove single filter
//   // const removeFilter = (key) => {
//   //   const newFilters = { ...filters };
//   //   delete newFilters[key];
//   //   setFilters(newFilters);
//   // };

//   const removeFilter = (key) => {
//   const newFilters = { ...filters };
//   delete newFilters[key];
//   setFilters(newFilters);

//   // Immediately re-fetch with updated filters
//   onSearch({ searchText, filters: newFilters });
// };

//   useEffect(() => {
//     fetchCourses();
//     fetchSalesperson();
//   }, []);

//   return (
//     <>
//       <Space wrap>
//         {/* 🔹 Active filters as tags */}
       

//         <Input
//           style={{ width: "300px" }}
//           placeholder="Enter name, phone, e-mail, or booking ID"
//           prefix={<AiOutlineSearch style={{ marginRight: 8 }} />}
//           onChange={(e) => setSearchText(e.target.value)}
//           allowClear
//         />


// {Object.entries(filters).map(([key, value]) => {
//   let displayValue = value;

//   // If salesperson, map IDs to labels
//   if (key === "salesperson") {
//     if (Array.isArray(value)) {
//       displayValue = value
//         .map((id) => {
//           const match = salespersonList.find((sp) => sp.value === id);
//           return match ? match.label : id; // fallback to ID if no match
//         })
//         .join(", ");
//     } else {
//       const match = salespersonList.find((sp) => sp.value === value);
//       displayValue = match ? match.label : value;
//     }
//   }

//   return (
//     <Tag
//       key={key}
//       closable
//       onClose={() => removeFilter(key)}
//       color="blue"
//     >
//       {`${key}: ${displayValue}`}
//     </Tag>
//   );
// })}


//         <Button
//           type="primary"
//           icon={<AiOutlineFilter />}
//           style={{ marginLeft: 8 }}
//           onClick={showDrawer}
//         >
//           Filter
//         </Button>
//       </Space>

//       <Drawer
//         title="Advanced Filters"
//         placement="right"
//         onClose={closeDrawer}
//         open={open}
//         width={400}
//         footer={
//           <Space style={{ display: "flex", justifyContent: "flex-end" }}>
//             <Button onClick={clearAllFilters}>Clear Filters</Button>
//             <Button type="primary" onClick={applyFilters}>
//               Apply Filters
//             </Button>
//           </Space>
//         }
//       >
//         <Collapse accordion>
//           {/* Booking Status */}
//           <Panel header="Booking Status" key="1">
//             <Select
//               style={{ width: "100%" }}
//               placeholder="Select booking status"
//               onChange={handleStatusChange}
//               value={filters.status}
//             >
//               <Option value="New – just added, no contact yet.">New – just added, no contact yet.</Option>
//               <Option value="In Progress – communication in progress.">In Progress – communication in progress.</Option>
//               <Option value="Trial Scheduled – a trial lesson is scheduled.">Trial Scheduled – a trial lesson is scheduled.</Option>
//               <Option value="Trial Completed – trial done, decision pending.">Trial Completed – trial done, decision pending.</Option>
//               <Option value="Enrolled – confirmed course participation, not started yet.">Enrolled – confirmed course participation, not started yet.</Option>
//               <Option value="Active – currently attending the course.">Active – currently attending the course.</Option>
//               <Option value="Paused – temporarily on hold (e.g. vacation).">Paused – temporarily on hold (e.g. vacation).</Option>
//               <Option value="Completed – finished the course successfully.">Completed – finished the course successfully.</Option>
//               <Option value="Declined / Not Enrolled – decided not to join.">Declined / Not Enrolled – decided not to join.</Option>
//               <Option value="Lost – inactive, no response.">Lost – inactive, no response.</Option>
//               <Option value="Deleted – removed manually or by mistake.">Deleted – removed manually or by mistake.</Option>
//             </Select>
//           </Panel>

//           {/* Course/Product Type */}
//           <Panel header="Course/Product Type" key="2">
//             <Select
//               style={{ width: "100%" }}
//               placeholder="Select course/product type"
//               onChange={handleCourseChange}
//               value={filters.course}
//             >
//               {courses.map((name) => (
//                 <Option key={name.value} value={name.label}>
//                   {name.label}
//                 </Option>
//               ))}
//             </Select>
//           </Panel>

//           {/* Dates */}
//           <Panel header="Dates" key="3">
//             <div style={{ marginBottom: 12 }}>
//               <label>Booking Date:</label>
//               <RangePicker
//                 style={{ width: "100%" }}
//                 onChange={(dates) =>
//                   setFilters((prev) => ({
//                     ...prev,
//                     bookingDate: dates ? [dates[0].format("YYYY-MM-DD"), dates[1].format("YYYY-MM-DD")] : null,
//                   }))
//                 }
//               />
//             </div>
//             <div style={{ marginBottom: 12 }}>
//               <label>Check-in date:</label>
//               <RangePicker
//                 style={{ width: "100%" }}
//                 onChange={(dates) =>
//                   setFilters((prev) => ({
//                     ...prev,
//                     checkinDate: dates ? [dates[0].format("YYYY-MM-DD"), dates[1].format("YYYY-MM-DD")] : null,
//                   }))
//                 }
//               />
//             </div>
//             <div>
//               <label>Payment Date:</label>
//               <RangePicker
//                 style={{ width: "100%" }}
//                 onChange={(dates) =>
//                   setFilters((prev) => ({
//                     ...prev,
//                     paymentDate: dates ? [dates[0].format("YYYY-MM-DD"), dates[1].format("YYYY-MM-DD")] : null,
//                   }))
//                 }
//               />
//             </div>
//           </Panel>

//           {/* Sales Manager */}
//           <Panel header="Sales Manager" key="5">
//             <Select
//               mode="multiple"
//               style={{ width: "100%" }}
//               placeholder="Select sales managers"
//               showSearch
//               optionFilterProp="children"
//               value={filters.salesperson}
//               onChange={handleSalespersonChange}
//               filterOption={(input, option) =>
//                 option.children.toLowerCase().includes(input.toLowerCase())
//               }
//             >
//               {salespersonList.map((name) => (
//                 <Option key={name.value} value={name.value}>
//                   {name.label}
//                 </Option>
//               ))}
//             </Select>
//           </Panel>

//           {/* Financial Data */}
//           <Panel header="Financial Data" key="6">
//             <div style={{ marginBottom: 12 }}>
//               <label>Invoice No:</label>
//               <Input
//                 placeholder="Enter invoice no"
//                 value={filters.invoiceNo}
//                 onChange={(e) =>
//                   setFilters((prev) => ({
//                     ...prev,
//                     invoiceNo: e.target.value,
//                   }))
//                 }
//               />
//             </div>
//             <div style={{ marginBottom: 12 }}>
//               <label>Amount:</label>
//               <InputNumber
//                 style={{ width: "100%" }}
//                 placeholder="Enter amount"
//                 value={filters.amount}
//                 onChange={(value) =>
//                   setFilters((prev) => ({ ...prev, amount: value }))
//                 }
//               />
//             </div>
//             <div>
//               <label>Payment Method:</label>
//               <Select
//                 mode="multiple"
//                 style={{ width: "100%" }}
//                 placeholder="Select payment method"
//                 value={filters.paymentMethod}
//                 onChange={(values) =>
//                   setFilters((prev) => ({ ...prev, paymentMethod: values }))
//                 }
//               >
//                 <Option value="Cash">Cash</Option>
//                 <Option value="Card">Card</Option>
//                 <Option value="Bank Transfer">Bank Transfer</Option>
//               </Select>
//             </div>
//           </Panel>
//         </Collapse>
//       </Drawer>
//     </>
//   );
// };


const SearchInputnew = ({ onSearch }) => {
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [salespersonList, setSalespersonList] = useState([]);

  const [filters, setFilters] = useState({});        // ✅ Applied filters (used for tags + API)
  const [tempFilters, setTempFilters] = useState({}); // ✅ Temporary sidebar filters
  const [searchText, setSearchText] = useState("");

  const [form] = Form.useForm();
const showDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  // 🔹 Live search
// 🔹 Live search
useEffect(() => {
  if (searchText.trim() !== "") {
    // When user types something → filter
    onSearch({ searchText, filters });
  } else {
    // When input is cleared → reset results (fetch all with filters)
    onSearch({ searchText: "", filters });
  }
}, [searchText, filters]);


  const fetchCourses = async () => {
    try {
      const responseData = await FieldListDropdown("courses", "title_english");
      if (responseData) {
        setCourses(
          responseData.map((c) => ({ value: c._id, label: c.title_english }))
        );
      }
    } catch (error) {
      console.error("Error fetching courses", error);
    }
  };

  const fetchSalesperson = async () => {
    try {
      const responseData = await FieldListDropdown("overviewadmins", "first_name");
      if (responseData) {
        setSalespersonList(
          responseData
            .map((sp) => ({ value: sp._id, label: sp.first_name }))
            .sort((a, b) => a.label.localeCompare(b.label))
        );
      }
    } catch (error) {
      console.error("Error fetching firstname:", error);
    }
  };

  // 🔹 Apply filters
  const applyFilters = () => {
    setFilters(tempFilters); // ✅ Commit sidebar filters
    onSearch({ searchText, filters: tempFilters });
    closeDrawer();
  };

  // 🔹 Clear all filters
  const clearAllFilters = () => {
    setFilters({});
    setTempFilters({});
    form.resetFields();
    onSearch({ searchText, filters: {} });
  };

  // 🔹 Remove single filter
  const removeFilter = (key) => {
    const newFilters = { ...filters };
    delete newFilters[key];
    setFilters(newFilters);
    setTempFilters(newFilters); // ✅ Keep sidebar in sync
    onSearch({ searchText, filters: newFilters });
  };

  useEffect(() => {
    fetchCourses();
    fetchSalesperson();
  }, []);

  return (
    <>
      <Space wrap>
        {/* 🔹 Active filters as tags */}
        <Input
          style={{ width: "300px" }}
          placeholder="Enter name, phone, e-mail, or booking ID"
          prefix={<AiOutlineSearch style={{ marginRight: 8 }} />}
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
        />

        {Object.entries(filters).map(([key, value]) => {
          let displayValue = value;

          if (key === "salesperson") {
            if (Array.isArray(value)) {
              displayValue = value
                .map((id) => {
                  const match = salespersonList.find((sp) => sp.value === id);
                  return match ? match.label : id;
                })
                .join(", ");
            } else {
              const match = salespersonList.find((sp) => sp.value === value);
              displayValue = match ? match.label : value;
            }
          }

          return (
            <Tag
              key={key}
              closable
              onClose={() => removeFilter(key)}
              color="blue"
            >
              {`${key}: ${displayValue}`}
            </Tag>
          );
        })}

        <Button
          type="primary"
          icon={<AiOutlineFilter />}
          style={{ marginLeft: 8 }}
          onClick={() => {
            setTempFilters(filters); // ✅ Load applied filters into sidebar
            setOpen(true);
          }}
        >
          Filter
        </Button>
      </Space>

      <Drawer
        title="Advanced Filters"
        placement="right"
        onClose={closeDrawer}
        open={open}
        width={400}
        footer={
          <Space style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={clearAllFilters}>Clear Filters</Button>
            <Button type="primary" onClick={applyFilters}>
              Apply Filters
            </Button>
          </Space>
        }
      >
        <Collapse accordion>
          {/* Booking Status */}
          <Panel header="Booking Status" key="1">
            <Select
              style={{ width: "100%" }}
              placeholder="Select booking status"
              value={tempFilters.status}
              onChange={(value) =>
                setTempFilters((prev) => ({ ...prev, status: value }))
              }
            >
              <Option value="New – just added, no contact yet.">
                New – just added, no contact yet.
              </Option>
              <Option value="In Progress – communication in progress.">
                In Progress – communication in progress.
              </Option>
              <Option value="Trial Scheduled – a trial lesson is scheduled.">
                Trial Scheduled – a trial lesson is scheduled.
              </Option>
              <Option value="Trial Completed – trial done, decision pending.">
                Trial Completed – trial done, decision pending.
              </Option>
              <Option value="Enrolled – confirmed course participation, not started yet.">
                Enrolled – confirmed course participation, not started yet.
              </Option>
              <Option value="Active – currently attending the course.">
                Active – currently attending the course.
              </Option>
              <Option value="Paused – temporarily on hold (e.g. vacation).">
                Paused – temporarily on hold (e.g. vacation).
              </Option>
              <Option value="Completed – finished the course successfully.">
                Completed – finished the course successfully.
              </Option>
              <Option value="Declined / Not Enrolled – decided not to join.">
                Declined / Not Enrolled – decided not to join.
              </Option>
              <Option value="Lost – inactive, no response.">
                Lost – inactive, no response.
              </Option>
              <Option value="Deleted – removed manually or by mistake.">
                Deleted – removed manually or by mistake.
              </Option>
            </Select>
          </Panel>

          {/* Course/Product Type */}
          <Panel header="Course/Product Type" key="2">
            <Select
              style={{ width: "100%" }}
              placeholder="Select course/product type"
              value={tempFilters.course}
              onChange={(value) =>
                setTempFilters((prev) => ({ ...prev, course: value }))
              }
            >
              {courses.map((c) => (
                <Option key={c.value} value={c.label}>
                  {c.label}
                </Option>
              ))}
            </Select>
          </Panel>

          {/* Dates */}
          <Panel header="Dates" key="3">
            <div style={{ marginBottom: 12 }}>
              <label>Booking Date:</label>
              <RangePicker
                style={{ width: "100%" }}
                value={tempFilters.bookingDate}
                onChange={(dates) =>
                  setTempFilters((prev) => ({
                    ...prev,
                    bookingDate: dates
                      ? [dates[0].format("YYYY-MM-DD"), dates[1].format("YYYY-MM-DD")]
                      : null,
                  }))
                }
              />
            </div>
          </Panel>

          {/* Sales Manager */}
          <Panel header="Sales Manager" key="5">
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Select sales managers"
              value={tempFilters.salesperson}
              onChange={(values) =>
                setTempFilters((prev) => ({ ...prev, salesperson: values }))
              }
            >
              {salespersonList.map((sp) => (
                <Option key={sp.value} value={sp.value}>
                  {sp.label}
                </Option>
              ))}
            </Select>
          </Panel>

 {/* Financial Data */}
       <Panel header="Financial Data" key="6">
            <div style={{ marginBottom: 12 }}>
             <label>Invoice No:</label>
             <Input placeholder="Enter invoice no" />
           </div>
            <div style={{ marginBottom: 12 }}>
            <label>Amount:</label>
            <InputNumber style={{ width: "100%" }} placeholder="Enter amount" />
           </div>
            <div>
               <label>Payment Method:</label>
               <Select
                 mode="multiple"
                 style={{ width: "100%" }}
                 placeholder="Select payment method"
               >
                 {/* 🔹 Add payment method options manually */}
               </Select>
             </div>
           </Panel>

        </Collapse>
      </Drawer>
    </>
  );
};



export default SearchInputnew;


const SearchInput = ({ onClick }) => {
  return (
    <Space>
      {/* <Button icon={<AiOutlineQuestionCircle />}>Support</Button> */}
      <Input
        placeholder="Search"
        prefix={<AiOutlineSearch style={{ marginRight: 8 }} />}
      />
      <Button
        type="primary"
        icon={<AiOutlineFilter />}
        style={{ marginLeft: 8 }}
      >
        Filter
      </Button>
    </Space>
  );
};



const AddEditDeleteDeactivateAll = ({
  onClickNew,
  onClickEdit,
  onClickDelete,
  onClickPayment,
  onClickCommunication,
  onClickExportExcel,
}) => {


  
  return (
    <Space>
      {/* ✅ Primary Action */}
       <Button
        type="primary"
        style={{ backgroundColor: "green", borderColor: "green" }}
        icon={<AiOutlinePlusCircle />}
        onClick={onClickNew}
        success
      >
        New
      </Button>
      <Button type="primary" icon={<AiOutlineEdit />} onClick={onClickEdit}>
        Edit
      </Button>
      <Button
        type="primary"
        style={{ backgroundColor: "#ff4d4f" }}
        icon={<AiOutlineDelete />}
        onClick={onClickDelete}
        danger
      >
        Delete
      </Button>
      <Button
        type="primary"
        style={{ backgroundColor: "#faad14", borderColor: "#faad14" }}
        icon={<AiOutlineExclamationCircle />}
      >
        Deactivate
      </Button>

      {/* 🔹 Additional Actions */}
      <Button
        type="default"
        icon={<AiOutlineDollarCircle />}
        onClick={onClickPayment}
      >
        Payment
      </Button>

      <Button
        type="default"
        icon={<AiOutlineMail />}
        onClick={onClickCommunication}
      >
        Communication
      </Button>

      <Button
        type="default"
        icon={<AiOutlineFileExcel />}
        onClick={onClickExportExcel}
      >
        Export to Excel
      </Button>
    </Space>
  );
};




const AddEditDeleteDeactivate = ({
  onClickNew,
  onClickEdit,
  onClickDelete,
}) => {
  return (
    <Space>
      <Button
        type="primary"
        style={{ backgroundColor: "green", borderColor: "green" }}
        icon={<AiOutlinePlusCircle />}
        onClick={onClickNew}
        success
      >
        New
      </Button>
      <Button type="primary" icon={<AiOutlineEdit />} onClick={onClickEdit}>
        Edit
      </Button>
      <Button
        type="primary"
        style={{ backgroundColor: "#ff4d4f" }}
        icon={<AiOutlineDelete />}
        onClick={onClickDelete}
        danger
      >
        Delete
      </Button>
      <Button
        type="primary"
        style={{ backgroundColor: "#faad14", borderColor: "#faad14" }}
        icon={<AiOutlineExclamationCircle />}
      >
        Deactivate
      </Button>
    </Space>
  );
};

const AddEditDelete = ({ onClickNew, onClickEdit, onClickDelete }) => {
  return (
    <Space>
      <Button
        type="primary"
        style={{ backgroundColor: "green", borderColor: "green"}}
        icon={<AiOutlinePlusCircle />}
        onClick={onClickNew}
        success
      >
        New
      </Button>
      <Button type="primary" icon={<AiOutlineEdit />} onClick={onClickEdit} >
        Edit
      </Button>
      <Button
        type="primary"
        style={{ backgroundColor: "#ff4d4f" }}
        icon={<AiOutlineDelete />}
        onClick={onClickDelete}
        danger
      >
        Delete
      </Button>
    </Space>
  );
};

const CsvExcelImport = ({ handleCsvExport, handleExcelExport }) => {
  return (
    <Space>
      <Button icon={<AiOutlineFileText />} onClick={handleCsvExport}>
        CSV
      </Button>

      <Button icon={<AiOutlineFileExcel />} onClick={handleExcelExport}>
        Excel
      </Button>
      <Upload {...importProps}>
        <Button icon={<AiOutlineImport />}>Import</Button>
      </Upload>
    </Space>
  );
};

const CsvExcelImport1 = ({ handleCsvExport, handleExcelExport }) => {
  return (
    <Space>
      <Button icon={<AiOutlineFileText />} onClick={handleCsvExport}>
        CSV
      </Button>

      <Button icon={<AiOutlineFileExcel />} onClick={handleExcelExport}>
        Excel
      </Button>
    </Space>
  );
};

const CsvExcelImport2 = ({ handleCsvExport, handleExcelExport }) => {
  return (
    <Space>
      <CsvExcelImport1
        handleCsvExport={handleCsvExport}
        handleExcelExport={handleExcelExport}
      />
      <Upload {...importProps}>
        <Button icon={<AiOutlineImport />}>File Manager</Button>
      </Upload>
    </Space>
  );
};

const FiltersDropdown = ({
  handleFilter1Change,
  handleFilter2Change,
  handleFilter3Change,
  filterValue1,
  filterValue2,
  filterValue3,
}) => {
  return (
    <Space>
      {/* New dropdowns for filtering */}
      <Select
        style={{ width: 120 }}
        placeholder="Online"
        onChange={handleFilter1Change}
        value={filterValue1}
      >
        {/* <Option value="online">Online</Option> */}
        <Option value="yes">Yes</Option>
        <Option value="no">No </Option>

        {/* Add more options as needed */}
      </Select>
      <Select
        style={{ width: 120 }}
        placeholder="--Not available separately--"
        onChange={handleFilter2Change}
        value={filterValue2}
      >
        {/* <Option value="" >--Not available separately--</Option> */}
        <Option value="yes">Yes</Option>
        <Option value="no">No </Option>

        {/* Add more options as needed */}
      </Select>
      <Select
        style={{ width: 120 }}
        placeholder="--Validity--"
        onChange={handleFilter3Change}
        value={filterValue3}
      >
        <Option value="activated">Activated</Option>
        <Option value="deactivated">Deactivated</Option>
        {/* Add more options as needed */}
      </Select>
    </Space>
  );
};

const FiltersDropdown1 = ({
  handleFilter1Change,
  handleFilter2Change,
  filterValue1,
  filterValue2,
}) => {
  return (
    <Space>
      <Select
        style={{ width: 120 }}
        placeholder="SELECT TYPE"
        onChange={handleFilter1Change}
        value={filterValue1}
      >
        {/* <Option value="online">Online</Option> */}
        <Option value="All">All</Option>
        <Option value="Low">Low</Option>
        <Option value="Medium">Medium</Option>
        <Option value="High">High</Option>


        {/* Add more options as needed */}
      </Select>

      {/* <Select
        style={{ width: 120 }}
        placeholder="--Validity--"
        onChange={handleFilter2Change}
        value={filterValue2}
      >
        <Option value="activated">Activated</Option>
        <Option value="deactivated">Deactivated</Option>
      </Select> */}
    </Space>
  );
};

const FiltersDropdown2 = ({ handleFilter1Change, filterValue1 }) => {
  return (
    <Space>
      <Select
        style={{ width: 120 }}
        placeholder="--Validity--"
        onChange={handleFilter1Change}
        value={filterValue1}
      >
        <Option value="activated">Activated</Option>
        <Option value="deactivated">Deactivated</Option>
        {/* Add more options as needed */}
      </Select>
    </Space>
  );
};

const FiltersDropdown3 = ({
  handleFilter1Change,
  handleFilter2Change,
  filterValue1,
  filterValue2,
}) => {
  return (
    <Space>
      <Select
        style={{ width: 120 }}
        placeholder="--Season--"
        onChange={handleFilter1Change}
        value={filterValue1}
      >
        <Option value="activated">Activated</Option>
        <Option value="deactivated">Deactivated</Option>
      </Select>
      <Select
        style={{ width: 120 }}
        placeholder="--Transfer provider--"
        onChange={handleFilter2Change}
        value={filterValue2}
      >
        <Option value="activated">Activated</Option>
        <Option value="deactivated">Deactivated</Option>
      </Select>
    </Space>
  );
};

const FiltersDropdown4 = ({
  handleFilter1Change,
  handleFilter2Change,
  filterValue1,
  filterValue2,
}) => {
  return (
    <Space>
      <Select
        style={{ width: 120 }}
        placeholder="--Validity--"
        onChange={handleFilter1Change}
        value={filterValue1}
      >
        <Option value="activated">Activated</Option>
        <Option value="deactivated">Deactivated</Option>
      </Select>
      <Select
        style={{ width: 120 }}
        placeholder="--School--"
        onChange={handleFilter2Change}
        value={filterValue2}
      >
        <Option value="speakuplondon">speakuplondon</Option>
      </Select>
    </Space>
  );
};

const FiltersDropdown5 = ({ handleFilter1Change, filterValue1 }) => {
  return (
    <Space>
      <Select
        style={{ width: 150 }}
        placeholder="Select Country"
        onChange={handleFilter1Change}
        value={filterValue1}
      >
        <Option value="A">A</Option>
        <Option value="B">B </Option>
      </Select>
    </Space>
  );
};

const FiltersDropdownQuestion = ({
  handleFilter1Change,
  handleFilter2Change,
  handleFilter3Change,
  filterValue1,
  filterValue2,
  filterValue3,
}) => {
  return (
    <Space>
      {/* New dropdowns for filtering */}
      <Select
        style={{ width: 160 }}
        placeholder="-Topic-"
        onChange={handleFilter1Change}
        value={filterValue1}
      >
        {/* <Option value="online">Online</Option> */}
        <Option value="option1">option1</Option>
        <Option value="option2">option2</Option>

        {/* Add more options as needed */}
      </Select>
      <Select
        style={{ width: 160 }}
        placeholder="--Depending On--"
        onChange={handleFilter2Change}
        value={filterValue2}
      >
        {/* <Option value="" >--Not available separately--</Option> */}
        <Option value="option1">option1</Option>
        <Option value="option2">option2</Option>

        {/* Add more options as needed */}
      </Select>
      <Select
        style={{ width: 160 }}
        placeholder="--Type of Answer--"
        onChange={handleFilter3Change}
        value={filterValue3}
      >
        <Option value="option1">option1</Option>
        <Option value="option2">option2</Option>
      </Select>
    </Space>
  );
};

const FiltersDropdownSponsor = ({
  handleFilter1Change,
  handleFilter2Change,
  filterValue1,
  filterValue2,
}) => {
  return (
    <Space>
      <Select
        style={{ width: 120 }}
        placeholder="--Validity--"
        onChange={handleFilter1Change}
        value={filterValue1}
      >
        <Option value="activated">Activated</Option>
        <Option value="deactivated">Deactivated</Option>
      </Select>
      <Select
        style={{ width: 120 }}
        placeholder="--Country--"
        onChange={handleFilter2Change}
        value={filterValue2}
      >
        <Option value="option">option</Option>
      </Select>
    </Space>
  );
};

const FiltersDropdownPdf = ({
  handleFilter1Change,
  handleFilter2Change,
  filterValue1,
  filterValue2,
}) => {
  return (
    <Space>
      <Select
        style={{ width: 120 }}
        placeholder="--Type--"
        onChange={handleFilter1Change}
        value={filterValue1}
      >
        <Option value="activated">Activated</Option>
        <Option value="deactivated">Deactivated</Option>
      </Select>
      <Select
        style={{ width: 120 }}
        placeholder="--School--"
        onChange={handleFilter2Change}
        value={filterValue2}
      >
        <Option value="speakuplondon">speakuplondon</Option>
      </Select>
    </Space>
  );
};

const FiltersDropdownEmailTemplate2 = ({
  handleFilter1Change,
  handleFilter2Change,
  filterValue1,
  filterValue2,
}) => {
  return (
    <Space>
      <Select
        style={{ width: 220 }}
        placeholder="-Available in the following overview-"
        onChange={handleFilter1Change}
        value={filterValue1}
      >
        <Option value="option1">option1</Option>
        <Option value="option">option</Option>
      </Select>
      <Select
        style={{ width: 220 }}
        placeholder="-Available for the following schools-"
        onChange={handleFilter2Change}
        value={filterValue2}
      >
        <Option value="speakuplondon">speakuplondon</Option>
      </Select>
    </Space>
  );
};

const FiltersDropdownSMSTemplate = ({
  handleFilter1Change,
  handleFilter2Change,
  filterValue1,
  filterValue2,
}) => {
  return (
    <Space>
      <Select
        style={{ width: 115 }}
        placeholder="-Overview-"
        onChange={handleFilter1Change}
        value={filterValue1}
      >
        <Option value="option1">option1</Option>
        <Option value="option">option</Option>
      </Select>
      <Select
        style={{ width: 110 }}
        placeholder="-Schools-"
        onChange={handleFilter2Change}
        value={filterValue2}
      >
        <Option value="speakuplondon">speakuplondon</Option>
      </Select>
      <Select
        style={{ width: 155 }}
        placeholder="-Recipient group-"
        onChange={handleFilter1Change}
        value={filterValue1}
      >
        <Option value="option1">option1</Option>
        <Option value="option">option</Option>
      </Select>
      <Select
        style={{ width: 215 }}
        placeholder="-Correspondencr language-"
        onChange={handleFilter2Change}
        value={filterValue2}
      >
        <Option value="speakuplondon">speakuplondon</Option>
      </Select>
      : :
      <Select
        style={{ width: 100 }}
        placeholder="--Type--"
        onChange={handleFilter1Change}
        value={filterValue1}
      >
        <Option value="activated">Activated</Option>
        <Option value="deactivated">Deactivated</Option>
      </Select>
    </Space>
  );
};

const FiltersDropdownEventControl = ({
  handleFilter1Change,
  handleFilter2Change,
  filterValue1,
  filterValue2,
}) => {
  return (
    <Space>
      <Select
        style={{ width: 115 }}
        placeholder="-Event-"
        onChange={handleFilter1Change}
        value={filterValue1}
      >
        <Option value="option1">option1</Option>
        <Option value="option">option</Option>
      </Select>
      <Select
        style={{ width: 110 }}
        placeholder="-User-"
        onChange={handleFilter2Change}
        value={filterValue2}
      >
        <Option value="option1">option1</Option>
        <Option value="option">option</Option>
      </Select>
      : :
      <Select
        style={{ width: 110 }}
        placeholder="-Type-"
        onChange={handleFilter1Change}
        value={filterValue1}
      >
        <Option value="activated">Activated</Option>
        <Option value="deactivated">Deactivated</Option>
      </Select>
    </Space>
  );
};

const FiltersDropdownEmailSpool = ({
  handleFilter1Change,
  handleFilter2Change,
  filterValue1,
  filterValue2,
}) => {
  return (
    <Space>
            <DatePicker.RangePicker style={{ width: 300 }} />

      <Select
        style={{ width: 100 }}
        placeholder="--Type--"
        onChange={handleFilter1Change}
        value={filterValue1}
      >
        <Option value="activated">Activated</Option>
        <Option value="deactivated">Deactivated</Option>
      </Select>
      : :
      <Select
        style={{ width: 155 }}
        placeholder="-Category-"
        onChange={handleFilter1Change}
        value={filterValue1}
      >
        <Option value="option1">option1</Option>
        <Option value="option">option</Option>
      </Select>
      
    </Space>
  );
};

const FiltersDropdownLog = ({ handleFilter1Change, filterValue1 }) => {
  return (
    <Space>
      <Select
        style={{ width: 120 }}
        placeholder="--Action--"
        onChange={handleFilter1Change}
        value={filterValue1}
      >
        <Option value="Option1">Option1</Option>
        <Option value="Option2">Option2</Option>
      </Select>

      <RangePicker />
    </Space>
  );
};

const SubmitCancelButtonGroup = ({ recordData, CancelBothModel }) => {
  return (
    <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
      <div style={{ marginRight: "8px", display: "inline-block" }}>
        <Button type="primary" htmlType="submit">
          {recordData ? "Update" : "Save"}
        </Button>
      </div>
      <Button type="primary" htmlType="reset" onClick={CancelBothModel}>
        Cancel
      </Button>
    </Form.Item>
  );
};

const FileImportBtn = ({
  onClickNew,
  onClickEdit,
  onClickDelete,
  handleFileImport,
}) => {
  return (
    <space>
      <AddEditDelete
        onClickNew={onClickNew}
        onClickEdit={onClickEdit}
        onClickDelete={onClickDelete}
      />
      <Upload {...importProps}>
        <Button icon={<AiOutlineImport />} style={{ marginLeft: "14" }}>
          File Manager
        </Button>
      </Upload>
    </space>
  );
};

const FiltersDropdownAgentPayment = ({
  handleFilter1Change,
  handleFilter2Change,
  filterValue1,
  filterValue2,
}) => {
  return (
    <Space>
      <Select
        style={{ width: 120 }}
        placeholder="--Agency--"
        onChange={handleFilter1Change}
        value={filterValue1}
      >
        {/* <Option value="online">Online</Option> */}
        <Option value="Agency">Agency</Option>
        

        {/* Add more options as needed */}
      </Select>

      <Select
        style={{ width: 120 }}
        placeholder="--Payment status--"
        onChange={handleFilter2Change}
        value={filterValue2}
      >
        <Option value="Payment status">Payment status</Option>
       
      </Select>
    </Space>
  );
};


const SaveBtn = ({ CancelBothModel }) => {
  return (
    <>
      <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
        <div style={{ marginRight: "8px", display: "inline-block" }}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </div>
        <Button type="primary" htmlType="reset" onClick={CancelBothModel}>
          Cancel
        </Button>
      </Form.Item>
    </>
  );
};

const UpdateBtn = ({ CancelBothModel }) => {
  return (
    <>
      <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
        <div style={{ marginRight: "8px", display: "inline-block" }}>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </div>
        <Button type="primary" htmlType="reset" onClick={CancelBothModel}>
          Cancel
        </Button>
      </Form.Item>
    </>
  );
};

export {
  AddEditDeleteDeactivateAll,
  SearchInputnew,
  SearchInput,
  AddEditDeleteDeactivate,
  AddEditDelete,
  CsvExcelImport,
  FiltersDropdown,
  SubmitCancelButtonGroup,
  FileImportBtn,
  SaveBtn,
  UpdateBtn,
  FiltersDropdown1,
  FiltersDropdown2,
  FiltersDropdown3,
  FiltersDropdown4,
  FiltersDropdownEventControl,
  CsvExcelImport1,
  FiltersDropdownPdf,
  FiltersDropdownEmailTemplate2,
  FiltersDropdownSMSTemplate,
  FiltersDropdown5,
  CsvExcelImport2,
  NewFilter,
  FiltersDropdownQuestion,FiltersDropdownLog,
  FiltersDropdownSponsor,FiltersDropdownEmailSpool,FiltersDropdownAgentPayment
};
