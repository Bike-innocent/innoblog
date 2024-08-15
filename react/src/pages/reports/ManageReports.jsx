import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import axiosInstance from '../../axiosInstance';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';

const ManageReport = () => {
  const [reportReasons, setReportReasons] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentReason, setCurrentReason] = useState(null);
  const [newReason, setNewReason] = useState('');
  const [deleteReasonId, setDeleteReasonId] = useState(null);

  useEffect(() => {
    fetchReportReasons();
  }, []);

  const fetchReportReasons = async () => {
    try {
      const response = await axiosInstance.get('/report-reasons');
      setReportReasons(response.data);
    } catch (error) {
      console.error('Error fetching report reasons:', error);
    }
  };

  const handleAddNewReason = async () => {
    try {
      await axiosInstance.post('/report-reasons', { reason: newReason });
      fetchReportReasons();
      setNewReason('');
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error adding new reason:', error);
    }
  };

  const handleEditReason = async (id) => {
    try {
      await axiosInstance.put(`/report-reasons/${id}`, { reason: currentReason.reason });
      fetchReportReasons();
      setIsDialogOpen(false);
      setCurrentReason(null);
    } catch (error) {
      console.error('Error editing reason:', error);
    }
  };

  const handleDeleteReason = async () => {
    try {
      await axiosInstance.delete(`/report-reasons/${deleteReasonId}`);
      fetchReportReasons();
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error('Error deleting reason:', error);
    }
  };

  const openDeleteDialog = (id) => {
    setDeleteReasonId(id);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Manage Report Reasons</h2>
      <div className="mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
          onClick={() => {
            setCurrentReason(null);
            setNewReason('');
            setIsDialogOpen(true);
          }}
        >
          <FaPlus className="mr-2" /> Add New Reason
        </button>
      </div>
      <ul>
        {reportReasons.map((reason) => (
          <li key={reason.id} className="flex justify-between items-center mb-2 p-2 border-b">
            <span>{reason.reason}</span>
            <div>
              <button
                className="text-blue-500 hover:text-blue-700 mr-4"
                onClick={() => {
                  setCurrentReason({ id: reason.id, reason: reason.reason });
                  setIsDialogOpen(true);
                }}
              >
                <FaEdit />
              </button>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => openDeleteDialog(reason.id)}
              >
                <FaTrashAlt />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Dialog for Adding/Editing Report Reasons */}
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <Dialog.Title className="text-lg font-semibold">
              {currentReason ? 'Edit Report Reason' : 'Add New Report Reason'}
            </Dialog.Title>
            <div className="mt-4">
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={currentReason ? currentReason.reason : newReason}
                onChange={(e) =>
                  currentReason
                    ? setCurrentReason({ ...currentReason, reason: e.target.value })
                    : setNewReason(e.target.value)
                }
                placeholder="Enter reason"
              />
            </div>
            <div className="mt-4 flex justify-end">
              <button
                className="mr-2 bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={currentReason ? () => handleEditReason(currentReason.id) : handleAddNewReason}
              >
                {currentReason ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)}>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <Dialog.Title className="text-lg font-semibold">
              Confirm Delete
            </Dialog.Title>
            <div className="mt-4">
              <p>Are you sure you want to delete this report reason?</p>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                className="mr-2 bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleDeleteReason}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ManageReport;
