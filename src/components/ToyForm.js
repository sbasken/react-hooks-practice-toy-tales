import React, { useState } from "react";

function ToyForm({ onAddToy }) {
  const [ formData, setFormData ] = useState({
    name: "",
    image: "",
    likes: 0
  })

  const { name, image } = formData

  const handleChange = (e) => {
    const key = e.target.name
    const value = e.target.value
    setFormData({...formData, [key]: value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(newToy => onAddToy(newToy))
  }

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Enter a toy's name..."
          className="input-text"
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="image"
          value={image}
          placeholder="Enter a toy's image URL..."
          className="input-text"
          onChange={handleChange}
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
