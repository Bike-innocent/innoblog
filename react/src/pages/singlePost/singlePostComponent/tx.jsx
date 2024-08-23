import React, { useState, useRef } from 'react';
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
    const commentInputRef = useRef(null);
    const [editComment, setEditComment] = useState(null);


    const { data: comments, isLoading, isError } = useQuery({
        queryKey: ['comments', postId],
        queryFn: () => fetchComments(postId),
    });

    // const commentMutation = useMutation({
    //     mutationFn: (newCommentData) => axiosInstance.post('/comments', newCommentData),
    //     onSuccess: () => {
    //         queryClient.invalidateQueries(['comments', postId]);
    //         setNewComment('');
    //         setReplyTo(null);
    //         if (commentInputRef.current) {
    //             commentInputRef.current.innerHTML = ''; // Clear the contenteditable div
    //         }
    //     },
    // });


const commentMutation = useMutation({
    mutationFn: newCommentData => {
      if (editComment) {
        return updateComment(newCommentData);
      } else {
        return axiosInstance.post('/comments', newCommentData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', postId]);
      setNewComment('');
      setReplyTo(null);
      setEditComment(null); // Reset the edit state
      if (commentInputRef.current) {
        commentInputRef.current.innerHTML = ''; // Clear the input field
      }
    },
  });

    const handleReply = (commentId, username = '') => {
        setReplyTo(commentId);
        if (commentInputRef.current) {
            const formattedUsername = `<span contenteditable="false" style="color: green; font-weight: bold;"><a href="/${username}" style="color: green; text-decoration: none; display:inline;">${username}</a></span>&nbsp;`;
            commentInputRef.current.innerHTML = formattedUsername;
            commentInputRef.current.focus(); // Focus the input field
            moveCaretToEnd(commentInputRef.current); // Move the caret to the end
        }
    };

    const moveCaretToEnd = (el) => {
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(el);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
        el.focus();
    };

    // const handleAddComment = () => {
    //     commentMutation.mutate({
    //         post_id: postId,
    //         content: newComment,
    //         parent_id: replyTo,
    //     });
    // };

    const handleAddComment = () => {
        if (editComment) {
          // Update the existing comment
          commentMutation.mutate({
            comment_id: editComment.id,
            content: newComment,
          }, {
            onSuccess: () => {
              setEditComment(null); // Clear the edit state after success
            }
          });
        } else {
          // Add a new comment
          commentMutation.mutate({
            post_id: postId,
            content: newComment,
            parent_id: replyTo,
          });
        }
      };


    const handleInputChange = (e) => {
        const content = e.target.innerHTML.trim();
        setNewComment(content);

        // Only reset if the input is empty and the user is not in reply mode
        if (!content && replyTo === null) {
            handleCancelReply();
        }
    };

    const handleCancelReply = () => {
        setReplyTo(null);
        setNewComment('');
        if (commentInputRef.current) {
            commentInputRef.current.innerHTML = ''; // Clear the input field
            commentInputRef.current.focus(); // Ensure the field is focused for typing
        }
    };

    const handleEdit = (comment) => {
        setEditComment(comment);
        setNewComment(comment.content); // Set the content to be edited
        if (commentInputRef.current) {
          commentInputRef.current.innerHTML = comment.content; // Populate the input field
          commentInputRef.current.focus(); // Focus the input field for editing
        }
      };

      const updateComment = async ({ comment_id, content }) => {
        const response = await axiosInstance.put(`/comments/${comment_id}`, { content });
        return response.data;
      };


    if (isLoading) return <p>Loading comments...</p>;
    if (isError) return <p>Error loading comments.</p>;

    const hasComments = comments && comments.length > 0;
    const commentCount = hasComments ? comments.filter(comment => comment.parent_id === null).length : 0;

    return (
        <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4">
                {commentCount} {commentCount === 1 ? 'Comment' : 'Comments'}
            </h3>
            {hasComments ? (
                <div className="max-h-96 p-3 overflow-y-auto border border-gray-300 rounded" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    <style jsx>{`
                        .max-h-96::-webkit-scrollbar {
                            display: none;
                        }
                    `}</style>
                    {comments.map(comment => (
                        <Comment
                            key={comment.id}
                            comment={comment}
                            onReply={handleReply}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">Be the first to comment!</p>
            )}
            <div className="mt-4">
                <div
                    ref={commentInputRef}
                    contentEditable
                    onInput={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="Add a comment..."
                    style={{ minHeight: '50px', whiteSpace: 'pre-wrap' }}
                />
                <div className="mt-2 flex space-x-2">
                    <button
                        onClick={handleAddComment}
                        className="bg-blue-500 text-white py-2 px-4 rounded"
                    >
                        {replyTo ? 'Reply' : 'Comment'}
                    </button>
                    {replyTo && (
                        <button
                            onClick={handleCancelReply}
                            className="bg-gray-500 text-white py-2 px-4 rounded"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommentSection;
