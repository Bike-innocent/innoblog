import React, { useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { useNavigate } from 'react-router-dom';
import Processing from '../../components/Processing';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'title') setTitle(value);
        if (name === 'description') setDescription(value);
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('image', image);

        try {
            await axiosInstance.post('/posts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/dashboard/my-post', { state: { success: 'Post created successfully.' } });
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            }
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="rounded-lg">
            <h1 className="text-2xl font-semibold mb-4">Create a New Post</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                    <input
                        type="text"
                        className="appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-blue-600 focus:outline-none focus:shadow-outline"
                        id="title"
                        name="title"
                        value={title}
                        onChange={handleInputChange}
                        
                    />
                    {errors.title && <span className="text-red-500 text-sm mt-1">{errors.title[0]}</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                    <textarea
                        className="appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-blue-600 focus:outline-none focus:shadow-outline"
                        id="description"
                        name="description"
                        rows="4"
                        value={description}
                        onChange={handleInputChange}
                      
                    ></textarea>
                    {errors.description && <span className="text-red-500 text-sm mt-1">{errors.description[0]}</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">Image</label>
                    <input
                        type="file"
                        className="appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight"
                        id="image"
                        name="image"
                        onChange={handleImageChange}
                        
                    />
                    {errors.image && <span className="text-red-500 text-sm mt-1">{errors.image[0]}</span>}
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        disabled={processing}
                    >
                        {processing ? <Processing text="Creating post..." /> : 'Create Post'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePost;
