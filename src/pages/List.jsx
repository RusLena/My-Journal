import { useState, useEffect } from "react";
import Hero from "../components/Hero/Hero";
import { Container, Row, Col } from "react-bootstrap";
import { FaPlusCircle, FaTrashAlt, FaEdit, FaCheck } from "react-icons/fa";
import backgroundImage from "../assets/shoppingListStoreBackground.jpg";
import "../main.css";
import "animate.css";

function Shopping() {
  const localStorageKey = "shoppingList";

  const [items, setItems] = useState(() => {
    const storedItems = localStorage.getItem(localStorageKey);
    try {
      return storedItems ? JSON.parse(storedItems) : [];
    } catch (error) {
      console.error("Failed to parse local storage data:", error);
      return [];
    }
  });

  const [editIndex, setEditIndex] = useState(null);
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState(""); // Dropdown for categories
  const [price, setPrice] = useState("");
  const [store, setStore] = useState(""); // Store dropdown
  const [customStore, setCustomStore] = useState(""); // For "Other" store input
  const [customCategory, setCustomCategory] = useState(""); // For "Other" category input
  const [isPurchased, setIsPurchased] = useState(false);

  const stores = ["Other", 
    "Asda",
    "Aldi",
    "Lidl",
    "Morrisons",
    "Sainsbury's",
    "Tesco",
    "Waitrose",
    "Clarks",
    "H&M",
    "Marks & Spencer",
    "Next",
    "Primark",
    "River Island",
    "Sports Direct",
    "Zara",
    "French Connection",
    "FatFace",
    "Topshop",
    "Argos",
    "Currys",
    "John Lewis",
    "PC World",
    "Dunelm",
    "Homebase",
    "IKEA",
    "B&Q",
    "Screwfix",
    "Toolstation",
    "Boots",
    "Superdrug",
    "The Body Shop",
    "Amazon",
    "Wilko",
    "Selfridges",
    "Harrods",
    "Harvey Nichols",
  ];
  const categories = ["Other", "Groceries", "Electronics", "Clothing", "Furniture", "Home Improvement", "Health & Beauty"];

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(items));
  }, [items]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Save the custom store if "Other" is selected, otherwise use the selected store
    const storeToSave = store === "Other" ? customStore : store;
    const categoryToSave = category === "Other" ? customCategory : category;

    const newItem = { itemName, quantity: Number(quantity), category: categoryToSave, price: Number(price), store: storeToSave, isPurchased };

    if (editIndex !== null) {
      const updatedItems = [...items];
      updatedItems[editIndex] = newItem;
      setItems(updatedItems);
      setEditIndex(null);
    } else {
      setItems([...items, newItem]);
    }

    // Reset the form
    setItemName("");
    setQuantity("");
    setCategory("");
    setPrice("");
    setStore("");
    setCustomStore("");
    setCustomCategory("");
    setIsPurchased(false);
  };

  const handleEdit = (index) => {
    const item = items[index];
    setEditIndex(index);
    setItemName(item.itemName);
    setQuantity(item.quantity);
    setCategory(item.category);
    setPrice(item.price);
    setStore(item.store);
    setIsPurchased(item.isPurchased);

    // If the store is custom, set it to "Other" and fill the custom field
    if (!stores.includes(item.store)) {
      setStore("Other");
      setCustomStore(item.store);
    }

    // If the category is custom, set it to "Other" and fill the custom field
    if (item.category === "Other") {
      setCategory("Other");
      setCustomCategory(item.category);
    }
  };

  const handleDelete = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const togglePurchased = (index) => {
    const updatedItems = [...items];
    updatedItems[index].isPurchased = !updatedItems[index].isPurchased;
    setItems(updatedItems);
  };

  const handlePriceChange = (value) => {
    const numericValue = Math.max(0, Number(value)); // Ensure no negative values
    setPrice(numericValue);
  };

  const handleQuantityChange = (value) => {
    const numericValue = Math.max(0, Number(value)); // Ensure no negative values
    setQuantity(numericValue);
  };

  // Calculate totals
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="page-background list-page"
    style={{
      backgroundImage: `url(${backgroundImage})`
    }}
  >
      <Hero>
        <h1 className="animate__animated animate__rubberBand">Shopping List</h1>
      </Hero>
      <div className="container">
        <div className="content">
          <Container>
            <Row className="d-flex flex-column flex-md-row">
              <Col xs={12} md={6} className="entry-form-container">
                <div className="entry-form">
                  <h4 className="heading">Add Items</h4>
                  <form onSubmit={handleFormSubmit}>
                    <div className="form-group">
                      <label htmlFor="itemName">Item</label>
                      <input
                        className="form-control"
                        type="text"
                        id="itemName"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="quantity">Quantity</label>
                      <input
                        className="form-control"
                        type="number"
                        id="quantity"
                        value={quantity}
                        onChange={(e) => handleQuantityChange(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="category">Category</label>
                      <select
                        className="form-control"
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value="">Select a Category</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                      {category === "Other" && (
                        <input
                          className="form-control mt-2"
                          type="text"
                          placeholder="Specify category name"
                          value={customCategory}
                          onChange={(e) => setCustomCategory(e.target.value)}
                        />
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="price">Price (£)</label>
                      <input
                        className="form-control"
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => handlePriceChange(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="store">Store</label>
                      <select
                        className="form-control"
                        id="store"
                        value={store}
                        onChange={(e) => setStore(e.target.value)}
                      >
                        {stores.map((storeName) => (
                          <option key={storeName} value={storeName}>
                            {storeName}
                          </option>
                        ))}
                      </select>
                      {store === "Other" && (
                        <input
                          className="form-control mt-2"
                          type="text"
                          placeholder="Specify store name"
                          value={customStore}
                          onChange={(e) => setCustomStore(e.target.value)}
                        />
                      )}
                    </div>
                    <button type="submit" className="add-item-button">
                      {editIndex !== null ? "Update Item" : "Add Item"} <FaPlusCircle />
                    </button>
                  </form>
                </div>
              </Col>
              <Col xs={12} md={12} className="entry-form-container">
                <div className="entry-list-container">
                  <h4 className="heading">Shopping List</h4>
                  <div className="totals">
                    <p><strong>Total Items:</strong> {totalItems}</p>
                    <p><strong>Total Price:</strong> £{totalPrice.toFixed(2)}</p>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                      <thead className="thead-dark">
                        <tr>
                          <th className="heading">Item</th>
                          <th className="heading">Quantity</th>
                          <th className="heading">Category</th>
                          <th className="heading">Price</th>
                          <th className="heading">Store</th>
                          <th className="heading">Status</th>
                          <th className="heading">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item, index) => (
                          <tr
                            key={index}
                            className={item.isPurchased ? "purchased-item" : ""}
                          >
                            <td>{item.itemName}</td>
                            <td>{item.quantity}</td>
                            <td>{item.category}</td>
                            <td>{item.price.toFixed(2)}</td>
                            <td>{item.store}</td>
                            <td>{item.isPurchased ? "Purchased" : "Pending"}</td>
                            <td>
                              <div className="button-container">
                                <button
                                  type="button"
                                  className="complete-button"
                                  onClick={() => togglePurchased(index)}
                                >
                                  <FaCheck />
                                </button>
                                <button
                                  type="button"
                                  className="edit-button"
                                  onClick={() => handleEdit(index)}
                                >
                                  <FaEdit />
                                </button>
                                <button
                                  type="button"
                                  className="delete-button"
                                  onClick={() => handleDelete(index)}
                                >
                                  <FaTrashAlt />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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

export default Shopping;
