// import React, { useState, useRef } from 'react';
// import axiosInstance from '../../../axiosInstance';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import Comment from './Comment';

// const fetchComments = async (postId) => {
//   const response = await axiosInstance.get(`/posts/${postId}/comments`);
//   return response.data;
// };

// const updateComment = async ({ comment_id, content }) => {
//   const response = await axiosInstance.put(`/comments/${comment_id}`, { content });
//   return response.data;
// };

// const CommentSection = ({ slug, postId, }) => {
//   const [newComment, setNewComment] = useState('');
//   const [replyTo, setReplyTo] = useState(null);
//   const queryClient = useQueryClient();
//   const commentInputRef = useRef(null);
//   const [editComment, setEditComment] = useState(null);

//   const { data: comments, isLoading, isError } = useQuery({
//     queryKey: ['comments', postId],
//     queryFn: () => fetchComments(postId),
//   });

//   const commentMutation = useMutation({
//     mutationFn: newCommentData => {
//       if (editComment) {
//         return updateComment(newCommentData);
//       } else {
//         return axiosInstance.post('/comments', newCommentData);
//       }
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(['comments', postId]);
//       setNewComment('');
//       setReplyTo(null);
//       setEditComment(null); // Reset the edit state
//       if (commentInputRef.current) {
//         commentInputRef.current.innerHTML = ''; // Clear the input field
//       }
//     },
//   });

//   const handleReply = (commentId, username = '') => {
//     setReplyTo(commentId);
//     if (commentInputRef.current) {
//       const formattedUsername = `<span contenteditable="false" style="color: green; font-weight: bold;"><a href="/${username}" style="color: green; text-decoration: none; display:inline;">${username}</a></span>&nbsp;`;
//       commentInputRef.current.innerHTML = formattedUsername;
//       commentInputRef.current.focus();
//       moveCaretToEnd(commentInputRef.current);
//     }
//   };

//   const moveCaretToEnd = (el) => {
//     const range = document.createRange();
//     const sel = window.getSelection();
//     range.selectNodeContents(el);
//     range.collapse(false);
//     sel.removeAllRanges();
//     sel.addRange(range);
//     el.focus();
//   };

//   const handleAddComment = () => {
//     if (editComment) {
//       // Update the existing comment
//       commentMutation.mutate({
//         comment_id: editComment.id,
//         content: newComment,
//       });
//     } else {
//       // Add a new comment
//       commentMutation.mutate({
//         post_id: postId,
//         content: newComment,
//         parent_id: replyTo,
//       });
//     }
//   };

//   const handleInputChange = (e) => {
//     const content = e.target.innerHTML.trim();
//     setNewComment(content);

//     if (!content && replyTo === null) {
//       handleCancelReply();
//     }
//   };

//   const handleCancelReply = () => {
//     setReplyTo(null);
//     setNewComment('');
//     if (commentInputRef.current) {
//       commentInputRef.current.innerHTML = '';
//       commentInputRef.current.focus();
//     }
//   };

//   const handleEdit = (comment) => {
//     setEditComment(comment);
//     setNewComment(comment.content);
//     if (commentInputRef.current) {
//       commentInputRef.current.innerHTML = comment.content;
//       commentInputRef.current.focus();
//     }
//   };

//   const handleDelete  = async (comment) =>{
//     try {
//         await axiosInstance.delete(`/comments/${comment.id}`);
//         // Refresh comments or update state accordingly
//       } catch (error) {
//         console.error('Error deleting comment:', error);
//       }
//   };



//   const handleReport = (comment) => {
//     // Handle reporting logic here
//   };

//   const hasComments = comments && comments.length > 0;
//   const commentCount = hasComments ? comments.filter(comment => comment.parent_id === null).length : 0;


//   return (
//     <div className="mt-8">
//       <h3 className="text-2xl font-semibold mb-4">
//         {commentCount} {commentCount === 1 ? 'Comment' : 'Comments'}
//       </h3>
//       {hasComments ? (
//         <div className="max-h-96 p-3 overflow-y-auto border border-gray-300 rounded no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>

