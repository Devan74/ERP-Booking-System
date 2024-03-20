import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import BookingForm from "./BookingForm";
import { IoMdCloseCircleOutline } from "react-icons/io";

const Slot = ({ slot, onBooking }) => {
  return (
    <div
      className={`p-1 border rounded-md cursor-pointer w-28 text-center ${
        slot.booked ? "bg-gray-200 text-gray-700" : "bg-blue-200 text-gray-700"
      }`}
      // onClick={onBooking}
    >
      {/* <h2 className="text-xl font-bold">{slot.type}</h2> */}
      <p className="text-gray-700"></p>
      {/* <span
        className={`mt-3 px-4 py-2 rounded-md  ${
          slot.booked ? "bg-gray-200 text-gray-700" : "bg-blue-200 text-gray-700"
        }`}
      >
        {slot.booked ? "Booked" : "Available"}
      </span> */}
      <Popup
        trigger={<button>{slot.time}</button>}
        position="center"
        modal={true}
        closeOnDocumentClick={false}
        closeOnEscape={false}
      >
        {(close) => (
          <div className="">
            <div className="relative top-[1rem] right-[-92%] rounded-full" onClick={close}>
            <IoMdCloseCircleOutline className="text-2xl cursor-pointer hover:text-red-500 my-auto " />
            </div>
            <BookingForm />
          </div>
        )}
      </Popup>
    </div>
  );
};

export default Slot;
