import React, { useState } from 'react';
import { AiOutlineLike } from 'react-icons/ai';
import axiosInstance from '../../../axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const LikeButton = ({ slug, initialLikes, isInitiallyLiked }) => {
    const queryClient = useQueryClient();
    const [isLiked, setIsLiked] = useState(isInitiallyLiked);
    const [likesCount, setLikesCount] = useState(initialLikes);

    const likeMutation = useMutation({
        mutationFn: async () => {
            const response = await axiosInstance.post(`/posts/${slug}/like`);
            return response.data;
        },
        onSuccess: (data) => {
            setLikesCount(data.likes_count);
            setIsLiked(data.is_liked_by_user); // Update based on the backend response
            queryClient.invalidateQueries(['postrt', slug]);
        },
        onError: (error) => {
            console.error('Error liking the post:', error);
        },
    });

    const handleLike = () => {
        likeMutation.mutate();
    };

    return (
        <div className="flex items-center">
            <button onClick={handleLike} className="p-2">
                <AiOutlineLike
                    size={24}
                    className={`${isLiked ? 'text-blue-500' : 'text-gray-500'}`} // Color based on isLiked state
                />
            </button>
            <span className="ml-1 text-lg">{likesCount}</span>
        </div>
    );
};

export default LikeButton;
