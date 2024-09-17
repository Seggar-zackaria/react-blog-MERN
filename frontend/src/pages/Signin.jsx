import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const SignIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const logIn = async () => {
    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
      navigate("/articles");
    } catch (e) {
      setError(e.massage);
    }
  };

  return (
    <>
      <h3>Sing IN</h3>
      <div>
        {error && <p className="error">{error}</p>}
        <input
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={logIn}> Log In</button>
        <span>
          <Link to={"/signup"}>Don't have an account? Create One</Link>
        </span>
      </div>
    </>
  );
};

export default SignIn;
