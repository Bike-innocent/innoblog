import React, { useState, useEffect, Fragment } from 'react';
import axiosInstance from '../../axiosInstance';
import { Dialog, Transition } from '@headlessui/react';

function ManageCategory() {
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    slug: '',
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get('/manage-category');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const openModal = (type, category = {}) => {
    setModalType(type);
    setFormData({
      id: category.id || null,
      name: category.name || '',
      slug: category.slug || '',
    });
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalType === 'add') {
        await axiosInstance.post('/manage-category/category', formData);
      } else if (modalType === 'edit') {
        await axiosInstance.put(`/manage-category/category/${formData.id}`, formData);
      }
      fetchCategories();
      closeModal();
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/manage-category/category/${id}`);
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div>
      <h1>Manage Categories</h1>
      <button onClick={() => openModal('add')}>Add Category</button>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            {category.name}
            <button onClick={() => openModal('edit', category)}>Edit</button>
            <button onClick={() => handleDelete(category.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <Transition appear show={isOpen} as={Fragment}>
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
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    {modalType === 'add' ? 'Add Category' : 'Edit Category'}
                  </Dialog.Title>
                  <form onSubmit={handleSubmit}>
                    <div className="mt-2">
                      <label>Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                      />
                    </div>
                    <div className="mt-2">
                      <label>Slug</label>
                      <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                      />
                    </div>
                    <div className="mt-4">
                      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                        {modalType === 'add' ? 'Add' : 'Save'}
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default ManageCategory;
