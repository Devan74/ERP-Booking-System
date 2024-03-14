import * as React from "react";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import Slot from "./Slot";
import BookingConfirmationModal from "./BookingConfirmationModal";
import CancellationConfirmationModal from "./CancellationConfirmationModal";
import { MdOutlineSportsHandball } from "react-icons/md";
import Header from "./Header";

const BookingSystem = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isBookingModalOpen, setBookingModalOpen] = useState(false);
  const [isCancellationModalOpen, setCancellationModalOpen] = useState(false);
  const [availableSlots, setAvailableSlots] = useState(getDefaultSlots());
  const [bookedSlots, setBookedSlots] = useState([]);

  function getDefaultSlots() {
    const defaultSlots = [];
    for (let i = 1; i < 24; i++) {
      const time = `${String(i).padStart(2, "0")}:00`;
      defaultSlots.push({ time, booked: false });
    }
    return defaultSlots;
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
    setAvailableSlots(getDefaultSlots());
  };

  const handleSlotSelect = (slot) => {
    // setSelectedSlot(slot);
    // if (!slot.booked) {
    //   setBookingModalOpen(true);
    // } else {
    //   setCancellationModalOpen(true);
    // }
  };

  const handleBookingConfirm = () => {
    const updatedSlots = availableSlots.map((slot) => {
      if (slot.time === selectedSlot.time) {
        return { ...slot, booked: true };
      }
      return slot;
    });
    setAvailableSlots(updatedSlots);
    setBookingModalOpen(false);
  };

  const handleBookingCancel = () => {
    setBookingModalOpen(false);
  };

  const handleCancellationConfirm = () => {
    const updatedSlots = availableSlots.map((slot) => {
      if (slot.time === selectedSlot.time) {
        return { ...slot, booked: false };
      }
      return slot;
    });
    setAvailableSlots(updatedSlots);
    setCancellationModalOpen(false);
  };

  const handleCancellationCancel = () => {
    setCancellationModalOpen(false);
  };

  const [spaces, setSpaces] = useState([
    { name: "Badminton Court 1", active: false },
    { name: "Badminton Court 2", active: true },
    { name: "Badminton Court 3", active: false },
    { name: "Badminton Court 4", active: false },
    { name: "Badminton Court 5", active: false },
  ]);
  const handleSpaceClick = (index) => {
    const updatedSpaces = spaces.map((space, i) => ({
      ...space,
      active: i === index ? !space.active : false,
    }));
    setSpaces(updatedSpaces);
  };

  return (
    <div className="">
      <Header
        centerName="Chennai Badminton Acaademy"
        openTime="9:00 AM"
        closeTime="9:00 PM"
      />
      <div className="grid grid-cols-5 gap-2 p-3">
        <div className="h-[30rem] col-span-1 bg-gray-100 rounded-lg">
          <div className="flex flex-col gap-2 p-3">
            {spaces.map((space, index) => (
              <div
                key={index}
                className={`flex items-center p-2 rounded-md cursor-pointer ${
                  space.active
                    ? "bg-blue-200 text-blue-800"
                    : "bg-gray-200 text-gray-700"
                } hover:bg-blue-200 hover:text-blue-800`}
                onClick={() => handleSpaceClick(index)}
              >
                <MdOutlineSportsHandball size={24} className="mr-2" />
                <span className="text-lg font-bold">{space.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-3 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-bold mb-2 text-center p-2">Booking Calendar</h2>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              date={selectedDate}
              onChange={handleDateChange}
              renderDay={(day, _value, DayComponentProps) => {
                return (
                  <DayComponentProps.button {...DayComponentProps}>
                    {day.day}
                  </DayComponentProps.button>
                );
              }}
            />
          </LocalizationProvider>
        </div>
        <div className="h-[30rem] bg-gray-100 rounded-lg">
          <h2 className="font-bold mb-2 text-center p-2">
            Available Time Slots for{" "}
            {selectedDate
              ? selectedDate.format("dddd, MMMM D, YYYY")
              : "Invalid Date"}
          </h2>
          {/* {console.log("Selected Date in JSX:", selectedDate)} */}
          <div className="h-[25rem] overflow-y-scroll flex justify-center">
            <div className="grid grid-col gap-3">
              {availableSlots.map((slot, index) => (
                <Slot
                  key={index}
                  slot={slot}
                  onBooking={() => handleSlotSelect(slot)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Booking and Cancellation Modals */}
      <BookingConfirmationModal
        isOpen={isBookingModalOpen}
        onConfirm={handleBookingConfirm}
        onCancel={handleBookingCancel}
      />
      <CancellationConfirmationModal
        isOpen={isCancellationModalOpen}
        onConfirm={handleCancellationConfirm}
        onCancel={handleCancellationCancel}
      />
    </div>
  );
};

export default BookingSystem;
