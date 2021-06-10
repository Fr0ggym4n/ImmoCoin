import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "store/actions";
import { useHistory } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {

  const currentUser = useSelector(state => state.authReducer)
  console.log('state', currentUser)
  const history = useHistory();
  const dispatch = useDispatch()
  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(logout())
    history.push('/')
    window.alert("Disconnecting...see you soon!")

  }
  return (
    <div className="topnav">
      <Link to="/">Home</Link>
      {!currentUser.id &&
        <div>
          <div >
            <Link to="/register">Sign up</Link>
          </div>
          <div >
            <Link to="/login">Sign in</Link>
          </div>
        </div>}

      {currentUser.id &&
        <div >
          <div >
            <Link to="/profile">Profile</Link>
          </div>
          <div >
            <Link to="/properties"> Add Property</Link>
          </div>
          <div >
            <button onClick={handleLogout}>Log out</button>
          </div>
        </div>
      }
    </div >
  )
}


export default Navbar
