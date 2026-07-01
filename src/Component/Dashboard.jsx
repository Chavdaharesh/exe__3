import { useState, useEffect } from "react";
import "../App.scss";
import { Link } from "react-router-dom";
import Header from "../Pages/Header.jsx";
import Footer from "../Pages/Footer.jsx";
import SkeletonCard from "./SkeletonCard";

function Dashboard() {
    const [searchTerm, setSearchTerm] = useState("");
    const [mealType, setMealType] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [imagesReady, setImagesReady] = useState(false);
    const [error, setError] = useState(null);
    const [showMyRecipes, setShowMyRecipes] = useState(false); 
    
    const useDebounce = (value, delay) => {
        const [debouncedValue, setDebouncedValue] = useState(value);
        useEffect(() => {
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);
            return () => {
                clearTimeout(handler);
            };
        }, [value, delay]);
        return debouncedValue;
    };
    
    const debouncedSearchTerm = useDebounce(searchTerm, 3000);

    useEffect(() => {        
        setLoading(true);
        fetch("https://dummyjson.com/recipes")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to load recipes: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setRecipes(data.recipes || []);
                setFilteredRecipes(data.recipes || []);
                setError(null);
            })
            .catch((err) => {
                console.error(err);
                setError(err.message || "Unable to load recipes.");
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (loading) {
            return;
        }

        if (filteredRecipes.length === 0) {
            setImagesReady(true);
            return;
        }

        setImagesReady(false);
        const imageUrls = filteredRecipes.map((recipe) => recipe.image).filter(Boolean);
        let loadedCount = 0;
        const imageElements = imageUrls.map((url) => {
            const img = new Image();
            img.src = url;
            img.onload = () => {
                loadedCount += 1;
                if (loadedCount === imageUrls.length) {
                    setImagesReady(true);
                }
            };
            img.onerror = () => {
                loadedCount += 1;
                if (loadedCount === imageUrls.length) {
                    setImagesReady(true);
                }
            };
            return img;
        });

        return () => {
            imageElements.forEach((img) => {
                img.onload = null;
                img.onerror = null;
            });
        };
    }, [filteredRecipes, loading]);

    useEffect(() => { 
    const filteredRecipes = recipes.filter((recipe) => {
        const recipeMeal = Array.isArray(recipe.mealType)
            ? recipe.mealType.join(" ")
            : String(recipe.mealType ?? "");

        const matchesMeal = !mealType || recipeMeal.toLowerCase().includes(mealType.toLowerCase());

        console.log("Filtered Recipes:", debouncedSearchTerm);
        const matchesSearch = !debouncedSearchTerm || (recipe.name ?? "").toLowerCase().includes(debouncedSearchTerm.toLowerCase());
        
        return matchesMeal && matchesSearch;
    });
    
    setFilteredRecipes(filteredRecipes);
    }, [debouncedSearchTerm, mealType, recipes]);

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
                                <div className="row g-2 align-items-center justify-content-center dashboard-search-row ">                          
                                    <div className="col-8 col-sm-8">
                                        <input
                                            className="form-control form-control-sm rounded-2 bi-search"
                                            type="search"
                                            placeholder="Search recipes..."
                                            value={searchTerm}

                                            onChange={(e) => setSearchTerm(e.target.value)}                                            
                                        />  
                                    </div>                      
                                    <div className="col-2 col-sm-2">
                                        <select
                                            className="form-select form-select-sm rounded-2 "
                                            aria-label="Select meal type"
                                            value={mealType}
                                            onChange={(e) => setMealType(e.target.value)}
                                        >
                                            <option className="" value="">All</option>
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
                    <div className="row g-4 ">
                        {loading || !imagesReady ? (
                            <>
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <SkeletonCard key={i} />
                                ))}
                            </>
                        ) : filteredRecipes.length > 0 ? (
                            filteredRecipes.map((recipe) => (
                                <div key={recipe.id} className="col-md-4">
                                    <div className="card h-100 justify-content-center align-items-center">
                                        <img src={recipe.image} className="card-img-top" alt={recipe.name} />
                                        <div className="card-body d-flex flex-column">
                                            <h5 className="card-title">{recipe.name}</h5>
                                            <p className="card-text">{recipe.description}</p>
                                            <div className="mt-auto d-flex recipe-card-actions">
                                                
                                                    <Link to={`/recipe/${recipe.id}`} className="btn btn-outline-dark flex-fill">
                                                        View Recipe
                                                    </Link>

                                                        <button type="button" className="btn btn-outline-dark flex-fill" onClick={() => saveRecipe(recipe)}>
                                                        Add Recipe
                                                    </button>
                                                
                                                
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