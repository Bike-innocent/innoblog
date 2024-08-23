// import React from 'react';
// import { Link } from 'react-router-dom';
// import PlaceholderImage from './PlaceholderImage'; // For comments
// import PlaceholderImageReply from './PlaceholderImageReply'; // For replies
// import CommentDropdown from './CommentDropdown';

// const Comment = ({ comment, onReply, }) => {
//     const isReply = comment.parent_id !== null;
//     const displayUsername = comment.user?.username || 'Unknown User';

//     const handleReplyClick = () => {
//         if (isReply) {
//             onReply(comment.id, displayUsername);
//         } else {
//             onReply(comment.id);
//         }
//     };

//     const handleEdit = (comment) => {
//         console.log(`Editing comment with ID: ${comment.id}`);
//         // Add your edit logic here, like opening an edit modal
//     };

//     const handleDelete = (comment) => {
//         console.log(`Deleting comment with ID: ${comment.id}`);
//         // Add your delete logic here, like showing a confirmation dialog
//     };

//     const handleReport = (comment) => {
//         console.log(`Reporting comment with ID: ${comment.id}`);
//         // Add your report logic here, like opening a report dialog
//     };

//     return (
//         <div className="mb-4">
//             <div className={`flex mr-5 items-center ${isReply ? 'ml-4' : ''}`}>
//                 <Link to={`/${comment.user.username}`}>
//                     {isReply ? (
//                         <PlaceholderImageReply
//                             name={comment.user?.name}
//                             avatar={comment.user?.avatar_url}
//                             placeholderColor={comment.user?.placeholder_color}
//                         />
//                     ) : (
//                         <PlaceholderImage
//                             name={comment.user?.name}
//                             avatar={comment.user?.avatar_url}
//                             placeholderColor={comment.user?.placeholder_color}
//                         />
//                     )}
//                 </Link>
//                 <div className="ml-2 flex-grow">
//                     <Link to={`/${displayUsername}`}>
//                         <p className="font-semibold">{displayUsername}</p>
//                     </Link>
//                     <p dangerouslySetInnerHTML={{ __html: comment.content }}></p>
//                     <button
//                         className="text-sm text-blue-500"
//                         onClick={handleReplyClick}
//                     >
//                         Reply
//                     </button>
//                 </div>
//                 <CommentDropdown comment={comment} onEdit={handleEdit} onDelete={handleDelete} onReport={handleReport} />

//             </div>
//             <div>
//                 {comment.replies && comment.replies.map(reply => (
//                     <Comment
//                         key={reply.id}
//                         comment={reply}
//                         onReply={onReply}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Comment;



import React from 'react';
import { Link } from 'react-router-dom';
import PlaceholderImage from './PlaceholderImage';
import PlaceholderImageReply from './PlaceholderImageReply';
import CommentDropdown from './CommentDropdown';

const Comment = ({ comment, onReply, onEdit, onDelete, onReport }) => {
  const isReply = comment.parent_id !== null;
  const displayUsername = comment.user?.username || 'Unknown User';

  const handleReplyClick = () => {
    if (isReply) {
        onReply(comment.id, displayUsername);
    } else {
        onReply(comment.id);
    }
};

  return (
    <div className="mb-4">
      <div className={`flex mr-5 items-center ${isReply ? 'ml-4' : ''}`}>
        <Link to={`/${comment.user.username}`}>
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
        </Link>
        <div className="ml-2 flex-grow">
          <Link to={`/${displayUsername}`}>
            <p className="font-semibold">{displayUsername}</p>
          </Link>
          <p dangerouslySetInnerHTML={{ __html: comment.content }}></p>
          <button
            className="text-sm text-blue-500"
            onClick={handleReplyClick}
          >
            Reply
          </button>
        </div>
        <CommentDropdown
          comment={comment}
          onEdit={onEdit}
          onDelete={onDelete}
          onReport={onReport}
        />
      </div>
      <div>
        {comment.replies && comment.replies.map(reply => (
          <Comment
            key={reply.id}
            comment={reply}
            onReply={onReply}
            onEdit={onEdit}
            onDelete={onDelete}
            onReport={onReport}
          />
        ))}
      </div>
    </div>
  );
};

export default Comment;
