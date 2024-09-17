import { Routes, Route } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import Home from "./pages/Home";
import Article from "./pages/Article";
import ArticlesList from "./pages/ArticlesList";
import NotFoundPage from "./pages/NotFounPage";
import NavBar from "./components/Navbar";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Singup";
import "./App.css";

function App() {
  return (
    <div>
      <NavBar />

      <div id="page-body">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/articles/:articleId" element={<Article />} />
          <Route path="/articles" element={<ArticlesList />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
