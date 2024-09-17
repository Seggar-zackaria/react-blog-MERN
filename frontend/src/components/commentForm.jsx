import axios from "axios";
import { useState } from "react";

const CommentForm = ({ articleName, onArticleUpdated }) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const addComment = async () => {
    const res = await axios.post(
      `http://localhost:8000/api/articles/${articleName}/comments`,
      {
        postedBy: name,
        text: comment,
      }
    );

    const updatedArticle = res.data;

    onArticleUpdated(updatedArticle);

    setName("");
    setComment("");
  };

  return (
    <div id="add-comment-form">
      <h3>add comment </h3>
      <label>
        name :
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        comment :
        <textarea
          rows={"4"}
          cols={"50"}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </label>
      <button onClick={addComment}>add comment</button>
    </div>
  );
};

export default CommentForm;
