import { useState } from "react";
import "./App.css";
import OtpVarification from "./component/OtpVarification";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  number: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
});

function App() {
  // const [formData, setFormData] = useState({
  //   name: "",
  //   email: "",
  //   number: "",
  // });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  const [getOtp, setGetOtp] = useState("12345");
  const [submitOpt, setSubmitOtp] = useState("");
  const [verifyOtp, setVerifyOtp] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      number: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("Form data submitted", values);
      let sendData = {
        number: values.number,
        otp: submitOpt,
      };
      console.log("sendData", sendData);
      // Handle form submission
      let res = await axios.post(
        "http://192.168.80.211:3000/api/contact/verifyv_otp",
        sendData
      );
      console.log("res: ", res);
      if (res.status === 200) {
        alert("Event Registration Successfully!");

        // Reset the form and OTP-related states
        resetForm(); // Reset form fields
        setGetOtp(""); // Clear OTP
        setVerifyOtp(false); // Reset OTP verification status
        setSubmitOtp(""); // Clear the submitted OTP
      }
    },
  });

  const fetchOtp = async (values) => {
    // console.log('values: ', values);
    const data = {
      name: values.name,
      email: values.email,
      number: values.number,
    };
    // console.log('data', data)
    let res;
    if (data.number.length === 10) {
      res = await axios.post("http://192.168.80.211:3000/api/contact", data);
      if (res.data) {
        setGetOtp(res.data.otp.toString());
        formik.initialValues = {};
      }
    }
    // console.log("res: ", res);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formik.handleSubmit(); // Use Formik's handleSubmit
  };

  return (
    <div className="container">
      <h2
        style={{ textAlign: "center", color: "#D4AD36" }}
        className="event-heading"
      >
        For Pune Event Registration{" "}
      </h2>
      <form className="form-cont" onSubmit={handleSubmit}>
        <label className="form-label">
          Name<span className="mendatory-field">*</span>
        </label>
        {formik.errors.name && formik.touched.name ? (
          <div className="mendatory-field">{formik.errors.name}</div>
        ) : null}
        <input
          className="form-input"
          type="text"
          name="name"
          placeholder="Enter your name..."
          // onChange={handleChange}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />

        <label className="form-label">
          Email<span className="mendatory-field">*</span>
        </label>
        {formik.errors.email && formik.touched.email ? (
          <div className="mendatory-field">{formik.errors.email}</div>
        ) : null}
        <input
          className="form-input"
          type="text"
          name="email"
          placeholder="Enter your email..."
          // onChange={handleChange}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />

        <label className="form-label">
          Mobile Number<span className="mendatory-field">*</span>
        </label>
        {formik.errors.number && formik.touched.number ? (
          <div className="mendatory-field">{formik.errors.number}</div>
        ) : null}
        <div className="mobile-cont">
          <input
            className="form-input"
            type="text"
            name="number"
            placeholder="Enter your mobile no..."
            // onChange={handleChange}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.number}
          />

          <button
            className="verify-btn"
            type="button"
            onClick={() => fetchOtp(formik.values)}
          >
            Get Otp
          </button>
        </div>

        {getOtp && (
          <OtpVarification
            formData={formik.values}
            getOpt={getOtp}
            setVerifyOtp={setVerifyOtp}
            setSubmitOtp={setSubmitOtp}
          />
        )}
        <button
          className={`submit-btn ${!verifyOtp ? "disabled" : ""}`}
          type={`${verifyOtp ? "submit" : "button"}`}
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default App;
