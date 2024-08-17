import React, { useState, useEffect, Fragment } from 'react';
import axiosInstance from '../../axiosInstance';
import { Dialog, Transition } from '@headlessui/react';

const Tags = () => {
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [subCategoryId, setSubCategoryId] = useState('');
    const [editingTag, setEditingTag] = useState(null);
    const [errors, setErrors] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [tagToDelete, setTagToDelete] = useState(null);

    useEffect(() => {
        fetchTags();
        fetchCategories();
        fetchSubCategories();
    }, []);

    const fetchTags = async () => {
        try {
            const response = await axiosInstance.get('/tags');
            setTags(response.data);
        } catch (error) {
            console.error('Error fetching tags:', error);
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

    const fetchSubCategories = async () => {
        try {
            const response = await axiosInstance.get('/subcategories');
            setSubCategories(response.data);
        } catch (error) {
            console.error('Error fetching subcategories:', error);
        }
    };

    const handleCreateTag = async () => {
        try {
            const response = await axiosInstance.post('/tags', {
                name,
                slug,
                sub_category_id: subCategoryId  // Only include sub_category_id
            });

            const newTag = { ...response.data };
            setTags([...tags, newTag]);
            setName('');
            setSlug('');
            setSubCategoryId('');
            setErrors([]);
            closeModal();
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrors(error.response.data.errors);
            } else {
                console.error('Error creating tag:', error);
            }
        }
    };

    const handleUpdateTag = async () => {
        try {
            const response = await axiosInstance.put(`/tags/${editingTag.id}`, {
                name,
                slug,
                sub_category_id: subCategoryId  // Only include sub_category_id
            });

            const updatedTag = { ...response.data };
            setTags(tags.map(tag => (tag.id === editingTag.id ? updatedTag : tag)));
            setEditingTag(null);
            setName('');
            setSlug('');
            setSubCategoryId('');
            setErrors([]);
            closeModal();
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrors(error.response.data.errors);
            } else {
                console.error('Error updating tag:', error);
            }
        }
    };


    const handleDeleteTag = async () => {
        try {
            await axiosInstance.delete(`/tags/${tagToDelete.id}`);
            setTags(tags.filter(tag => tag.id !== tagToDelete.id));
            setTagToDelete(null);
            setIsDeleteModalOpen(false);
        } catch (error) {
            console.error('Error deleting tag:', error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (editingTag) {
            handleUpdateTag();
        } else {
            handleCreateTag();
        }
    };

    const handleEdit = (tag) => {
        setEditingTag(tag);
        setName(tag.name);
        setSlug(tag.slug);
        setCategoryId(tag.category_id);
        setSubCategoryId(tag.sub_category_id);
        openModal();
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setEditingTag(null);
        setName('');
        setSlug('');
        setCategoryId('');
        setSubCategoryId('');
        setErrors([]);
    };

    const openDeleteModal = (tag) => {
        setTagToDelete(tag);
        setIsDeleteModalOpen(true);
    };
    const closeDeleteModal = () => {
        setTagToDelete(null);
        setIsDeleteModalOpen(false);
    };

    const handleCategoryChange = (e) => {
        const selectedCategoryId = e.target.value;
        setCategoryId(selectedCategoryId);
        setSubCategoryId('');
    };

    const filteredSubCategories = subCategories.filter(subCategory => subCategory.category_id === parseInt(categoryId));

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Manage Tags</h1>

            <button
                onClick={openModal}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
                Add Tag
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
                        <th className="py-2 px-4 border-b">SubCategory</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tags.map((tag) => (
                        <tr key={tag?.id}>
                            <td className="py-2 px-4 border-b">{tag?.id}</td>
                            <td className="py-2 px-4 border-b">{tag?.name}</td>
                            <td className="py-2 px-4 border-b">{tag?.slug}</td>
                            <td className="py-2 px-4 border-b">{tag?.sub_category?.category?.name}</td>
                            <td className="py-2 px-4 border-b">{tag?.sub_category?.name}</td>
                            <td className="py-2 px-4 border-b">
                                <button
                                    onClick={() => handleEdit(tag)}
                                    className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => openDeleteModal(tag)}
                                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>

            {/* Create/Edit Tag Modal */}
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
                                        {editingTag ? 'Edit Tag' : 'Create Tag'}
                                    </Dialog.Title>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mt-2">
                                            <label className="block text-sm font-medium text-gray-700">Name</label>
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                required
                                            />
                                        </div>

                                        <div className="mt-2">
                                            <label className="block text-sm font-medium text-gray-700">Slug</label>
                                            <input
                                                type="text"
                                                value={slug}
                                                onChange={(e) => setSlug(e.target.value)}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                required
                                            />
                                        </div>

                                        <div className="mt-2">
                                            <label className="block text-sm font-medium text-gray-700">Category</label>
                                            <select
                                                value={categoryId}
                                                onChange={handleCategoryChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                required
                                            >
                                                <option value="">Select a category</option>
                                                {categories.map((category) => (
                                                    <option key={category.id} value={category.id}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="mt-2">
                                            <label className="block text-sm font-medium text-gray-700">SubCategory</label>
                                            <select
                                                value={subCategoryId}
                                                onChange={(e) => setSubCategoryId(e.target.value)}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                required
                                            >
                                                <option value="">Select a subcategory</option>
                                                {filteredSubCategories.map((subCategory) => (
                                                    <option key={subCategory.id} value={subCategory.id}>
                                                        {subCategory.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="mt-4">
                                            <button
                                                type="submit"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            >
                                                {editingTag ? 'Update Tag' : 'Create Tag'}
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
                                        Confirm Delete
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Are you sure you want to delete this tag? This action cannot be undone.
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                            onClick={handleDeleteTag}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            type="button"
                                            className="ml-2 inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
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

export default Tags;
