import { Link, NavLink } from "react-router-dom";
export default function Navbar() {
 return <header className="site-header"><div className="nav"><Link to="/" className="brand"><span className="brand-mark">E</span><span className="brand-text">Edu<span>Ledger</span></span></Link><nav className="nav-links"><NavLink to="/">Home</NavLink><NavLink to="/courses">Courses</NavLink><NavLink to="/about">About</NavLink><NavLink to="/contact">Contact</NavLink></nav><div className="nav-actions"><Link to="/student-login" className="btn btn-ghost btn-sm">Student Login</Link><Link to="/admin-login" className="btn btn-ghost btn-sm">Admin Login</Link><span className="divider"></span><Link to="/student-register" className="btn btn-primary btn-sm">Get Started</Link></div></div></header>;
}
