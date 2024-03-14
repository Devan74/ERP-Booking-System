import React from 'react';

const CancellationConfirmationModal = ({ isOpen, onConfirm, onCancel }) => {
  return (
    isOpen && (
      <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded shadow-lg">
          <p>Are you sure you want to cancel this booking?</p>
          <div className="mt-4 flex justify-between">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={onConfirm}>
              Confirm
            </button>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default CancellationConfirmationModal;
