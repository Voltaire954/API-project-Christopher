// frontend/src/components/Navigation/Navigation.jsx

import { NavLink } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton/OpenModalButton"; // Import OpenModalButton
import LoginFormModal from "../LoginFormModal/LoginFormModal"; // Import LoginFormModal
import SignupFormModal from "../SignupFormModal/SignupFormModal"; // Import SignupFormModal
// import "./Navigation.css";

function Navigation({ isLoaded }) {
  const dispatch = useDispatch(); // Initialize dispatch
  const sessionUser = useSelector((state) => state.session.user);

  const logout = (e) => {
    e.preventDefault(); // Prevent default behavior
    dispatch(sessionActions.logout()); // Call logout action
  };

  const sessionLinks = sessionUser ? (
    <>
      <ProfileButton user={sessionUser} />
      <button onClick={logout}>Log Out</button>
    </>
  ) : (
    <>
      <OpenModalButton
        buttonText="Log In"
        modalComponent={<LoginFormModal />}
      />
      <OpenModalButton
        buttonText="Sign Up"
        modalComponent={<SignupFormModal />}
      />
    </>
  );

  return (
    <ul>
      <NavLink to="/">Home</NavLink>
      {isLoaded && sessionLinks}
    </ul>
  );
}

export default Navigation;
