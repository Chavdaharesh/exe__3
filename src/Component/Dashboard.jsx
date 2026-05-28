import { useState } from "react";
import { FiUser, FiLogOut } from "react-icons/fi";
import "../App.scss";
import { Link } from "react-router-dom";
import Header from "../Pages/Header.jsx";
import Footer from "../Pages/Footer.jsx";

function Dashboard() {    
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("Searching for:",    searchTerm);
    };
    
    return (
        <>
            <div><Header /></div>            
            <div className="container mt-5">
                <div className="row mb-5">
                    <div className="col-md-12">
                        <h3 className="text-dark mb-3">Welcome to Recipe Finder</h3>
                        <p className="text-muted lead">Discover delicious recipes from around the world.</p>
                         <input className="w-50"
                            className="form-control form-control-sm"
                            type="search"
                            placeholder="Search recipes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
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
            <div><Footer /></div>
        </>
    );
}

export default Dashboard;