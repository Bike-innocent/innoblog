import React, { useState } from 'react';
import PlaceholderImage from './PlaceholderImage'; // For comments
import PlaceholderImageReply from './PlaceholderImageReply'; // For replies
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Importing icons

const Comment = ({ comment, onReply }) => {
    const [showReplies, setShowReplies] = useState(false); // State to track if replies are shown
    const isReply = comment.parent_id !== null; // Check if this comment is a reply

    const displayUsername = comment.user?.username || 'Unknown User'; // Determine the username to display

    const toggleReplies = () => setShowReplies(!showReplies); // Toggle the visibility of replies

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
                        onClick={() => onReply(comment.id)}
                    >
                        Reply
                    </button>
                </div>
            </div>

            {comment.replies && comment.replies.length > 0 && (
                <div className="ml-6 mt-2">
                    <button
                        className="flex items-center text-blue-500 text-sm"
                        onClick={toggleReplies}
                    >
                        {showReplies ? 'Hide Replies' : 'View Replies'}
                        {showReplies ? (
                            <FaChevronUp className="ml-1" />
                        ) : (
                            <FaChevronDown className="ml-1" />
                        )}
                    </button>
                </div>
            )}

            {showReplies && (
                <div className="ml-6 mt-2">
                    {comment.replies.map(reply => (
                        <Comment
                            key={reply.id}
                            comment={reply}
                            onReply={onReply}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Comment;
