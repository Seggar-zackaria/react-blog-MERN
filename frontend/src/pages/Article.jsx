import { useParams } from "react-router-dom";
import Articles from "../content/content";
import NotFoundPage from "./NotFounPage";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CommentsList from "../components/comments";
import CommentForm from "../components/commentForm";
import useUser from "../hooks/useUser";

const Article = () => {
  const [articleInfo, setArticleInfo] = useState({
    upvote: 0,
    comments: [],
    canUpvote: false,
  });
  const { canUpvote } = articleInfo;
  const { articleId } = useParams();

  const { user, isloading } = useUser();

  useEffect(() => {
    const loadArticleInfo = async () => {
      const token = user && (await user.getIdToken());
      const headers = token ? { authtoken: token } : {};

      const response = await axios.get(
        `http://localhost:8000/api/articles/${articleId}`,
        { headers }
      );

      const newArticleInfo = response.data;

      setArticleInfo(newArticleInfo);
    };
    if (!isloading) {
      loadArticleInfo();
    }
  }, [isloading, user]);

  const article = Articles.find((article) => article.name === articleId);

  async function addUpvote() {
    const token = user && (await user.getIdToken());
    const headers = token ? { authtoken: token } : {};
    await axios.put(
      `http://localhost:8000/api/articles/${articleId}/upvote`,
      null,
      {
        headers,
      }
    );

    const response = await axios.get(
      `http://localhost:8000/api/articles/${articleId}`
    );

    const updateArticle = response.data;

    setArticleInfo(updateArticle);
  }

  if (!article) {
    return <NotFoundPage />;
  }
  return (
    <div className="main-content">
      <h1>{article.title}</h1>
      <div className="upvotes-section">
        {user ? (
          <button onClick={addUpvote}>
            {canUpvote ? "upvote" : "Already Upvoted"}
          </button>
        ) : (
          <button>
            <Link to={"/signin"}>logIn to upvote</Link>
          </button>
        )}
        <span>{`${articleInfo.upvote} upvote(s)`}</span>
      </div>

      {article.content.map((paragraphe, i) => (
        <p key={i}>{paragraphe}</p>
      ))}

      <div>
        {user ? (
          <CommentForm
            articleName={articleId}
            onArticleUpdated={(updateArticle) => setArticleInfo(updateArticle)}
          />
        ) : (
          <button>
            <Link to={"/signin"}>logIn to add a comment</Link>
          </button>
        )}
        <CommentsList comments={articleInfo.comments || []} />
      </div>
    </div>
  );
};

export default Article;
