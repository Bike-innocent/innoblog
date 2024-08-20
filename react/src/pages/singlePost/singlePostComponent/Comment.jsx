import React from 'react';
import PlaceholderImage from './PlaceholderImage'; // For comments
import PlaceholderImageReply from './PlaceholderImageReply'; // For replies

const Comment = ({ comment, onReply }) => {
    const isReply = comment.parent_id !== null;
    const displayUsername = comment.user?.username || 'Unknown User';

    const handleReplyClick = () => {
        if (isReply) {
            // Prefill the comment box with the username for replies to replies
            onReply(comment.id, displayUsername);
        } else {
            // Just pass the comment ID for top-level replies
            onReply(comment.id);
        }
    };

    return (
        <div className="mb-4">
            <div className={`flex mr-5 items-center ${isReply ? 'ml-4' : ''}`}>
                {isReply ? (
                    <PlaceholderImageReply
                        name={comment.user?.name}
                        avatar={comment.user?.avatar_url}
                        placeholderColor={comment.user?.placeholder_color}
                    />
                ) : (
                    <PlaceholderImage
                        name={comment.user?.name}
                        avatar={comment.user?.avatar_url}
                        placeholderColor={comment.user?.placeholder_color}
                    />
                )}
                <div className="ml-2">
                    <p className="font-semibold">{displayUsername}</p>
                    <p>{comment.content}</p>
                    <button
                        className="text-sm text-blue-500"
                        onClick={handleReplyClick} // Handle reply click with logic
                    >
                        Reply
                    </button>
                </div>
            </div>
            <div>
                {comment.replies && comment.replies.map(reply => (
                    <Comment
                        key={reply.id}
                        comment={reply}
                        onReply={onReply} // Pass down the onReply function
                    />
                ))}
            </div>
        </div>
    );
};

export default Comment;
