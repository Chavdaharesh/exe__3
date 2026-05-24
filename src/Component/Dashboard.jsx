import { useState } from "react";
import { FiUser, FiLogOut } from "react-icons/fi";
import "../App.scss";

function Dashboard() {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("Searching for:", searchTerm);
    };

    return (
        <>
            <nav className="navbar navbar-dark bg-dark sticky-top">
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1">
                        <span className="text-info fw-bold fs-4">Recipe</span>
                        <span className="text-danger fw-bold fs-4"> Finder</span>
                    </span>
                    
                    <form className="d-flex me-3" style={{width: '300px'}}>
                        <input
                            className="form-control form-control-sm"
                            type="search"
                            placeholder="Search recipes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </form>

                    <div className="d-flex align-items-center gap-3 me-3">
                        <span className="text-light fw-semibold">Explore</span>
                    </div>

                    <div className="d-flex align-items-center gap-3 me-3">
                        <span className="text-light fw-semibold">My Recipes</span>
                    </div>

                    <div className="d-flex align-items-center gap-3 me-3">
                        <span className="text-light fw-semibold">Favorites</span>
                    </div>

                    <div className="d-flex gap-2">
                        <button className="btn btn-outline-info" type="button" title="Profile">
                            <FiUser size={20} />
                        </button>
                        <button className="btn btn-outline-danger" type="button" title="Logout">
                            <FiLogOut size={20} />
                        </button>
                    </div>
                </div>
            </nav>

            <div className="container mt-5">
                <div className="row mb-5">
                    <div className="col-md-12">
                        <h3 className="text-dark mb-3">Welcome to Recipe Finder</h3>
                        <p className="text-muted lead">Discover delicious recipes from around the world.</p>
                    </div>                    
                </div>

                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="card h-100 shadow-sm border-0 hover-shadow">
                            <div className="card-body">
                                <h5 className="card-title text-primary">Popular Recipes</h5>
                                <p className="card-text text-muted">Explore the most trending recipes from our community.</p>
                                <a href="#" className="btn btn-sm btn-outline-primary">View More</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card h-100 shadow-sm border-0 hover-shadow">
                            <div className="card-body">
                                <h5 className="card-title text-success">Top Chefs</h5>
                                <p className="card-text text-muted">Learn from the best chefs and culinary experts.</p>
                                <a href="#" className="btn btn-sm btn-outline-success">Explore</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card h-100 shadow-sm border-0 hover-shadow">
                            <div className="card-body">
                                <h5 className="card-title text-warning">My Favorites</h5>
                                <p className="card-text text-muted">Manage and access your favorite recipes easily.</p>
                                <a href="#" className="btn btn-sm btn-outline-warning">View</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;