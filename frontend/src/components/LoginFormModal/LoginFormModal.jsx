import { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginFormModal.css"; // Updated relative path

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState(""); // Username or Email
  const [password, setPassword] = useState(""); // Password
  const [errors, setErrors] = useState({}); // Errors
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // Disable button initially
  const { closeModal } = useModal();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  // Disable the Log In button unless credential and password meet length requirements
  useEffect(() => {
    if (credential.length >= 4 && password.length >= 6) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [credential, password]); // Runs whenever credential or password changes

  return (
    <>
      <form onSubmit={handleSubmit}>
      <h1 className="Log-in-text">Log In</h1>
        <label>

          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            placeholder="Username or Email"
          />
        </label>
        <label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        {/* Log In button will be disabled until conditions are met */}
        <button type="submit" className="Log-in" disabled={isButtonDisabled}>
          Log In
        </button>
        </label>
        {/* Display error messages if present */}
        {errors.credential && <p className="error">error reciving credentials</p>}

      </form>
    </>
  );
}

export default LoginFormModal;
