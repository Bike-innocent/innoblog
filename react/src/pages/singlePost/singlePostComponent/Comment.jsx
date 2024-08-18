import React from 'react';
import PlaceholderImage from './PlaceholderImage'; // Adjust the import path as necessary

const Comment = ({ comment, onReply }) => (
    <div className="ml-6 mb-4">
        <div className="flex items-center">
            <PlaceholderImage
                name={comment.user.name}
                avatar={comment.user.avatar_url}
                placeholderColor={comment.user.placeholder_color}
            />
            <div className="ml-4">
                <p className="font-semibold">{comment.user.username}</p>
                <p>{comment.content}</p>
                <button className="text-sm text-blue-500" onClick={() => onReply(comment.id)}>
                    Reply
                </button>
            </div>
        </div>
        {/* Render replies */}
        {comment.replies && comment.replies.map(reply => (
            <Comment key={reply.id} comment={reply} onReply={onReply} />
        ))}
    </div>
);

export default Comment;
