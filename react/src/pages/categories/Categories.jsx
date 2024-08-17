import React, { useState, useEffect, Fragment } from 'react';
import axiosInstance from '../../axiosInstance';
import { Dialog, Transition } from '@headlessui/react';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [editingCategory, setEditingCategory] = useState(null);
    const [errors, setErrors] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);

    // Fetch categories on component mount
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axiosInstance.get('/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleCreateCategory = async () => {
        try {
            const response = await axiosInstance.post('/categories', {
                name,
                slug
            });
            setCategories([...categories, response.data]);
            setName('');
            setSlug('');
            setErrors([]);
            closeModal();
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrors(error.response.data.errors);
            } else {
                console.error('Error creating category:', error);
            }
        }
    };

    const handleUpdateCategory = async () => {
        try {
            const response = await axiosInstance.put(`/categories/${editingCategory.id}`, {
                name,
                slug
            });
            setCategories(categories.map(cat => (cat.id === editingCategory.id ? response.data : cat)));
            setEditingCategory(null);
            setName('');
            setSlug('');
            setErrors([]);
            closeModal();
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrors(error.response.data.errors);
            } else {
                console.error('Error updating category:', error);
            }
        }
    };

    const handleDeleteCategory = async () => {
        try {
            await axiosInstance.delete(`/categories/${categoryToDelete.id}`);
            setCategories(categories.filter(cat => cat.id !== categoryToDelete.id));
            setCategoryToDelete(null);
            setIsDeleteModalOpen(false);
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (editingCategory) {
            handleUpdateCategory();
        } else {
            handleCreateCategory();
        }
    };

    const handleEdit = (category) => {
        setEditingCategory(category);
        setName(category.name);
        setSlug(category.slug);
        openModal();
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setEditingCategory(null);
        setName('');
        setSlug('');
        setErrors([]);
    };

    const openDeleteModal = (category) => {
        setCategoryToDelete(category);
        setIsDeleteModalOpen(true);
    };
    const closeDeleteModal = () => {
        setCategoryToDelete(null);
        setIsDeleteModalOpen(false);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Manage Categories</h1>

            <button
                onClick={openModal}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
                Add Category
            </button>

            {errors.length > 0 && (
                <ul className="mb-4 text-red-500">
                    {Object.keys(errors).map((key) => (
                        <li key={key}>{errors[key][0]}</li>
                    ))}
                </ul>
            )}

            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">ID</th>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Slug</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.id}>
                            <td className="py-2 px-4 border-b">{category.id}</td>
                            <td className="py-2 px-4 border-b">{category.name}</td>
                            <td className="py-2 px-4 border-b">{category.slug}</td>
                            <td className="py-2 px-4 border-b">
                                <button
                                    onClick={() => handleEdit(category)}
                                    className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => openDeleteModal(category)}
                                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Create/Edit Category Modal */}
            <Transition appear show={isModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                                        {editingCategory ? 'Edit Category' : 'Add Category'}
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                                                <input
                                                    type="text"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">Slug:</label>
                                                <input
                                                    type="text"
                                                    value={slug}
                                                    onChange={(e) => setSlug(e.target.value)}
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                />
                                            </div>
                                            <div className="mt-4">
                                                <button
                                                    type="submit"
                                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                                >
                                                    {editingCategory ? 'Update Category' : 'Create Category'}
                                                </button>
                                                <button
                                                    type="button"
                                                    className="ml-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                                                    onClick={closeModal}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            {/* Delete Confirmation Modal */}
            <Transition appear show={isDeleteModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeDeleteModal}>
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
                                        Confirm Delete
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Are you sure you want to delete this category? This action cannot be undone.
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                            onClick={handleDeleteCategory}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            type="button"
                                            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                                            onClick={closeDeleteModal}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default Categories;
