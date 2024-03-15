import React, { useState, useEffect } from "react";
import MuiAlert from "@mui/material/Alert";
import { Snackbar, TextField, Button, Select, MenuItem } from "@mui/material";

const BookingForm = () => {
  const [isSuccessOpen, setSuccessOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    gender: "",
    timeFrom: "",
    timeTo: "",
    paymentMethod: "",
    numberOfPersons: 1,
  });
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpExpired, setOtpExpired] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    calculateTotalAmount();
  }, [formData.timeFrom, formData.timeTo, formData.numberOfPersons]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePersonChange = (e) => {
    const { value } = e.target;
    const numberOfPersons = parseInt(value);
    setFormData({
      ...formData,
      numberOfPersons: numberOfPersons >= 1 ? numberOfPersons : 1,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otpSent && otp === "1234") {
      setSuccessOpen(true);
      console.log("Form submitted:", formData);
      console.log("Total Amount:", totalAmount);
      setFormData({
        name: "",
        phone: "",
        email: "",
        gender: "",
        timeFrom: "",
        timeTo: "",
        paymentMethod: "",
        numberOfPersons: 1,
      });
      setOtp("");
      setOtpSent(false);
      setOtpExpired(false);
    } else {
      console.log("OTP not validated");
    }
  };

  const handleSendOtp = () => {
    // Simulating OTP generation and sending
    console.log("OTP Sent");
    setOtpSent(true);
    setOtpExpired(false);
    setTimeout(() => {
      setOtpExpired(true);
    }, 60000); // OTP expires after 1 minute
  };

  const calculateTotalAmount = () => {
    const { timeFrom, timeTo, numberOfPersons } = formData;
    if (timeFrom && timeTo && numberOfPersons) {
      const startHour = parseInt(timeFrom.split(":")[0]);
      const endHour = parseInt(timeTo.split(":")[0]);
      const hours = endHour - startHour;
      const amount = hours * numberOfPersons * 100;
      setTotalAmount(amount);
    }
  };

  return (
    <div className="mx-auto h-screen">
      <Snackbar
        open={isSuccessOpen}
        autoHideDuration={3000}
        onClose={() => setSuccessOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setSuccessOpen(false)}
          severity="success"
        >
          Slot Booked Successfully!
        </MuiAlert>
      </Snackbar>
      <h2 className="text-center text-xl font-bold my-[5%]">
        Fill the below form
      </h2>
      <div className="flex justify-center items-center ">
        <form
          onSubmit={handleSubmit}
          className=" border p-5 rounded-md bg-gray-100"
        >
          <div className="">
            <div>
              <h3 className="text-lg font-bold mb-2">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label htmlFor="name" className="block">
                    Name:
                  </label>
                  <TextField
                    type="text"
                    label="Name"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="phone" className="block">
                    Phone:
                  </label>
                  <TextField
                    type="number"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />
                  <span className="flex justify-end ">
                    <div className="">
                      <a
                        variant="text"
                        className="text-blue-500"
                        onClick={handleSendOtp}
                      >
                        Send OTP
                      </a>
                    </div>
                  </span>
                </div>
                <div className="mb-4">
                  <label htmlFor="otp" className="block">
                    OTP:
                  </label>
                  <TextField
                    type="text"
                    id="otp"
                    name="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    variant="outlined"
                    fullWidth
                  />
                  <span className="flex justify-end">
                    {otpExpired && (
                      <div className="">
                        <a
                          variant="text"
                          className="text-blue-500"
                          onClick={handleSendOtp}
                        >
                          Resend OTP
                        </a>
                      </div>
                    )}
                  </span>
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block">
                    Email:
                  </label>
                  <TextField
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="gender" className="block">
                    Gender:
                  </label>
                  <Select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  >
                    <MenuItem value="">Select</MenuItem>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Booking Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label htmlFor="timeFrom" className="block">
                    Time From:
                  </label>
                  <TextField
                    type="time"
                    id="timeFrom"
                    name="timeFrom"
                    value={formData.timeFrom}
                    onChange={handleTimeChange}
                    variant="outlined"
                    fullWidth
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="timeTo" className="block">
                    Time To:
                  </label>
                  <TextField
                    type="time"
                    id="timeTo"
                    name="timeTo"
                    value={formData.timeTo}
                    onChange={handleTimeChange}
                    variant="outlined"
                    fullWidth
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="numberOfPersons" className="block">
                    Number of Persons:
                  </label>
                  <TextField
                    type="number"
                    id="numberOfPersons"
                    name="numberOfPersons"
                    min="1"
                    value={formData.numberOfPersons}
                    onChange={handlePersonChange}
                    variant="outlined"
                    fullWidth
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="paymentMethod" className="block">
                    Payment Method:
                  </label>
                  <Select
                    id="paymentMethod"
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  >
                    <MenuItem value="">Select Payment Method</MenuItem>
                    <MenuItem value="upi">UPI</MenuItem>
                    <MenuItem value="cash">Cash</MenuItem>
                    <MenuItem value="cards">Cridit / Debit card</MenuItem>
                  </Select>
                </div>
                <div className="mb-4">
                  <label htmlFor="totalAmount" className="block">
                    Total Amount:
                  </label>
                  <TextField
                    type="text"
                    id="totalAmount"
                    name="totalAmount"
                    value={totalAmount}
                    readOnly
                    variant="outlined"
                    fullWidth
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="mr-2"
            >
              Continue
            </Button>
            <Button
              type="button"
              variant="contained"
              color="secondary"
              style={{ marginLeft: "8px" }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
