import { Link } from "react-router-dom";

const ArticlesList = ({ Article }) => {
  return (
    <>
      {Article.map((article, i) => (
        <Link key={i} className="article-list-item" to={`${article.name}`}>
          <h3>{article.title}</h3>
          <p>{article.content[0].substring(0, 150)}...</p>
        </Link>
      ))}
    </>
  );
};

export default ArticlesList;
