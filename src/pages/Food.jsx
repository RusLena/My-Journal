import { useState, useEffect } from "react";
import { FaTrashAlt, FaPlusCircle } from "react-icons/fa";
import Hero from "../components/Hero/Hero";
import backgroundImage from "../assets/shoppingListBackground.jpg";
import "../main.css";
import { Container, Row, Col } from "react-bootstrap";

function Food() {
  const [day, setDay] = useState("");
  const [date, setDate] = useState("");
  const [meal, setMealTime] = useState("");
  const [foodType, setFoodType] = useState("");
  const [otherFoodType, setOtherFoodType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("[]"); 
  const [calories, setCalories] = useState(0);
  const [foodList, setFoodList] = useState([]);
  const [favoriteLinks, setFavoriteLinks] = useState([]);
  const [newLink, setNewLink] = useState("");

  // Predefined calorie database (calories per 100g)
  const foodCalories = {
    // Single items (per piece)
    Egg: 68,                   // Per egg (50g)
    Avocado: 240,              // Per avocado (200g)
    Banana: 89,                // Per banana (120g)
  
    // Generic categories (per 100g)
    Fruits: 52,                // Average for common fruits
    Vegetables: 30,            // Average for common vegetables
    Nuts: 650,                 // High-calorie due to fats
    Legumes: 155,              // Average legumes
    Beans: 155,                // Cooked beans
    Fish: 206,                 // Cooked fish
    Poultry: 239,              // Cooked poultry
    Rice: 130,                 // Cooked rice
    Pasta: 131,                // Cooked pasta
    Bread: 260,                // Average bread
    Butter: 717,               // Unsalted butter
    Chocolate: 546,            // Milk chocolate
    Cheese: 400,               // Average cheese
    Oils: 884,                 // Edible oils
    Milk: 42,                  // Whole milk
    Yoghurt: 59,               // Plain yogurt
  
    // Beverages (per serving or 100g)
    Alcohol: 240,              // Alcohol (per serving)
    Coffee: 2,                 // Black coffee (per cup)
    Tea: 2,                    // Tea without sugar (per cup)
    "Fizzy Drinks": 40,        // Diet or light sodas
    "Sugary Drinks": 100,      // Regular sodas
  
    // Dishes (average per serving)
    "Full English Breakfast": 1000, // Traditional plate
    "Spaghetti Bolognese": 270,     // Medium portion
    "Spaghetti Carbonara": 280,     // Medium portion
    "Beef Stew": 290,               // Medium bowl
    "Greek Salad": 200,             // Medium bowl
    "Vegetable Soup": 160,          // Medium bowl
    "Caesar Salad": 260,            // With dressing
    Dessert: 300,                   // Typical sweet portion
    "Sausages with Mash": 600,      // Average plate
    "Chicken Burger": 260,          // Per sandwich
    "Chicken Kebab": 260,           // With pita
    "Chicken Nuggets": 260,         // Average portion
    "Chicken Wings": 260,           // Medium portion
    "Fish and Chips": 260,          // Average plate
    Fries: 272,                     // Cooked fries
    Pizza: 260,                     // Single slice
    Hamburger: 260,                 // Single burger
    Sausages: 300,                  // Cooked sausages
    "Toast with Jam": 260,          // Slice with jam
  };
  
  
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const mealTimes = ["Breakfast", "Lunch", "Dinner", "Tea", "Snack", "Supper"];
  const measurementUnits = ["grams", "milliliters", "ounces", "cups", "pieces"];

  useEffect(() => {
    const savedFoodList = JSON.parse(localStorage.getItem("foodList"));
    if (savedFoodList) {
      setFoodList(savedFoodList);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("favoriteLinks", JSON.stringify(favoriteLinks));
  }, [favoriteLinks])

  const calculateCalories = () => {
    let baseCalories = foodCalories[foodType] || 0; // Get base calories
    let totalCalories = 0;
  
    if (["Egg", "Avocado", "Banana"].includes(foodType)) {
      // Piece-based calculation
      totalCalories = baseCalories * parseFloat(quantity);
    } else {
      // Weight-based calculation
      let weightInGrams = parseFloat(quantity);
  
      if (unit === "ounces") {
        weightInGrams *= 28.35; // Convert ounces to grams
      } else if (unit === "cups") {
        weightInGrams *= 236.59; // Approximation
      }
  
      totalCalories = (baseCalories / 100) * weightInGrams;
    }
  
    setCalories(Math.round(totalCalories));
  };
  
  const handleSave = () => {
    const selectedFoodType = foodType === "Other" ? otherFoodType : foodType;

    if (!selectedFoodType || !quantity || (!calories && foodType === "Other")) {
      alert("Please fill out all required fields.");
      return;
    }

    const newFood = {
      day,
      date,
      meal,
      foodType: selectedFoodType,
      quantity,
      unit,
      calories,
    };
    const updatedList = [...foodList, newFood];
    setFoodList(updatedList);
    localStorage.setItem("foodList", JSON.stringify(updatedList));
    setDay("");
    setDate("");
    setMealTime("");
    setFoodType("");
    setOtherFoodType("");
    setQuantity("");
    setUnit("grams");
    setCalories(0);
  };

  const handleDelete = (index) => {
    const updatedList = foodList.filter((_, i) => i !== index);
    setFoodList(updatedList);
    localStorage.setItem("foodList", JSON.stringify(updatedList));
  };
  const handleAddFavoriteLink = () => {
    if (newLink.trim()) {
      setFavoriteLinks([...favoriteLinks, newLink]);
      setNewLink("");
    }
  };

  const handleDeleteFavoriteLink = (index) => {
    const updatedLinks = favoriteLinks.filter((_, i) => i !== index);
    setFavoriteLinks(updatedLinks);
  };

  return (
    <div className="page-background food-page"
    style={{
      backgroundImage: `url(${backgroundImage})`
    }}
  >
      <Hero>
        <h1 className="animate__animated animate__backInLeft">
          Your Food Tracker!
        </h1>
      </Hero>
      <div className="container">
      <Container>
        <Row className="d-flex flex-column flex-md-row">
          <Col xs={12} md={6} className="entry-form-container" >
            <div className="entry-form">
              <h4 className="heading">Add New Meal</h4>
              <form>
                <div className="form-group">
                  <label htmlFor="dayInput">Day of the Week</label>
                  <select
                    className="form-control"
                    id="dayInput"
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                  >
                    <option value="">Select Day</option>
                    {daysOfWeek.map((dayOption, index) => (
                      <option key={index} value={dayOption}>
                        {dayOption}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="dateInput">Select Date</label>
                  <input
                    className="form-control"
                    type="date"
                    id="dateInput"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="mealInput">Mealtime</label>
                  <select
                    className="form-control"
                    id="mealInput"
                    value={meal}
                    onChange={(e) => setMealTime(e.target.value)}
                  >
                    <option value="">Select Mealtime</option>
                    {mealTimes.map((mealOption, index) => (
                      <option key={index} value={mealOption}>
                        {mealOption}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="foodTypeInput">Type of Food</label>
                  <select
                    className="form-control"
                    id="foodTypeInput"
                    value={foodType}
                    onChange={(e) => setFoodType(e.target.value)}
                  >
                    <option value="">Select Food Type</option>
                    <option value="Other">Other (Please specify)</option>
                    {Object.keys(foodCalories).map((foodOption, index) => (
                      <option key={index} value={foodOption}>
                        {foodOption}
                      </option>
                    ))}
                  </select>
                </div>

                {foodType === "Other" && (
                  <div className="form-group">
                    <label htmlFor="otherFoodTypeInput">
                      Please specify the type of food
                    </label>
                    <input
                      className="form-control"
                      type="text"                 
                      id="otherFoodTypeInput"
                      value={otherFoodType}
                      onChange={(e) => setOtherFoodType(e.target.value)}
                    />
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="quantityInput">Quantity</label>
                  <input
                    className="form-control"
                    type="number"  
                    id="quantityInput"
                    value={quantity}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      setQuantity(value >= 0 ? value : 0);
                    }}
                    onBlur={calculateCalories}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="unitInput">Unit</label>
                  <select
                    className="form-control"
                    id="unitInput"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                  >
                    {measurementUnits.map((unitOption, index) => (
                      <option key={index} value={unitOption}>
                        {unitOption}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Calories</label>
                  <input className="form-control" type="number" value={calories} onChange={(e) => setCalories(e.target.value)} />
                </div>
                <button
                  className="add-entry-button"
                  onClick={handleSave}
                  type="button"
                >
                  Add Entry <FaPlusCircle />
                </button>
              </form>
            </div>
          </Col>
          <Col xs={12} md={6} className="entry-form-container">
            <div className="entry-list-container">
            <div className="table-responsive">
              <h4 className="heading">Food Record</h4>
              <ul className="list-group">
                {foodList.map((item, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>
                        <mark>{item.day}</mark>, {item.meal}
                      </strong>{" "}
                      - {item.foodType}, Quantity: {item.quantity} {item.unit},
                      Calories: {item.calories}
                    </div>
                    <button
                      type="button"
                      className="delete-button"
                      onClick={() => handleDelete(index)}
                    >
                      <FaTrashAlt />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            </div>
          </Col>

        {/* Favorite Recipes Section */}     
            <Col xs={12} md={6} className="entry-form-container">
              <div className="entry-form">
                <h4 className="heading">Favorite Recipes</h4>
                <div className="form-group">
                  <label>Add Recipe Link</label>
                  <div className="input-group">
                    <input
                      className="form-control"
                      type="url"
                      value={newLink}
                      placeholder="Enter recipe link"
                      onChange={(e) => setNewLink(e.target.value)}
                    />
                    <button
                      className="add-entry-button"
                      onClick={handleAddFavoriteLink}
                      type="button"
                    >
                      Add <FaPlusCircle />
                    </button>
                  </div>
                </div>
                <ul className="list-group">
                  {favoriteLinks.map((link, index) => (
                    <li
                      key={index}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <a href={link} target="_blank" rel="noopener noreferrer">
                        {link}
                      </a>
                      <button
                        type="button"
                        className="delete-button"
                        onClick={() => handleDeleteFavoriteLink(index)}
                      >
                        <FaTrashAlt />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
          </Row>
      </Container>
    </div>
    </div>
  );
}

export default Food;
