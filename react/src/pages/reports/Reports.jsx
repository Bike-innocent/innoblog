
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import ManageReport from './ManageReports';

function Reports() {
    const [reports, setReports] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            const response = await axiosInstance.get('/reports');
            setReports(response.data);
        } catch (error) {
            console.error('Error fetching reports:', error);
        }
    };

    const handleDeleteReport = async () => {
        if (selectedReport) {
            try {
                await axiosInstance.delete(`/reports/${selectedReport.id}`);
                fetchReports(); // Refresh the reports list after deletion
                setIsDialogOpen(false); // Close the dialog after deletion
            } catch (error) {
                console.error('Error deleting report:', error);
            }
        }
    };

    const openDeleteDialog = (report) => {
        setSelectedReport(report); // Set the selected report
        setIsDialogOpen(true); // Open the confirmation dialog
    };

    const closeDeleteDialog = () => {
        setIsDialogOpen(false); // Close the dialog without deleting
        setSelectedReport(null); // Clear the selected report
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Manage Reports Reasons</h1>
            <ManageReport />

            <h1 className="text-2xl font-bold mb-4">Reports</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reports.map(report => (
                    <div key={report.id} className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-2">Report: {report.id}</h2>

                        <p className="text-gray-600">
                            Reporter:
                            <Link to={`/${report.reporter.username}`} className="text-blue-500 hover:underline">
                                {report.reporter.name}
                            </Link>
                        </p>

                        {/* Display post information if the report is related to a post */}
                        {report.post && (
                            <p className="text-gray-600">
                                Post:
                                <Link to={`/posts/${report.post.slug}`} className="text-blue-500 hover:underline">
                                    {report.post.title}
                                </Link>
                            </p>
                        )}

                        {/* Display comment information if the report is related to a comment */}
                        {report.comment && (
                            <>
                                <p className="text-gray-600">
                                    Comment: <div dangerouslySetInnerHTML={{ __html: report.comment.content }} />
                                </p>
                                <p className="text-gray-600">
                                    Commented by:
                                    <Link to={`/${report.comment?.user?.username}`} className="text-blue-500 hover:underline">
                                        {report.comment?.user?.name}
                                    </Link>
                                </p>


                            </>
                        )}

                        <p className="text-gray-600">
                            Reported User:
                            <Link to={`/${report.reported_user.username}`} className="text-blue-500 hover:underline">
                                {report.reported_user.name}
                            </Link>
                        </p>

                        <p className="text-gray-600">Reason: {report.reason.reason}</p>

                        {report.additional_info && (
                            <p className="text-gray-600">Additional Info: {report.additional_info}</p>
                        )}

                        {/* Delete Button */}
                        <button
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                            onClick={() => openDeleteDialog(report)}
                        >
                            Delete Report
                        </button>
                    </div>
                ))}
            </div>

            {/* Confirmation Dialog */}
            {isDialogOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
                        <p className="text-gray-600 mb-6">Are you sure you want to delete this report?</p>
                        <div className="flex justify-end">
                            <button
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
                                onClick={closeDeleteDialog}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded"
                                onClick={handleDeleteReport}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Reports;

