import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../Pages/Header.jsx";
import Footer from "../Pages/Footer.jsx";

function Recipe() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`https://dummyjson.com/recipes/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load recipe: ${res.status}`);
        return res.json();
      })
      .then((data) => setRecipe(data))
      .catch((err) => setError(err.message || "Unable to load recipe."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <>
      <Header />
      <div className="container mt-5">Loading...</div>
      <Footer />
    </>
  );

  if (error) return (
    <>
      <Header />
      <div className="container mt-5 text-danger">{error}</div>
      <Footer />
    </>
  );

  if (!recipe) return null;

  const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : (recipe.ingredients ? [recipe.ingredients] : []);
  const instructions = Array.isArray(recipe.instructions) ? recipe.instructions : (recipe.instructions ? [recipe.instructions] : []);
  const mealType = Array.isArray(recipe.mealType) ? recipe.mealType.join(", ") : String(recipe.mealType ?? "");

  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className="row g-4 align-items-start">
          <div className="col-md-5">
            <div className="card h-100">
              {recipe.image && (
                <img src={recipe.image} className="card-img-top" alt={recipe.name} />
              )}
            </div>
          </div>

          <div className="col-md-7">
            <div className="card h-100">
              <div className="card-body text-start">
                <h3 className="card-title">{recipe.name}</h3>
                <p className="text-muted mb-2">{mealType}</p>
                <p>{recipe.description}</p>

                <h5 className="mt-4">Ingredients</h5>
                <ul>
                  {ingredients.map((ing, idx) => (
                    <li key={idx}>{ing}</li>
                  ))}
                </ul>

                <h5 className="mt-4">Instructions</h5>
                <ol>
                  {instructions.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>

                <div className="mt-4">
                  <Link to="/" className="btn btn-secondary">Back</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Recipe;
