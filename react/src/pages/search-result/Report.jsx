import React, { useState, Fragment } from 'react';
import axiosInstance from '../../axiosInstance';
import { Dialog, Transition } from '@headlessui/react';
import { useQuery } from '@tanstack/react-query';

// Define the fetchReportReasons function
const fetchReportReasons = async () => {
    const response = await axiosInstance.get('/report-reasons-dropdown'); // Adjust the endpoint to match your API
    return response.data;
};

const Report = ({ postId, isOpen, onClose }) => {
    const [selectedReason, setSelectedReason] = useState(null);
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Use React Query to fetch report reasons
    const { data: reasons, isLoading: reasonsLoading, isError } = useQuery({
        queryKey: ['reportReasoegrgns'],
        queryFn: fetchReportReasons,
    });

    const handleSubmit = () => {
        setIsLoading(true);
        axiosInstance.post('/report-post', {
            post_id: postId,
            reason_id: selectedReason,
            additional_info: additionalInfo,
        })
        .then(response => {
            setIsLoading(false);
            console.log('Report submitted successfully:', response.data);
            onClose();
        })
        .catch(error => {
            setIsLoading(false);
            console.error('Error submitting report:', error);
            if (error.response) {
                console.error('Server responded with status code:', error.response.status);
                console.error('Response data:', error.response.data);
            }
        });
    };

    if (reasonsLoading) {
        return <div></div>;
    }

    if (isError) {
        return <div></div>;
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Report Post
                                </Dialog.Title>
                                <div className="mt-4">
                                    {reasons.map(reason => (
                                        <div key={reason.id} className="flex items-center mb-4">
                                            <input
                                                id={`reason-${reason.id}`}
                                                type="radio"
                                                name="reason"
                                                value={reason.id}
                                                checked={selectedReason === reason.id}
                                                onChange={() => setSelectedReason(reason.id)}
                                                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                            />
                                            <label htmlFor={`reason-${reason.id}`} className="ml-2 block text-sm text-gray-700">
                                                {reason.reason}
                                            </label>
                                        </div>
                                    ))}
                                    <textarea
                                        className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                                        placeholder="Additional information (optional)"
                                        value={additionalInfo}
                                        onChange={(e) => setAdditionalInfo(e.target.value)}
                                    />
                                </div>
                                <div className="mt-6 flex justify-end space-x-2">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
                                        onClick={onClose}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
                                        onClick={handleSubmit}
                                        disabled={!selectedReason || isLoading}
                                    >
                                        {isLoading ? 'Reporting...' : 'Report'}
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default Report;
