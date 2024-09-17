import Article from "../content/content";
import ArticlesList from "../components/ArticlesList"

const articlesList = () => {


    return (
            <div className="main-content">
                <h1>Articles</h1>

                <ArticlesList Article={Article} />
            </div>
    )
}


export default articlesList;