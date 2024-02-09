import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";
import LoginFormModal from "../LoginFormModal";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const {setModalContent} = useModal();
  const { closeModal } = useModal();

  const handleChange = (e, type) => {
    const newErrors = {...errors};
    if (type === 'email') {
      setEmail(e.target.value);
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(e.target.value)) {
        newErrors.email = 'Invalid email address';
      } else {
        newErrors.email = ''
      }
      if (e.target.value.length === 0) {
        newErrors.email = '';
      }
    } else if (type === 'username') {
      setUsername(e.target.value);
      const usernameRegex = /^[a-zA-Z0-9_-]+$/;
      if (!usernameRegex.test(e.target.value)) {
        newErrors.username = 'Letters, Numbers, Dashes, & Underscores';
      } else {
        newErrors.username = ''
      }
      if (e.target.value.length === 0) {
        newErrors.username = '';
      }
    }




    setErrors(newErrors);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {}


  if (password !== confirmPassword) {
    newErrors.confirmPassword =
      "Passwords must match";
  }

  if (password.length < 6) {
    newErrors.password = 'Password must be 6 characters or more'
  }



  if (password.startsWith(' ') || password.endsWith(' ')) {
    newErrors.password = 'Password cannot start or end with spaces';
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
      <div className="Welcome-Header">
        <h3>Welcome</h3>
        <p>Sign up to begin contributing to The Internets</p>
      </div>
      {errors.server && <p>{errors.server}</p>}
      <div className="Sign-Up-Form">
        <form onSubmit={handleSubmit}>
          <div className="Email-Input2">
            <div className="Sign-Up-Errors">
              <p>Email</p>
              {errors.email && <p className="errorDivSignup">{errors.email}</p>}
            </div>
            <label>
              <input
                type="text"
                value={email}
                onChange={(e) => handleChange(e, 'email')}
                required
              />
            </label>
          </div>
          <div className="Email-Input2">
            <div className="Sign-Up-Errors">
              <p>Username</p>
              {errors.username && <p className="errorDivSignup">{errors.username}</p>}
            </div>
            <label>
              <input
                type="text"
                value={username}
                onChange={(e) => handleChange(e, 'username')}
                required
              />
            </label>
          </div>
          <div className="Email-Input2">
            <div className="Sign-Up-Errors">
              <p>Password</p>
              {errors.password && <p className="errorDivSignup">{errors.password}</p>}
            </div>
            <label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="Email-Input2">
            <div className="Sign-Up-Errors">
              <p>Confirm Password</p>
              {errors.confirmPassword && <p className="errorDivSignup">{errors.confirmPassword}</p>}
            </div>
            <label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>
          </div>
        </form>
      </div>
      <div className="Sign-Up-Button">
        <button className="Login-Submit" type="submit" onClick={(e) => handleSubmit(e)}>Sign Up</button>
      </div>
      <div className="Sign-Up-Footer2">
        <p>Already have an account?</p>
        <h4 onClick={() => setModalContent(<LoginFormModal />)}>Log in</h4>
      </div>
    </div>
  );
}

export default SignupFormModal;
