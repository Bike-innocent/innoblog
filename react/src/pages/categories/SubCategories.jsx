import React, { useState, useEffect, Fragment } from 'react';
import axiosInstance from '../../axiosInstance';
import { Dialog, Transition } from '@headlessui/react';

const SubCategories = () => {
    const [subCategories, setSubCategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [editingSubCategory, setEditingSubCategory] = useState(null);
    const [errors, setErrors] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [subCategoryToDelete, setSubCategoryToDelete] = useState(null);

    useEffect(() => {
        fetchSubCategories();
        fetchCategories();
    }, []);

    const fetchSubCategories = async () => {
        try {
            const response = await axiosInstance.get('/subcategories');
            setSubCategories(response.data);
        } catch (error) {
            console.error('Error fetching subcategories:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axiosInstance.get('/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchCategory = async (categoryId) => {
        try {
            const response = await axiosInstance.get(`/categories/${categoryId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching category:', error);
            return null;
        }
    };

    const handleCreateSubCategory = async () => {
        try {
            const response = await axiosInstance.post('/subcategories', {
                name,
                slug,
                category_id: categoryId
            });

            const category = await fetchCategory(categoryId);
            const newSubCategory = { ...response.data, category };

            setSubCategories([...subCategories, newSubCategory]);
            setName('');
            setSlug('');
            setCategoryId('');
            setErrors([]);
            closeModal();
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrors(error.response.data.errors);
            } else {
                console.error('Error creating subcategory:', error);
            }
        }
    };

    const handleUpdateSubCategory = async () => {
        try {
            const response = await axiosInstance.put(`/subcategories/${editingSubCategory.id}`, {
                name,
                slug,
                category_id: categoryId
            });

            const category = await fetchCategory(categoryId);
            const updatedSubCategory = { ...response.data, category };

            setSubCategories(subCategories.map(subCat => (subCat.id === editingSubCategory.id ? updatedSubCategory : subCat)));
            setEditingSubCategory(null);
            setName('');
            setSlug('');
            setCategoryId('');
            setErrors([]);
            closeModal();
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrors(error.response.data.errors);
            } else {
                console.error('Error updating subcategory:', error);
            }
        }
    };

    const handleDeleteSubCategory = async () => {
        try {
            await axiosInstance.delete(`/subcategories/${subCategoryToDelete.id}`);
            setSubCategories(subCategories.filter(subCat => subCat.id !== subCategoryToDelete.id));
            setSubCategoryToDelete(null);
            setIsDeleteModalOpen(false);
        } catch (error) {
            console.error('Error deleting subcategory:', error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (editingSubCategory) {
            handleUpdateSubCategory();
        } else {
            handleCreateSubCategory();
        }
    };

    const handleEdit = (subCategory) => {
        setEditingSubCategory(subCategory);
        setName(subCategory.name);
        setSlug(subCategory.slug);
        setCategoryId(subCategory.category_id);
        openModal();
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setEditingSubCategory(null);
        setName('');
        setSlug('');
        setCategoryId('');
        setErrors([]);
    };

    const openDeleteModal = (subCategory) => {
        setSubCategoryToDelete(subCategory);
        setIsDeleteModalOpen(true);
    };
    const closeDeleteModal = () => {
        setSubCategoryToDelete(null);
        setIsDeleteModalOpen(false);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Manage SubCategories</h1>

            <button
                onClick={openModal}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
                Add SubCategory
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
                        <th className="py-2 px-4 border-b">Category</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {subCategories.map((subCategory) => (
                        <tr key={subCategory?.id}>
                            <td className="py-2 px-4 border-b">{subCategory?.id}</td>
                            <td className="py-2 px-4 border-b">{subCategory?.name}</td>
                            <td className="py-2 px-4 border-b">{subCategory?.slug}</td>
                            <td className="py-2 px-4 border-b">{subCategory?.category?.name}</td>
                            <td className="py-2 px-4 border-b">
                                <button
                                    onClick={() => handleEdit(subCategory)}
                                    className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => openDeleteModal(subCategory)}
                                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Create/Edit SubCategory Modal */}
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
                                        {editingSubCategory ? 'Edit SubCategory' : 'Add SubCategory'}
                                    </Dialog.Title>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                className="w-full p-2 border border-gray-300 rounded mt-2"
                                                placeholder="Name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                className="w-full p-2 border border-gray-300 rounded mt-2"
                                                placeholder="Slug"
                                                value={slug}
                                                onChange={(e) => setSlug(e.target.value)}
                                            />
                                            <select
                                                className="w-full p-2 border border-gray-300 rounded mt-2"
                                                value={categoryId}
                                                onChange={(e) => setCategoryId(e.target.value)}
                                            >
                                                <option value="">Select Category</option>
                                                {categories.map((category) => (
                                                    <option key={category.id} value={category.id}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="mt-4">
                                            <button
                                                type="submit"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
                                            >
                                                {editingSubCategory ? 'Update' : 'Create'}
                                            </button>
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-gray-300 px-4 py-2 text-sm font-medium text-black hover:bg-gray-400 ml-2"
                                                onClick={closeModal}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
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
                                        Delete SubCategory
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Are you sure you want to delete this subcategory? This action cannot be undone.
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
                                            onClick={handleDeleteSubCategory}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-gray-300 px-4 py-2 text-sm font-medium text-black hover:bg-gray-400 ml-2"
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

export default SubCategories;
