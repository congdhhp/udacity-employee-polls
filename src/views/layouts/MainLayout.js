import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import { fetchUsers } from "../../reducers/userSlice";
import { setAuthedUser } from "../../reducers/authSlice";
import { fetchQuestions } from "../../reducers/questionSlice";

function Navbar({ authedUser, handleLogout }) {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/leaderboard">Leaderboard</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/add">New</NavLink>
          </li>
        </ul>
        <ul className="navbar-nav navbar-right">
          <li className="nav-item">
            <span className="nav-link">
              <img height={30} width={30} className="bg-info rounded-circle me-3" src={authedUser.avatarURL} alt={authedUser.name} />
              <strong>{authedUser.name}</strong>
            </span>
          </li>
          <li className="nav-item">
            <button className="nav-link btn btn-link" onClick={handleLogout}>Log out</button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const authedUser = useSelector(state => state.auth.authedUser);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(setAuthedUser(null));
    navigate('/login');
  };

  useEffect(() => {
    if (!authedUser) {
      navigate(`/login?redirect=${location.pathname}`);
      return; // Return early if the user is not authenticated
    }

    // Fetch data once when user is authenticated
    const fetchData = async () => {
      await dispatch(fetchUsers());
      await dispatch(fetchQuestions());
    };

    fetchData();
  }, [authedUser, dispatch, location.pathname, navigate]);

  if (!authedUser) {
    return null; // Return null while waiting for authentication
  }

  return (
    <div>
      <Navbar authedUser={authedUser} handleLogout={handleLogout} />
      <div className="container mt-3">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
