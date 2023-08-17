import "./headerStyle.css";
import { useNavigate } from "react-router-dom";
import authServise from "../../Services/auth-servise";
import { removeUser } from "../../store/slices/userSlice";
import { useDispatch } from "react-redux";
export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = authServise.getCurrentUser();

  const logOut = () => {
    authServise.logout();
    dispatch(removeUser());
  };

  return (
    <div className="header">
      {user !== null && (
        <span className="logo" onClick={() => navigate("/allnotes")}>
          Hi, {user.username}
        </span>
      )}
      <div className="links-container">
        <span className="navigation-link" onClick={() => navigate("/allnotes")}>
          Notes
        </span>
        <span className="navigation-link" onClick={() => navigate("/about")}>
          About
        </span>
        <span className="navigation-link" onClick={() => logOut()}>
          Logout
        </span>
      </div>
    </div>
  );
};
