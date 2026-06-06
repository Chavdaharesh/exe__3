import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../Pages/Header.jsx";
import Footer from "../Pages/Footer.jsx";

export default function MyRecipe() {
    const [myRecipes, setMyRecipes] = useState([]);    

    useEffect(() => {
        const savedRecipes = localStorage.getItem("myRecipes");
        if (savedRecipes) {
            try {
                setMyRecipes(JSON.parse(savedRecipes));
            } catch {
                setMyRecipes([]);
            }
        }

        const removeRecipe = (id) => {
            const updatedRecipes = myRecipes.filter((recipe) => recipe.id !== id);
            localStorage.setItem("myRecipes", JSON.stringify(updatedRecipes));
            setMyRecipes(updatedRecipes);
        };

        const removeButtons = document.querySelectorAll(".btn-remove");
        removeButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const recipeId = button.getAttribute("data-id");
                removeRecipe(recipeId);
            });
        });
    }, []);

    return (
        <>
            <Header />
            <div className="container mt-5">
                <h2 className="mb-4">My Recipes</h2>
                {myRecipes.length > 0 ? (
                    <div className="row g-4">
                        {myRecipes.map((recipe) => (
                            <div key={recipe.id} className="col-md-4">
                                <div className="card h-100">
                                    <img src={recipe.image} className="card-img-top" alt={recipe.name} />
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title">{recipe.name}</h5>
                                        <p className="card-text">{recipe.description}</p>
                                        <div className="mt-auto d-flex justify-content-center">
                                            <Link to={`/recipe/${recipe.id}`} className="btn btn-outline-dark">
                                                View Recipe
                                            </Link>
                                            <button
                                                className="btn btn-outline-dark ms-2"
                                                data-id={recipe.id}
                                                onClick={() => {
                                                    const updatedRecipes = myRecipes.filter((r) => r.id !== recipe.id);
                                                    localStorage.setItem("myRecipes", JSON.stringify(updatedRecipes));
                                                    setMyRecipes(updatedRecipes);
                                                }}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-muted">
                        <p className="mb-2">You haven't added any recipes yet.</p>
                        <Link to="/" className="btn btn-outline-secondary">Browse Recipes</Link>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}
