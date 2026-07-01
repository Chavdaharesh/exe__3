import { useState } from "react";
import { FiUser, FiLogOut, FiMenu } from "react-icons/fi";
import "../App.scss";
import { Link } from "react-router-dom";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="navbar navbar-dark bg-light sticky-top border-bottom shadow-sm py-2">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand mb-0 h1 me-0 text-start mx-2">
                    <span className="text-dark fw-bold fs-4">Recipe</span>
                    <span className="text-danger fw-bold fs-4"> Finder</span>
                </Link>

                <button
                    className="btn btn-outline-light d-md-none navbar-toggler"
                    type="button"
                    aria-expanded={menuOpen}
                    aria-label="Toggle navigation"
                    onClick={() => setMenuOpen((prev) => !prev)}
                >
                    <FiMenu size={22} />
                </button>

                <div className={`navbar-menu ${menuOpen ? "open" : ""}`}>
                    <div className="header-links">
                        <Link
                            to="/dashboard"
                            className="text-dark fw-semibold text-decoration-none p-2 rounded nav-link"
                            onClick={() => setMenuOpen(false)}
                        >
                            Explore
                        </Link>
                        <Link
                            to="/my-recipes"
                            className="text-dark fw-semibold text-decoration-none p-2 rounded nav-link"
                            onClick={() => setMenuOpen(false)}
                        >
                            My Recipes
                        </Link>
                    </div>

                    <div className="nav-actions d-flex gap-2">
                        <Link to="/" className="btn btn-outline-info" type="button" title="Profile" onClick={() => setMenuOpen(false)}>
                            <FiUser size={20} />
                        </Link>
                        <Link to="/" className="btn btn-outline-danger" type="button" title="Logout" onClick={() => setMenuOpen(false)}>
                            <FiLogOut size={20} />
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;