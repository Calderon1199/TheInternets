import { useState } from "react";

import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";

import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import SignupFormModal from "../SignupFormModal";

function LoginFormModal() {
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");

  const { setModalContent } = useModal();
  const { closeModal } = useModal();
  const dispatch = useDispatch();


  const handleSubmit = async (e) => {
    const newErrors = {};
    e.preventDefault();

    try {
      const serverResponse = await dispatch(
        thunkLogin({
          email,
          password,
        })
      );

      if (serverResponse.status === 200) {
          closeModal();
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      newErrors.credential = 'Invalid credentials';
    }

  setErrors(newErrors);
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
      <div className="Welcome-Header">
        <h3>Welcome back</h3>
        <p>Log in to contribute to The Internets</p>
      </div>
      <div className="Login-Form">
        <form onSubmit={handleSubmit}>
          <div className="Email-Input">
            <div className="Email-Error">
              <p>Email Address</p>
              {errors.credential && <p className="errorDivEmail">{errors.credential}</p>}
            </div>
            <label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="Email-Input">
            <p>Password</p>
            <label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            {errors.password && <p>{errors.password}</p>}
          </div>
        </form>
      </div>
      <div className="Login-Buttons">
        <button className="Login-Submit" type="submit" onClick={(e) => handleSubmit(e)}>Log In</button>
        <button id="Demo-Submit" onClick={handleDemoUserSubmit}>Demo User</button>
      </div>
      <div className="Sign-Up-Footer">
        <p>Dont have an account?</p>
        <h4 onClick={() => setModalContent(<SignupFormModal />)}>Sign up</h4>
      </div>
    </div>
  );
}

export default LoginFormModal;
