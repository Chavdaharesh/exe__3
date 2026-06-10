import { useState, useEffect } from "react";
import "../App.scss";
import { Link } from "react-router-dom";
import Header from "../Pages/Header.jsx";
import Footer from "../Pages/Footer.jsx";
import Recipe from "./Recipe.jsx";
import MyRecipe from "./myRecipe.jsx";

function Dashboard() {
    const [searchTerm, setSearchTerm] = useState("");
    const [mealType, setMealType] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showMyRecipes, setShowMyRecipes] = useState(false);       

    useEffect(() => {
        fetch("https://dummyjson.com/recipes")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to load recipes: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setRecipes(data.recipes || []);
                setError(null);
            })
            .catch((err) => {
                console.error(err);
                setError(err.message || "Unable to load recipes.");
            })
            .finally(() => setLoading(false));
    }, []);

    const filteredRecipes = recipes.filter((recipe) => {
        const recipeMeal = Array.isArray(recipe.mealType)
            ? recipe.mealType.join(" ")
            : String(recipe.mealType ?? "");

        const matchesMeal = !mealType || recipeMeal.toLowerCase().includes(mealType.toLowerCase());
        const matchesSearch = !searchTerm || (recipe.name ?? "").toLowerCase().includes(searchTerm.toLowerCase());

        return matchesMeal && matchesSearch;
    });

    const saveRecipe = (recipe) => {
        const savedRecipes = JSON.parse(localStorage.getItem("myRecipes") || "[]");
        const updatedRecipes = [...savedRecipes, recipe];
        if (savedRecipes.some((r) => r.id === recipe.id)) {
            alert("This recipe is already in your collection.");
            return;
        }
        else {
                alert("Recipe added to your collection!");
        }
        console.log("Saving recipe:", recipe);
        localStorage.setItem("myRecipes", JSON.stringify(updatedRecipes));
        setShowMyRecipes(true);
    }

    return (
        <>
            <Header />            
            <div className="container mt-5">
                <div className="row mb-5 justify-content-center align-items-center">
                    <div className="col-md-10">
                        <h3 className="text-dark mb-3">Welcome to Recipe Finder</h3>
                        <p className="text-muted lead">Discover delicious recipes from around the world.</p>
                        
                            <form onSubmit={(e) => e.preventDefault()}>  
                                <div className="row g-2 align-items-center">                          
                                    <div className="d-flex align-items-start gap-2 col-sm-11">
                                        <input
                                            className="form-control form-control-sm w-60"
                                            type="search"
                                            placeholder="Search recipes..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />  
                                    </div>                      
                                    <div className="d-flex gap-2 col-sm-1 h-25">
                                        <select
                                            className="form-select form-select-sm w-40"
                                            aria-label="Select meal type"
                                            value={mealType}
                                            onChange={(e) => setMealType(e.target.value)}
                                        >
                                            <option value="">All</option>
                                            <option value="breakfast">Breakfast</option>
                                            <option value="lunch">Lunch</option>
                                            <option value="dinner">Dinner</option>
                                            <option value="snack">Snack</option>
                                            <option value="dessert">Dessert</option>
                                        </select>
                                    </div>
                                </div>
                            </form>   
                                             
                    </div>
                </div>
            </div>
            <div className="container">   
                    <div className="row g-4">                       
                        {filteredRecipes.length > 0 ? (
                            filteredRecipes.map((recipe) => (
                                <div key={recipe.id} className="col-md-4">
                                    <div className="card h-100 justify-content-center align-items-center">
                                        <img src={recipe.image} className="card-img-top" alt={recipe.name} />
                                        <div className="card-body d-flex flex-column">
                                            <h5 className="card-title">{recipe.name}</h5>
                                            <p className="card-text">{recipe.description}</p>
                                            <div className="mt-auto gap-3 d-flex">
                                                
                                                    <Link to={`/recipe/${recipe.id}`} className="btn btn-outline-dark">
                                                        View Recipe
                                                    </Link>

                                                        <Link className="btn btn-outline-dark" onClick={() => saveRecipe(recipe)}>
                                                        Add Recipe
                                                    </Link>
                                                
                                                
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-12">
                                <p className="text-center text-muted">No recipes found.</p>
                            </div>
                        )}
                    </div>
               
            </div>
            <Footer />
        </>
    );
}

export default Dashboard;