//           {comments.map(comment => (
//             <Comment
//               key={comment.id}
//               comment={comment}
//               onReply={handleReply}
//               onEdit={handleEdit}
//               onDelete={handleDelete}
//               onReport={handleReport}
//             />
//           ))}
//         </div>
//       ) : (
//         <p className="text-gray-500">Be the first to comment!</p>
//       )}
//       <div className="mt-4">
//         <div
//           ref={commentInputRef}
//           contentEditable
//           onInput={handleInputChange}
//           className=" p-2 border rounded"
//           placeholder="Add a comment..."

//         />
//         <div className="mt-2  space-x-2">
//           <button
//             onClick={handleAddComment}
//             className="bg-blue-500 text-white py-2 px-4 rounded"
//           >
//             {editComment ? 'Update Comment' : replyTo ? 'Reply' : 'Comment'}
//           </button>
//           {replyTo && (
//             <button
//               onClick={handleCancelReply}
//               className="bg-gray-500 text-white py-2 px-4 rounded"
//             >
//               Cancel
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CommentSection;

import React, { useState, useRef } from 'react';
import axiosInstance from '../../../axiosInstance';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Comment from './Comment';

const fetchComments = async (postId) => {
  const response = await axiosInstance.get(`/posts/${postId}/comments`);
  return response.data;
};

const updateComment = async ({ comment_id, content }) => {
  const response = await axiosInstance.put(`/comments/${comment_id}`, { content });
  return response.data;
};

const deleteComment = async (comment_id) => {
  const response = await axiosInstance.delete(`/comments/${comment_id}`);
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
      setEditComment(null);
      if (commentInputRef.current) {
        commentInputRef.current.innerHTML = '';
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (comment_id) => deleteComment(comment_id),
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', postId]);
    },
  });

  const handleReply = (commentId, username = '') => {
    setReplyTo(commentId);
    if (commentInputRef.current) {
      const formattedUsername = `<span contenteditable="false" style="color: green; font-weight: bold;"><a href="/${username}" style="color: green; text-decoration: none; display:inline;">${username}</a></span>&nbsp;`;
      commentInputRef.current.innerHTML = formattedUsername;
      commentInputRef.current.focus();
      moveCaretToEnd(commentInputRef.current);
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

  const handleAddComment = () => {
    if (editComment) {
      commentMutation.mutate({
        comment_id: editComment.id,
        content: newComment,
      });
    } else {
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

    if (!content && replyTo === null) {
      handleCancelReply();
    }
  };

  const handleCancelReply = () => {
    setReplyTo(null);
    setNewComment('');
    if (commentInputRef.current) {
      commentInputRef.current.innerHTML = '';
      commentInputRef.current.focus();
    }
  };

  const handleEdit = (comment) => {
    setEditComment(comment);
    setNewComment(comment.content);
    if (commentInputRef.current) {
      commentInputRef.current.innerHTML = comment.content;
      commentInputRef.current.focus();
    }
  };

  const handleDelete = (comment) => {
    deleteMutation.mutate(comment.id);
  };

  const handleReport = (comment) => {
    // Handle reporting logic here
  };

  const hasComments = comments && comments.length > 0;
  const commentCount = hasComments ? comments.filter(comment => comment.parent_id === null).length : 0;

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold mb-4">
        {commentCount} {commentCount === 1 ? 'Comment' : 'Comments'}
      </h3>
      {hasComments ? (
        <div className="max-h-96 p-3 overflow-y-auto border border-gray-300 rounded no-scrollbar">
          {comments.map(comment => (
            <Comment
              key={comment.id}
              comment={comment}
              onReply={handleReply}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onReport={handleReport}
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
          className="p-2 border rounded"
          placeholder="Add a comment..."
        />
        <div className="mt-2 space-x-2">
          <button
            onClick={handleAddComment}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            {editComment ? 'Update Comment' : replyTo ? 'Reply' : 'Comment'}
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
