import { useState } from "react";

import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";

import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");

  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    serverResponse ? setErrors(serverResponse) : closeModal();

  };

  const handleDemoUserSubmit = async () => {
    await dispatch(thunkLogin({
        email: 'demo@user.io',
        password: "password",
      })
    );

    closeModal();
  };

  return (
    <div className="Login-Modal-Container">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </label>
        {errors.credential && <p>{errors.credential}</p>}
        <label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <button type="submit" onClick={(e) => handleSubmit(e)}>Log In</button>
      </form>
      <button onClick={handleDemoUserSubmit}>Demo User</button>
    </div>
  );
}

export default LoginFormModal;
