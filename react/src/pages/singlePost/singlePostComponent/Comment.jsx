import React from 'react';
import PlaceholderImage from './PlaceholderImage'; // For comments
import PlaceholderImageReply from './PlaceholderImageReply'; // For replies

const Comment = ({ comment, onReply, originalCommentUser }) => {
    // Determine if this is a reply to a reply
    const isReplyToReply = !!originalCommentUser;
    const displayUsername = isReplyToReply
        ? `${comment.user?.username} replied to ${originalCommentUser?.username}`
        : comment.user?.username;

    return (
        <div className="mb-4">
            <div className={`flex mr-5 items-center ${isReplyToReply ? 'ml-4' : ''}`}>
                {/* Use a different placeholder image size for replies */}
                {isReplyToReply ? (
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
                    <p className="font-semibold">{displayUsername || 'Unknown User'}</p>
                    <p>{comment.content}</p>
                    <button className="text-sm text-blue-500" onClick={() => onReply(comment.id)}>
                        Reply
                    </button>
                </div>
            </div>
            {/* Render replies with consistent margin */}
            <div className="">
                {comment.replies && comment.replies.map(reply => (
                    <Comment
                        key={reply.id}
                        comment={reply}
                        onReply={onReply}
                        originalCommentUser={isReplyToReply ? originalCommentUser : comment.user}
                    />
                ))}
            </div>
        </div>
    );
};

export default Comment;


// import React from 'react';
// import PlaceholderImage from './PlaceholderImage'; // Adjust the import path as necessary

// const Comment = ({ comment, onReply }) => {
//     const isReply = comment.parent_id !== null;

//     return (
//         <div className={`ml-6 mb-4 ${isReply ? 'ml-12' : ''}`}>
//             <div className="flex items-center">
//                 <PlaceholderImage
//                     name={comment.user.name}
//                     avatar={comment.user.avatar_url}
//                     placeholderColor={comment.user.placeholder_color}
//                 />
//                 <div className="ml-4">
//                     {isReply ? (
//                         <p className="font-semibold">
//                             {comment.user.name} replied to {comment.replied_to_user_name}
//                         </p>
//                     ) : (
//                         <p className="font-semibold">{comment.user.name}</p>
//                     )}
//                     <p>{comment.content}</p>
//                     <button className="text-sm text-blue-500" onClick={() => onReply(comment.id)}>
//                         Reply
//                     </button>
//                 </div>
//             </div>
//             {/* Render replies */}
//             {comment.replies && comment.replies.map(reply => (
//                 <Comment key={reply.id} comment={reply} onReply={onReply} />
//             ))}
//         </div>
//     );
// };

// export default Comment;











// import React from 'react';
// import PlaceholderImage from './PlaceholderImage'; // Adjust the import path as necessary

// const Comment = ({ comment, onReply }) => {
//     const { user } = comment;
//     const username = user?.username || "Unknown User";
//     const avatarUrl = user?.avatar_url || null;
//     const placeholderColor = user?.placeholder_color || "#000"; // Default color

//     // Determine if it's a reply to another reply
//     const repliedTo = comment.parent_id ? comment.replies.find(reply => reply.id === comment.parent_id)?.user?.username : null;

//     return (
//         <div className="ml-6 mb-4">
//             <div className="flex items-center">
//                 <PlaceholderImage
//                     name={username}
//                     avatar={avatarUrl}
//                     placeholderColor={placeholderColor}
//                 />
//                 <div className="ml-4">
//                     <p className="font-semibold">
//                         {repliedTo ? `${username} replied to ${repliedTo}` : username}
//                     </p>
//                     <p>{comment.content}</p>
//                     <button className="text-sm text-blue-500" onClick={() => onReply(comment.id)}>
//                         Reply
//                     </button>
//                 </div>
//             </div>
//             {/* Render replies */}
//             {comment.replies && comment.replies.map(reply => (
//                 <Comment key={reply.id} comment={reply} onReply={onReply} />
//             ))}
//         </div>
//     );
// };

//  export default Comment;

