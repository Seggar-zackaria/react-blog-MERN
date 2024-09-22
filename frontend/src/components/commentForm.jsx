import axios from "axios";
import { useState } from "react";
import useUser from "../hooks/useUser";

const CommentForm = ({ articleName, onArticleUpdated }) => {
  const [comment, setComment] = useState("");
  const { user } = useUser();

  const addComment = async () => {
    const token = user && (await user.getIdToken());
    const headers = token ? { authtoken: token } : {};
    const res = await axios.post(
      `http://localhost:8000/api/articles/${articleName}/comments`,
      {
        postedBy: name,
        text: comment,
      },
      { headers }
    );

    const updatedArticle = res.data;

    onArticleUpdated(updatedArticle);

    setComment("");
  };

  return (
    <div id="add-comment-form">
      <h3>add comment </h3>
      {user && <span>you are posting as {user.email}</span>}

      <textarea
        rows={"4"}
        cols={"50"}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <button onClick={addComment}>add comment</button>
    </div>
  );
};

export default CommentForm;
