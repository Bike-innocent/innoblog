import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance'; // Ensure the path is correct
import { Dialog, Transition } from '@headlessui/react';

const MyCategory = () => {
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [categorySlug, setCategorySlug] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await axiosInstance.get('/categories');
    setCategories(response.data);
  };

  const handleCreateOrUpdate = async () => {
    if (editingCategory) {
      await axiosInstance.put(`/categories/${editingCategory.id}`, { name: categoryName, slug: categorySlug });
    } else {
      await axiosInstance.post('/categories', { name: categoryName, slug: categorySlug });
    }
    fetchCategories();
    closeModal();
  };

  const handleDelete = async (id) => {
    await axiosInstance.delete(`/categories/${id}`);
    fetchCategories();
  };

  const openModal = (category = null) => {
    setIsOpen(true);
    setEditingCategory(category);
    setCategoryName(category ? category.name : '');
    setCategorySlug(category ? category.slug : '');
  };

  const closeModal = () => {
    setIsOpen(false);
    setEditingCategory(null);
    setCategoryName('');
    setCategorySlug('');
  };

  return (
    <div>
      <h1>Categories</h1>
      <button onClick={() => openModal()} className="px-4 py-2 bg-blue-500 text-white rounded-md">Add Category</button>
      <ul className="mt-4">
        {categories.map((category) => (
          <li key={category.id} className="flex justify-between items-center mt-2">
            {category.name} ({category.slug})
            <div>
              <button onClick={() => openModal(category)} className="px-2 py-1 bg-yellow-500 text-white rounded-md mr-2">Edit</button>
              <button onClick={() => handleDelete(category.id)} className="px-2 py-1 bg-red-500 text-white rounded-md">Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <Transition appear show={isOpen} as={React.Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
            </Transition.Child>

            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  {editingCategory ? 'Edit Category' : 'Add Category'}
                </Dialog.Title>
                <div className="mt-2">
                  <input
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    placeholder="Category Name"
                    className="border p-2 w-full"
                  />
                  <input
                    type="text"
                    value={categorySlug}
                    onChange={(e) => setCategorySlug(e.target.value)}
                    placeholder="Category Slug"
                    className="border p-2 w-full mt-2"
                  />
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={handleCreateOrUpdate}
                  >
                    {editingCategory ? 'Update' : 'Create'}
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 ml-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default MyCategory;
