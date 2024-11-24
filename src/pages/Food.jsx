import { useState, useEffect } from "react";
import { FaTrashAlt, FaPlusCircle } from "react-icons/fa";
import Hero from "../components/Hero/Hero";
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

  // Predefined calorie database (calories per 100g)
  const foodCalories = {
    Alcohol: 240,
    Beans: 155,
    "Baked Beans": 155, // Fixed typo
    Bread: 260,
    Butter: 717,
    "Caesar Salad": 260,
    Cereal: 360, // Singular for consistency
    Cheese: 400,
    Chocolate: 546,
    Coffee: 2,
    "Chicken Burger": 260,
    "Chicken Kebab": 260,
    "Chicken Nuggets": 260,
    "Chicken Wings": 260,
    Dessert: 300,
    Eggs: 155,
    Fish: 206,
    "Fish and Chips": 260,
    Fries: 272,
    Fruits: 52,
    "Fizzy Drinks": 40,
    Hamburger: 260,
    Legumes: 155,
    Milk: 42,
    Nuts: 650,
    Oils: 884,
    Pasta: 131,
    Pizza: 260,
    Poultry: 239,
    "Red Meat": 250,
    Rice: 130,
    Sausages: 300,
    Seafood: 100,
    "Spaghetti Bolognese": 260,
    "Spaghetti Carbonara": 260,
    Tea: 2,
    "Toast with Jam": 260,
    Vegetables: 30,
    "Vegetable Soup": 40,
    Yoghurt: 59,
    "Sugary Drinks": 100,
    "Beef Stew": 260,
    "Greek Salad": 260,
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
  const measurementUnits = ["grams", "milliliters", "ounces", "cups"];

  useEffect(() => {
    const savedFoodList = JSON.parse(localStorage.getItem("foodList"));
    if (savedFoodList) {
      setFoodList(savedFoodList);
    }
  }, []);

  const calculateCalories = () => {
    let baseCalories = foodCalories[foodType] || 0;
    let quantityInGrams = parseFloat(quantity);

    // Convert to grams if necessary
    if (unit === "ounces") {
      quantityInGrams *= 28.35; // 1 ounce = 28.35 grams
    } else if (unit === "cups") {
      quantityInGrams *= 236.59; // 1 cup = 236.59 milliliters/grams for general liquid/food
    }

    // Calories calculation
    const totalCalories = (baseCalories / 100) * quantityInGrams;
    setCalories(Math.round(totalCalories));
  };

  const handleSave = () => {
    const newFood = {
      day,
      date,
      meal,
      foodType: foodType === "Other" ? otherFoodType : foodType,
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

  return (
    <div className="page-background food-page">
      <Hero>
        <h1 className="animate__animated animate__backInLeft">
          Your Food Tracker!
        </h1>
      </Hero>
      <div className="container">
        <div className="content">
      <Container>
        <Row>
          <Col md={12}>
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
                  <input
                  className="form-control"
                    type="text"
                    value={calories}
                    readOnly
                  />
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
          <Col md={12}>
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
        </Row>
      </Container>
    </div>
    </div>
    </div>
  );
}

export default Food;
