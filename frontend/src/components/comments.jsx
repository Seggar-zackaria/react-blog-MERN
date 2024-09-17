import PropTypes from "prop-types";

const CommentsList = ({ comments = [] }) => {
  return (
    <div>
      <h3>comments:</h3>
      {comments.length > 0 ? (
        comments.map((comment, i) => (
          <div className="comment" key={i}>
            <h4>{comment.postedBy}</h4>
            <p>{comment.text}</p>
          </div>
        ))
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
};

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      postedBy: PropTypes.string,
      text: PropTypes.string,
    })
  ),
};

export default CommentsList;
