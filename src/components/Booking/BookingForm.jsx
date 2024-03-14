import React, { useState,useEffect } from "react";
import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material"

const BookingForm = () => {
  const [isSuccessOpen, setSuccessOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    gender: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name";
    } else if (!/^[a-zA-Z ]{3,}$/.test(formData.name)) {
      newErrors.name =
        "Name must contain only letters and be at least 3 characters long";
    }

    // Validate phone
    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your phone number";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must contain exactly 10 digits";
    } else if (/(\d)\1{9}/.test(formData.phone)) {
      newErrors.phone = "Phone number cannot contain all the same digits";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.gender) {
      newErrors.gender = "Please select your gender";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setSuccessOpen(true);
      console.log("Form submitted:", formData);
      setFormData({
        name: "",
        phone: "",
        email: "",
        gender: "",
      });
      setErrors({
        name: "",
        phone: "",
        email: "",
        gender: "",
      });
    }
  };

  function handleSuccessClose() {
    setSuccessOpen(false)
  }

  return (
    <div className="mx-auto h-screen">
      <Snackbar
        open={isSuccessOpen}
        autoHideDuration={3000}
        onClose={handleSuccessClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <MuiAlert elevation={6} variant="filled" onClose={handleSuccessClose} severity="success">
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
          <div className="mb-4">
            <label htmlFor="name" className="block">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`border border-gray-300 px-3 py-2 w-full ${
                errors.name && "border border-red-500 mb-1"
              } rounded-md focus:outline-none focus:border-blue-500`}
            />
            <span className="text-red-500">{errors.name}</span>
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block">
              Phone:
            </label>
            <input
              type="number"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`border border-gray-300 px-3 py-2 w-full ${
                errors.phone && "border border-red-500 mb-1"
              } rounded-md focus:outline-none focus:border-blue-500`}
            />
            <span className="text-red-500">{errors.phone}</span>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`border border-gray-300 px-3 py-2 w-full ${
                errors.email && "border border-red-500 mb-1"
              } rounded-md focus:outline-none focus:border-blue-500`}
            />
            <span className="text-red-500">{errors.email}</span>
          </div>
          <div className="mb-4">
            <label htmlFor="gender" className="block">
              Gender:
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`border border-gray-300 px-3 py-2 w-full ${
                errors.gender && "border border-red-500 mb-1"
              } rounded-md focus:outline-none focus:border-blue-500`}
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <span className="text-red-500">{errors.gender}</span>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
            >
              Continue
            </button>
            <button
              type="button"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
