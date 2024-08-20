import React, { useState } from 'react';
import axiosInstance from '../../../axiosInstance';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Comment from './Comment';

const fetchComments = async (postId) => {
    const response = await axiosInstance.get(`/posts/${postId}/comments`);
    return response.data;
};

const CommentSection = ({ slug, postId }) => {
    const [newComment, setNewComment] = useState('');
    const [replyTo, setReplyTo] = useState(null);
    const queryClient = useQueryClient();

    const { data: comments, isLoading, isError } = useQuery({
        queryKey: ['comments', postId],
        queryFn: () => fetchComments(postId),
    });

    const commentMutation = useMutation({
        mutationFn: (newCommentData) => axiosInstance.post('/comments', newCommentData),
        onSuccess: () => {
            queryClient.invalidateQueries(['comments', postId]);
            setNewComment('');
            setReplyTo(null);
        },
    });

    const handleReply = (commentId, username = '') => {
        setReplyTo(commentId);
        if (username) {
            setNewComment(`${username}, `); // Prefill the comment box with the username
        }
    };

    const handleAddComment = () => {
        commentMutation.mutate({
            post_id: postId,
            content: newComment,
            parent_id: replyTo, // Set the parent_id for replies
        });
    };

    if (isLoading) return <p>Loading comments...</p>;
    if (isError) return <p>Error loading comments.</p>;

    return (
        <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4">
                {comments?.filter(comment => comment.parent_id === null).length || 0} Comments
            </h3>
            {comments && comments.map(comment => (
                <Comment
                    key={comment.id}
                    comment={comment}
                    onReply={handleReply} // Handle reply for both comments and replies
                />
            ))}
            <div className="mt-4">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="Add a comment..."
                />
                <button
                    onClick={handleAddComment}
                    className="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
                >
                    {replyTo ? 'Reply' : 'Comment'}
                </button>
            </div>
        </div>
    );
};

export default CommentSection;
