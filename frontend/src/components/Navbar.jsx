import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import useUser from "../hooks/useUser";

const NavBar = () => {
  const { user } = useUser();
  const NavigateTo = useNavigate();
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/articles">Articles</Link>
        </li>
        <div className="nav-right">
          {user ? (
            <button
              onClick={() => {
                signOut(getAuth());
              }}
            >
              sign Out
            </button>
          ) : (
            <button
              onClick={() => {
                NavigateTo("/signin");
              }}
            >
              sign IN
            </button>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default NavBar;
