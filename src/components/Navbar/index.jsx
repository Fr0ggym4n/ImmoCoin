import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from 'store/actions'
import { useHistory } from 'react-router-dom'
import './Navbar.css'

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
            <div class="topnav">
            <div className="col-md-2" >
                <Link to="/">Home</Link>
            {!currentUser.id &&
                <div className="col-md-6">
                    <div className="row">
                        <div className="col-md-3">
                            <Link  to="/register">Sign up</Link>
                        </div>
                        <div className="col-md-3">
                            <Link to="/login">Sign in</Link>
                        </div>
                    </div>
                </div>

            }

            {currentUser.id &&
                <div className="col-md-6">
                        <div class="col-md-3">
                            <Link  to="/profile">Profile</Link>
                        </div>
                        <div className="col-md-3">
                            <Link to="/posts"> Add Property</Link>
                        </div>
                        <div className="col-md-3">
                            <button className="block" onClick={handleLogout}>Log out</button>
                     </div>
                    </div>
            }
        </div >
        </div>

    )
}


export default Navbar