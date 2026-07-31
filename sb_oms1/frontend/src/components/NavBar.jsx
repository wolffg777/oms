import { Link } from "react-router-dom";
import "../css/NavBar.css";

function NavBar() {
    return <nav className="navbar">
        <div className="navbar-brand">
            <Link to="/">InvOMS</Link>
        </div>
        <div className="navbar-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/skulist" className="nav-link">SkuList</Link>
            <Link to="/adjhist" className="nav-link">AdjHist</Link>
        </div>
    </nav>
}

export default NavBar