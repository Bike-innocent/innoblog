import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';  // Import Link from React Router
import axiosInstance from '../../axiosInstance';

function Reports() {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        axiosInstance.get('/reports')
            .then(response => setReports(response.data))
            .catch(error => console.error('Error fetching reports:', error));
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Reports</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reports.map(report => (
                    <div key={report.id} className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-2">Report: {report.id}</h2>

                        {/* Link to the reporter's profile */}
                        <p className="text-gray-600">
                            Reporter: 
                            <Link to={`/${report.reporter.username}`} className="text-blue-500 hover:underline">
                                {report.reporter.name}
                            </Link>
                        </p>

                        {/* Link to the reported post */}
                        <p className="text-gray-600">
                            Post: 
                            <Link to={`/posts/${report.post.slug}`} className="text-blue-500 hover:underline">
                                {report.post.title}
                            </Link>
                        </p>

                        {/* Link to the reported user's profile */}
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
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Reports;
