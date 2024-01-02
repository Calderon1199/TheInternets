import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
  e.preventDefault();

  const newErrors = {};

  if (password !== confirmPassword) {
    newErrors.confirmPassword =
      "Confirm Password field must be the same as the Password field";
  }

  if (password.length < 6) {
    newErrors.password = 'Password must be 6 characters or more'
  }

  if (email.startsWith(' ') || email.endsWith(' ')) {
    newErrors.email = 'Email cannot start or end with spaces.';
  }

  if (username.startsWith(' ') || username.endsWith(' ')) {
    newErrors.username = 'Username cannot start or end with spaces.';
  }

  if (password.startsWith(' ') || password.endsWith(' ')) {
    newErrors.password = 'Password cannot start or end with spaces.';
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
  } else {
    setErrors({});

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  }
};


  return (
    <div className="Signup-Modal-Container">
      <h1>Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p>{errors.username}</p>}
        <label>
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <label>
          <input
            type="password"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
