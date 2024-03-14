import React from "react";

const Header = ({ centerName, openTime, closeTime }) => {

  const isOpen = 'open';

  return (
    <div className="flex justify-between items-center border-b p-2">
      <div className="flex items-center">
        <div>
          <div className="flex items-center">
            <img
              src="https://e7.pngegg.com/pngimages/85/377/png-clipart-sree-dhrona-badminton-academy-sport-urbanpro-takerz-badminton-academy-play-badminton-sree-badminton.png"
              alt="Center Logo"
              className="h-16 w-16 mr-2"
            />
            <div>
              <h1 className="text-xl font-bold">{centerName}</h1>
            </div>
          </div>
         
        </div>
      </div>
      <div className="flex items-center">
        <div>
          <h2 className="text-lg font-semibold">Badminton Center Address</h2>
          <p className="text-sm text-gray-500">11, Sri Ambal Nagar, Keelkattalai,</p>
          <p className="text-sm text-gray-500">Tamil Nadu 600117</p>
          <div className="flex items-center">
            <p
             className={`text-sm mr-2 ${
                isOpen === "open" ? "text-green-500" : "opacity-50"
              }`}
            >
              Opening Time: {openTime}
            </p>
            <p className={`text-sm ${isOpen === "open" ? "opacity-50" : " text-red-500"}`}>
              Closing Time: {closeTime}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
