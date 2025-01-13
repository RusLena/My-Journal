import { useState, useEffect } from "react";
import Hero from "../components/Hero/Hero";
import { Container, Row, Col } from "react-bootstrap";
import { FaPlusCircle, FaTrashAlt, FaEdit } from "react-icons/fa";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import backgroundImage from "../assets/shoppingListStoreBackground.jpg";
import "../main.css";
import "animate.css";
import { v4 as uuidv4 } from "uuid";

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

  const stores = [
    "Other",
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
  const categories = [
    "Other",
    "Groceries",
    "Electronics",
    "Clothing",
    "Furniture",
    "Home Improvement",
    "Health & Beauty",
  ];

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(items));
  }, [items]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Generate a unique ID for each item
    const id = uuidv4();

    // Save the custom store if "Other" is selected, otherwise use the selected store
    const storeToSave = store === "Other" ? customStore : store;
    const categoryToSave = category === "Other" ? customCategory : category;

    const newItem = {
      id,
      itemName,
      quantity: Number(quantity),
      category: categoryToSave,
      price: Number(price),
      store: storeToSave,
      isPurchased,
    };

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

    // Custom shop is set it to "Other"
    if (!stores.includes(item.store)) {
      setStore("Other");
      setCustomStore(item.store);
    }

    // Custom category is set it to "Other"
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
    const numericValue = Math.max(0, Number(value)); // No negative values
    setPrice(numericValue);
  };

  const handleQuantityChange = (value) => {
    const numericValue = Math.max(0, Number(value)); // No negative values
    setQuantity(numericValue);
  };

  // Calculate totals
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div
      className="page-background list-page"
      style={{
        backgroundImage: `url(${backgroundImage})`,
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
                      {editIndex !== null ? "Update Item" : "Add Item"}{" "}
                      <FaPlusCircle />
                    </button>
                  </form>
                </div>
              </Col>

              <Col xs={12} md={8} className="shopping-list-form-container">
                <div className="entry-list-container">
                  <h4 className="heading">Shopping List</h4>
                  <div className="totals">
                    <p>
                      <strong>Total Items:</strong> {totalItems}
                    </p>
                    <p>
                      <strong>Total Price:</strong> £{totalPrice.toFixed(2)}
                    </p>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                      <thead className="thead-dark"> </thead>
                      <tr>
                        <th className="heading">Title</th>
                        <th className="heading">Content</th>
                        <th className="heading">Status</th>
                        <th className="heading">Actions</th>
                      </tr>

                      <tbody>
                        {items.map((item, index) => (
                          <>
                            <tr
                              key={index}
                              className={
                                item.isPurchased ? "purchased-item" : ""
                              }
                            >
                              <th className="heading">Item</th>
                              <td>{item.itemName}</td>
                              <td>
                                {item.isPurchased ? "Purchased" : "Pending"}
                                
                              </td>
                              <td>
                                <div className="button-container">
                                <IoCheckmarkDoneCircleOutline 
                                  style={{
                                    color: item.isPurchased
                                      ? "black"
                                      : "#ff6347",
                                      fontSize: "30px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => togglePurchased(index)}
                                />
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
                            <tr>
                              <th className="heading">Quantity</th>
                              <td>{item.quantity}</td>
                              <td></td>
                              <td></td>
                            </tr>
                            <tr>
                              <th className="heading">Category</th>
                              <td>{item.category}</td>
                              <td></td>
                              <td></td>
                            </tr>
                            <tr>
                              <th className="heading">Price</th>
                              <td>{item.price.toFixed(2)}</td>
                              <td></td>
                              <td></td>
                            </tr>
                            <tr>
                              <th className="heading">Store</th>
                              <td>{item.store}</td>
                              <td>{item.isPurchased}</td>
                              <td></td>
                            </tr>
                          </>
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
