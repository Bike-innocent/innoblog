// import React, { useState, useEffect, Fragment } from 'react';
// import axiosInstance from '../../axiosInstance';
// import { Dialog, Transition, Tab } from '@headlessui/react';
// import { FaEllipsisV } from 'react-icons/fa';
// import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@nextui-org/react';
// import Loader from '../../components/Loader';
// import SuccessMessage from '../../components/SuccessMessage';

// function ManageCategory() {
//   const [categories, setCategories] = useState([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const [modalType, setModalType] = useState('');
//   const [formData, setFormData] = useState({ id: null, name: '', slug: '' });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [confirmationOpen, setConfirmationOpen] = useState(false);
//   const [deleteCategoryId, setDeleteCategoryId] = useState(null);

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     setLoading(true);
//     try {
//       const response = await axiosInstance.get('/manage-category');
//       console.log('API response:', response.data);
//       setCategories(response.data);
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//       setError('Error fetching categories');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const openModal = (type, category = {}) => {
//     setModalType(type);
//     setFormData({
//       id: category.id || null,
//       name: category.name || '',
//       slug: category.slug || '',
//     });
//     setIsOpen(true);
//   };

//   const closeModal = () => {
//     setIsOpen(false);
//     setError('');
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (modalType === 'add') {
//         await axiosInstance.post('/manage-category/category', formData);
//         setSuccessMessage('Category added successfully');
//       } else if (modalType === 'edit') {
//         await axiosInstance.put(`/manage-category/category/${formData.id}`, formData);
//         setSuccessMessage('Category updated successfully');
//       }
//       fetchCategories();
//       closeModal();
//     } catch (error) {
//       console.error('Error saving category:', error);
//       setError('Error saving category');
//     }
//   };

//   const confirmDelete = (id) => {
//     setDeleteCategoryId(id);
//     setConfirmationOpen(true);
//   };

//   const handleDelete = async () => {
//     try {
//       await axiosInstance.delete(`/manage-category/category/${deleteCategoryId}`);
//       fetchCategories();
//       setSuccessMessage('Category deleted successfully');
//       setConfirmationOpen(false);
//     } catch (error) {
//       console.error('Error deleting category:', error);
//       setError('Error deleting category');
//     }
//   };

//   const renderCategoryTabs = () => {
//     return categories.map((category) => (
//       <Tab key={category.id} as={Fragment}>
//         {({ selected }) => (
//           <div className={`flex items-center justify-between px-1 py-1 md:px-3 md:py-2 m-1 ${selected ? 'bg-blue-500 text-white' : 'relative group break-words whitespace-normal focus:outline-none border-none hover:bg-gray-300'}`}>
//             <span>{category.name}</span>
//             <Dropdown className='focus:outline-none border-none'>
//               <DropdownTrigger className='focus:outline-none border-none'>
//                 <Button auto light>
//                   <FaEllipsisV className="w-4 h-4 focus:outline-none border-none" />
//                 </Button>
//               </DropdownTrigger>
//               <DropdownMenu className='border-blue-300 bg-gray-100 rounded-sm'>
//                 <DropdownItem key="add" onClick={() => openModal('add', { parentId: category.id })} className="hover:bg-blue-100 focus:outline-none border-none">
//                   Add Subcategory
//                 </DropdownItem>
//                 <DropdownItem key="edit" onClick={() => openModal('edit', category)} className="hover:bg-blue-100 focus:outline-none border-none">
//                   Edit
//                 </DropdownItem>
//                 <DropdownItem key="delete" color="error" onClick={() => confirmDelete(category.id)} className="hover:bg-blue-100 focus:outline-none border-none">
//                   Delete
//                 </DropdownItem>
//               </DropdownMenu>
//             </Dropdown>
//           </div>
//         )}
//       </Tab>
//     ));
//   };

//   const renderCategoryPanels = () => {
//     return categories.map((category) => (
//       <Tab.Panel key={category.id}>
//         {category.sub_categories && category.sub_categories.length > 0 ? (
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead>
//               <tr>
//                 <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
//                   Subcategories
//                 </th>
//                 <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-4/5">
//                   Tags
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {category.sub_categories.map((subCategory) => (
//                 <tr key={subCategory.id}>
//                   <td className="px-6 py-4 whitespace-nowrap flex items-center justify-between border-r">
//                     <div className='bg-green-200 rounded p-2'>
//                       <span>{subCategory.name}</span>
//                       <Dropdown>
//                         <DropdownTrigger>
//                           <Button auto light>
//                             <FaEllipsisV className="w-3 h-3" />
//                           </Button>
//                         </DropdownTrigger>
//                         <DropdownMenu className='bg-gray-100 shadow-sm'>
//                           <DropdownItem key="addTag" onClick={() => openModal('addTag', { parentId: subCategory.id })} className='hover:bg-blue-200'>
//                             Add Tags
//                           </DropdownItem>
//                           <DropdownItem key="edit" onClick={() => openModal('edit', subCategory)} className='hover:bg-blue-200'>
//                             Edit
//                           </DropdownItem>
//                           <DropdownItem key="delete" color="error" onClick={() => confirmDelete(subCategory.id)} className='hover:bg-blue-200'>
//                             Delete
//                           </DropdownItem>
//                         </DropdownMenu>
//                       </Dropdown>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap w-4/5">
//                     {subCategory.tags && subCategory.tags.length > 0
//                       ? subCategory.tags.map((tag) => (
//                           <div key={tag.id} className="flex items-center justify-between w-36 bg-gray-200 rounded p-2">
//                             <span>{tag.name}</span>
//                             <Dropdown>
//                               <DropdownTrigger>
//                                 <Button auto light>
//                                   <FaEllipsisV className="w-3 h-3" />
//                                 </Button>
//                               </DropdownTrigger>
//                               <DropdownMenu className='bg-gray-100 shadow-sm'>
//                                 <DropdownItem key="edit" onClick={() => openModal('edit', tag)} className='hover:bg-blue-200'>
//                                   Edit
//                                 </DropdownItem>
//                                 <DropdownItem key="delete" color="error" onClick={() => confirmDelete(tag.id)} className='hover:bg-blue-200'>
//                                   Delete
//                                 </DropdownItem>
//                               </DropdownMenu>
//                             </Dropdown>
//                           </div>
//                         ))
//                       : 'No tags available'}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <p className='bg-green-100 text-green-700 p-2 rounded'>No subcategories available</p>
//         )}
//       </Tab.Panel>
//     ));
//   };

//   return (
//     <div className="bg-gray-200 p-4 min-h-screen">
//       <h1 className="text-2xl font-bold mb-4">Category Management</h1>
//       {loading && <Loader />}
//       {error && <p className="text-red-500 mb-4">{error}</p>}
//       {successMessage && <SuccessMessage message={successMessage} />}
//       <div className="flex justify-between items-center mb-4">
//         <button
//           onClick={() => openModal('add')}
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           Add Category
//         </button>
//       </div>
//       <Tab.Group>
//         <Tab.List className='p-2 bg-gray-300 rounded-md flex flex-wrap justify-between items-center'>{renderCategoryTabs()}</Tab.List>
//         <Tab.Panels>{renderCategoryPanels()}</Tab.Panels>
//       </Tab.Group>
//       <Transition appear show={isOpen} as={Fragment}>
//         <Dialog as="div" className="relative z-10" onClose={closeModal}>
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <div className="fixed inset-0 bg-black bg-opacity-25" />
//           </Transition.Child>
//           <div className="fixed inset-0 overflow-y-auto">
//             <div className="flex min-h-full items-center justify-center p-4 text-center">
//               <Transition.Child
//                 as={Fragment}
//                 enter="ease-out duration-300"
//                 enterFrom="opacity-0 scale-95"
//                 enterTo="opacity-100 scale-100"
//                 leave="ease-in duration-200"
//                 leaveFrom="opacity-100 scale-100"
//                 leaveTo="opacity-0 scale-95"
//               >
//                 <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
//                   <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
//                     {modalType === 'add' ? 'Add Category' : 'Edit Category'}
//                   </Dialog.Title>
//                   <form onSubmit={handleSubmit}>
//                     <div className="mt-2">
//                       <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//                         Name
//                       </label>
//                       <input
//                         type="text"
//                         name="name"
//                         id="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         className="mt-1 p-2 w-full border rounded-md"
//                         required
//                       />
//                     </div>
//                     <div className="mt-2">
//                       <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
//                         Slug
//                       </label>
//                       <input
//                         type="text"
//                         name="slug"
//                         id="slug"
//                         value={formData.slug}
//                         onChange={handleChange}
//                         className="mt-1 p-2 w-full border rounded-md"
//                         required
//                       />
//                     </div>
//                     {error && <p className="text-red-500 mt-2">{error}</p>}
//                     <div className="mt-4 flex justify-end">
//                       <button
//                         type="button"
//                         className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-300 border border-transparent rounded-md hover:bg-gray-400 focus:outline-none"
//                         onClick={closeModal}
//                       >
//                         Cancel
//                       </button>
//                       <button
//                         type="submit"
//                         className="ml-2 inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none"
//                       >
//                         {modalType === 'add' ? 'Add' : 'Save'}
//                       </button>
//                     </div>
//                   </form>
//                 </Dialog.Panel>
//               </Transition.Child>
//             </div>
//           </div>
//         </Dialog>
//       </Transition>
//       <Transition appear show={confirmationOpen} as={Fragment}>
//         <Dialog as="div" className="relative z-10" onClose={() => setConfirmationOpen(false)}>
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <div className="fixed inset-0 bg-black bg-opacity-25" />
//           </Transition.Child>
//           <div className="fixed inset-0 overflow-y-auto">
//             <div className="flex min-h-full items-center justify-center p-4 text-center">
//               <Transition.Child
//                 as={Fragment}
//                 enter="ease-out duration-300"
//                 enterFrom="opacity-0 scale-95"
//                 enterTo="opacity-100 scale-100"
//                 leave="ease-in duration-200"
//                 leaveFrom="opacity-100 scale-100"
//                 leaveTo="opacity-0 scale-95"
//               >
//                 <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
//                   <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
//                     Confirm Delete
//                   </Dialog.Title>
//                   <div className="mt-2">
//                     <p className="text-sm text-gray-500">Are you sure you want to delete this category?</p>
//                   </div>
//                   <div className="mt-4 flex justify-end">
//                     <button
//                       type="button"
//                       className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-300 border border-transparent rounded-md hover:bg-gray-400 focus:outline-none"
//                       onClick={() => setConfirmationOpen(false)}
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       type="button"
//                       className="ml-2 inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md hover:bg-red-600 focus:outline-none"
//                       onClick={handleDelete}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </Dialog.Panel>
//               </Transition.Child>
//             </div>
//           </div>
//         </Dialog>
//       </Transition>
//     </div>
//   );
// }

// export default ManageCategory;