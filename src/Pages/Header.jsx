import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiUser, FiLogOut } from "react-icons/fi";
import "../App.scss";
import { Link } from "react-router-dom";
import Login from "../login.jsx";
import Dashboard from "../Component/Dashboard.jsx";
import Recipe from "../Component/Recipe.jsx";
import MyRecipe from "../Component/myRecipe.jsx";

const Header = () => {   

    return (
        <nav className="navbar navbar-dark bg-dark sticky-top">
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1">
                        <span className="text-info fw-bold fs-4">Recipe</span>
                        <span className="text-danger fw-bold fs-4"> Finder</span>
                    </span>                   
                   
                    <div className="d-flex align-items-center gap-2">
                        <div className="d-flex align-items-center gap-2 mx-4 rounded">
                            <Link to="/" className="text-light fw-semibold text-decoration-none p-2 rounded">
                                Explore
                            </Link>
                        </div>
        
                        <div className="d-flex align-items-center gap-2 mx-4">
                            <Link to="/my-recipes" className="text-light fw-semibold text-decoration-none p-2 rounded">
                                My Recipes
                            </Link>
                        </div>
                    </div>                    

                    <div className="d-flex gap-2">
                        <Link to="/login" className="btn btn-outline-info" type="button" title="Profile">
                            <FiUser size={20} />
                        </Link>
                        <Link to="/login" className="btn btn-outline-info" type="button" title="Logout">
                            <FiLogOut size={20} />
                        </Link>
                    </div>
                </div>
            </nav>
    );
};

export default Header;