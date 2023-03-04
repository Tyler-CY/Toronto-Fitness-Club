import {Link, Outlet} from "react-router-dom";
import './layout.css'

const Layout = () => {
    return (
        <>
            <nav>
                <Link to="/login">Login</Link>
                <Link to="/logout">Logout</Link>
                <Link to="/register">Register</Link>
                <Link to="/account-details">Account Details</Link>
                <Link to="/update-account">Update Account</Link>

                <Link to="/studios/search">Studios</Link>
                <Link to='/classes/search'>Classes</Link>


                <Link to="/plans">Plans</Link>
                <Link to="/payments">Payments</Link>
                <Link to="/update-card">Update Card</Link>

            </nav>
            <Outlet />
        </>
    )
}

export default Layout;