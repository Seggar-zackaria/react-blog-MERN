import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const SignUp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const signup = async () => {
    try {
      if (password !== Confirmpassword) {
        setError("password do not match");
        return;
      }
      await createUserWithEmailAndPassword(getAuth(), email, password);
      navigate("/article");
    } catch (e) {
      setError(e.massage);
    }
  };

  return (
    <>
      <h3>Sing UP</h3>
      <div>
        {error && <p className="error">{error}</p>}
        <input
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="entre pasword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          placeholder="confirm password"
          type="password"
          value={Confirmpassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button onClick={signup}> Log In</button>
        <span>
          <Link to={"/signin"}>Already have an account ?</Link>
        </span>
      </div>
    </>
  );
};

export default SignUp;
