import { useState } from "react";
import OTPInput from "react-otp-input";

const OtpVarification = (formData) => {
  const { getOpt, setVerifyOtp, setSubmitOtp } = formData;
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  // Function to verify the OTP entered by user
  const handleVerifyOtp = () => {
    if (typeof otp === "string") {
      if (getOpt === otp) {
        setVerifyOtp(true);
        setOtpError("")
      } else {
        setOtpError("Invalid OTP! Please enter a valid OTP.");
        setVerifyOtp(false);
      }
    }
  };

  // Function to handle Enter key press
  const handleKeyPress = (event) => {
    if (event.key) {
      handleVerifyOtp();
    }
  };

  return (
    <div className="otp-tab">
      <OTPInput
        value={otp}
        onChange={(e) => {
          setOtp(e);
          setSubmitOtp(e);
          // setOtpError("");
        }}
        numInputs={5}
        renderInput={(props, index) => (
          <input
            {...props}
            autoFocus={index === 0}
            onKeyUp={handleKeyPress}
          />
        )}
      />
      {otpError && <p className="text-red-500 mt-2" style={{color:'#ffff'}}>{otpError}</p>}
    </div>
  );
};

export default OtpVarification;
